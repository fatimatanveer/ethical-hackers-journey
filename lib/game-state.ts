"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type {
  GameState,
  Role,
  Mission,
  GameMetrics,
  TerminalHistoryItem,
  CommandResult,
} from "./types"
import { allMissions, getMissionById } from "./mission-data"

// --- Deep clone helper for all mission data ---
function deepClone<T>(obj: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(obj)
  }
  return JSON.parse(JSON.stringify(obj))
}

// --- Always use a fresh copy for new game states ---
const getFreshMissions = () => deepClone(allMissions)

interface GameStore extends GameState {
  setPlayerName: (name: string) => void
  setRole: (role: Role) => void
  startMission: (missionId: string) => void
  completeMission: () => void
  failMission: () => void
  resetGame: () => void
  executeCommand: (command: string) => CommandResult
  addTerminalHistory: (item: TerminalHistoryItem) => void
  clearTerminalHistory: () => void
  makeScenarioChoice: (scenarioId: string, choiceId: string) => void
  updateMetrics: (updates: Partial<GameMetrics>) => void
  completeObjective: (objectiveId: string) => void
  getCurrentMission: () => Mission | null
  getAvailableScenarios: () => any[]
  getCompletedObjectives: () => string[]
  calculateFinalScore: () => number
  getHighlightScenarioId: () => string | null
}

const initialMetrics: GameMetrics = {
  technicalScore: 50,
  ethicsScore: 50,
  detectionRisk: 0,
  timeElapsed: 0,
}

const initialState: GameState = {
  playerName: "",
  currentRole: "red",
  currentMissionId: null,
  missions: getFreshMissions(),
  metrics: initialMetrics,
  missionStatus: "not_started",
  terminalHistory: [],
  scenarioHistory: [],
  lastUnlockedScenarioId: null,
}

// --- Export this to forcibly clear persistence (call after resetGame on restart/new mission) ---
export const clearGameStorePersistence = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("ethical-hackers-journey-game-state")
  }
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPlayerName: (name) => set({ playerName: name }),
      setRole: (role) => set({ currentRole: role }),

      startMission: (missionId) => {
        const mission = getMissionById(missionId)
        if (!mission) return

        set({
          currentMissionId: missionId,
          missionStatus: "in_progress",
          metrics: { ...initialMetrics },
          terminalHistory: [],
          scenarioHistory: [],
          lastUnlockedScenarioId: null,
          missions: getFreshMissions(),
        })

        mission.initialCommands.forEach((command, index) => {
          setTimeout(() => {
            get().addTerminalHistory({
              command,
              output: `Type '${command}' to get started`,
              timestamp: Date.now(),
            })
          }, index * 500)
        })
      },

      completeMission: () => set({ missionStatus: "completed" }),
      failMission: () => set({ missionStatus: "failed" }),
      resetGame: () => set({ ...initialState, missions: getFreshMissions() }),

      // ---- Terminal Command Handler ----
      executeCommand: (command: string): CommandResult => {
        const state = get()
        const mission = state.getCurrentMission()
        if (!mission) {
          return { output: "No active mission. Please start a mission first." }
        }
        const lowerCommand = command.toLowerCase().trim()
        let result: CommandResult

        // -------- Flexible Command Parsing --------
        const scanRegex = /^scan(\s+\S+)?$/
        const exploitRegex = /^exploit(\s+\S+)?$/
        const monitorRegex = /^monitor(\s+\S+)?$/
        const analyzeRegex = /^analyze(\s+\S+)?$/
        const patchRegex = /^patch(\s+\S+)?$/
        const reportRegex = /^report(\s+\S+)?$/

        if (lowerCommand === "scenario" || lowerCommand === "scenarios") {
          const available = get().getAvailableScenarios()
          if (available.length === 0) {
            result = { output: "No new scenarios available yet. Complete more objectives to unlock them." }
          } else {
            result = {
              output:
                "Available Scenarios:\n" +
                available.map(
                  (s, idx) => `${idx + 1}. ${s.title} (ID: ${s.id})\n   ${s.description}`
                ).join("\n")
            }
          }
        } else switch (lowerCommand) {
          case "help": {
            let output = `Available commands:
          - help: Show this help message
          - objectives: List mission objectives
          - status: Show current mission status
          - clear: Clear terminal
          `
            if (mission.role === "red") {
              output += `- scan [target]: Scan for vulnerabilities
          - exploit [target]: Attempt exploitation
          - report [finding]: Document findings
          `
            }
            if (mission.role === "blue") {
              output += `- monitor [system]: Monitor for threats
          - analyze [log]: Analyze log files
          - patch [system]: Apply security patches
          - report [finding]: Document findings
          `
            }
            result = { output }
            break
          }

          case "objectives":
            result = {
              output:
                "Mission Objectives:\n" +
                mission.objectives
                  .map((obj, index) => `${index + 1}. ${obj.description} ${obj.completed ? "✓" : "○"}`)
                  .join("\n"),
            }
            break

          case "status":
            const completedCount = mission.objectives.filter((obj) => obj.completed).length
            const totalCount = mission.objectives.length
            result = {
              output: `Mission: ${mission.title}
Status: ${state.missionStatus}
Progress: ${completedCount}/${totalCount} objectives completed
Technical Score: ${state.metrics.technicalScore}
Ethics Score: ${state.metrics.ethicsScore}
Detection Risk: ${state.metrics.detectionRisk}`,
            }
            break

          case "clear":
            get().clearTerminalHistory()
            result = { output: "" }
            break

          default:
            // -------- Flexible Red Team Commands --------
            if (scanRegex.test(lowerCommand) && mission.role === "red") {
              result = {
                output: `Scanning target systems...
Found open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL)
Potential vulnerabilities detected:
- Outdated SSH version (CVE-2023-1234)
- Unpatched web server (CVE-2023-5678)
- Weak MySQL configuration`,
                technicalScoreImpact: 5,
                detectionRiskImpact: 2,
                completesObjectives: mission.objectives.some((obj) => obj.description.includes("reconnaissance"))
                  ? ([mission.objectives.find((obj) => obj.description.includes("reconnaissance"))?.id].filter(Boolean) as string[])
                  : undefined,
              }
              if (Math.random() < 0.2) {
                get().addTerminalHistory({
                  command: "",
                  output: "ALERT: Intrusion detection system flagged your scan attempt.",
                  timestamp: Date.now(),
                })
                get().updateMetrics({ detectionRisk: state.metrics.detectionRisk + 8 })
              }
            }
            else if (exploitRegex.test(lowerCommand) && mission.role === "red") {
              result = {
                output: `Attempting exploitation...
Successfully exploited SSH vulnerability!
Gained user-level access to target system.
Warning: Ensure you have proper authorization for this test.`,
                technicalScoreImpact: 8,
                detectionRiskImpact: 6,
                ethicsImpact: -2,
                completesObjectives: mission.objectives.some((obj) => obj.description.includes("exploit"))
                  ? ([mission.objectives.find((obj) => obj.description.includes("exploit"))?.id].filter(Boolean) as string[])
                  : undefined,
              }
              if (Math.random() < 0.15) {
                get().addTerminalHistory({
                  command: "",
                  output: "ALERT: Unexpected system instability. Logs being generated.",
                  timestamp: Date.now(),
                })
              }
            }
            // -------- Flexible Blue Team Commands --------
            else if (monitorRegex.test(lowerCommand) && mission.role === "blue") {
              result = {
                output: `Monitoring network traffic...
Detected suspicious activity:
- Multiple failed login attempts from IP 192.168.1.100
- Unusual outbound traffic to unknown domain
- Potential data exfiltration detected`,
                technicalScoreImpact: 6,
                detectionRiskImpact: -3,
                completesObjectives: mission.objectives.some((obj) => obj.description.includes("monitor"))
                  ? ([mission.objectives.find((obj) => obj.description.includes("monitor"))?.id].filter(Boolean) as string[])
                  : undefined,
              }
            }
            else if (analyzeRegex.test(lowerCommand) && mission.role === "blue") {
              result = {
                output: `Analyzing security logs...
Found indicators of compromise:
- Successful login after multiple failures
- Privilege escalation attempts
- Suspicious file access patterns
- Evidence of lateral movement`,
                technicalScoreImpact: 7,
                detectionRiskImpact: -2,
                completesObjectives: mission.objectives.some((obj) => obj.description.includes("analyze"))
                  ? ([mission.objectives.find((obj) => obj.description.includes("analyze"))?.id].filter(Boolean) as string[])
                  : undefined,
              }
            }
            else if (patchRegex.test(lowerCommand) && mission.role === "blue") {
              result = {
                output: `Applying security patches...
Successfully patched:
- SSH server updated to latest version
- Web server security patches applied
- Database configuration hardened
System security posture improved.`,
                technicalScoreImpact: 8,
                detectionRiskImpact: -5,
                ethicsImpact: 5,
                completesObjectives: mission.objectives.some(
                  (obj) => obj.description.includes("patch") || obj.description.includes("contain"),
                )
                  ? ([
                      mission.objectives.find(
                        (obj) => obj.description.includes("patch") || obj.description.includes("contain"),
                      )?.id,
                    ].filter(Boolean) as string[])
                  : undefined,
              }
            }
            else if (reportRegex.test(lowerCommand)) {
              result = {
                output: `Generating security report...
Report includes:
- Executive summary of findings
- Technical details and evidence
- Risk assessment and prioritization
- Remediation recommendations
- Timeline for implementation
Report saved successfully.`,
                technicalScoreImpact: 5,
                ethicsImpact: 8,
                completesObjectives: mission.objectives.some(
                  (obj) => obj.description.includes("document") || obj.description.includes("recommend"),
                )
                  ? ([
                      mission.objectives.find(
                        (obj) => obj.description.includes("document") || obj.description.includes("recommend"),
                      )?.id,
                    ].filter(Boolean) as string[])
                  : undefined,
              }
            }
            // -------- Unknown Command --------
            else {
              result = {
                output: `Command '${command}' not recognized. Type 'help' for available commands.`,
              }
            }
        }

        // ---- Add to terminal history ----
        get().addTerminalHistory({
          command,
          output: result.output,
          timestamp: Date.now(),
        })

        // ---- Update metrics if specified ----
        if (result.technicalScoreImpact || result.ethicsImpact || result.detectionRiskImpact) {
          const currentMetrics = state.metrics
          get().updateMetrics({
            technicalScore: Math.max(
              0,
              Math.min(100, currentMetrics.technicalScore + (result.technicalScoreImpact || 0)),
            ),
            ethicsScore: Math.max(0, Math.min(100, currentMetrics.ethicsScore + (result.ethicsImpact || 0))),
            detectionRisk: Math.max(0, Math.min(100, currentMetrics.detectionRisk + (result.detectionRiskImpact || 0))),
          })
        }

        // ---- Complete objectives if specified ----
        if (result.completesObjectives) {
          result.completesObjectives.forEach((objId) => {
            get().completeObjective(objId)
          })
        }

        // ---- Unlock scenarios when new objectives complete ----
        if (result.completesObjectives && result.completesObjectives.length > 0) {
          const mission = get().getCurrentMission()
          const availableScenarios = mission?.scenarios.filter((scenario) => {
            if (scenario.completed) return false
            if (scenario.requiredObjectives) {
              return scenario.requiredObjectives.every((objId) =>
                mission.objectives.find((obj) => obj.id === objId)?.completed,
              )
            }
            return true
          }) || []
          if (availableScenarios.length > 0) {
            get().addTerminalHistory({
              command: "",
              output: `--- New Scenario Unlocked: ${availableScenarios[0].title} ---\nType 'scenario' to view details.`,
              timestamp: Date.now(),
            })
            set({ lastUnlockedScenarioId: availableScenarios[0].id })
          }
        }

        // ---- Auto-complete mission if all objectives complete ----
        const currentMission = get().getCurrentMission()
        if (
          currentMission &&
          currentMission.objectives.every((obj) => obj.completed) &&
          state.missionStatus !== "completed"
        ) {
          get().completeMission()
          get().addTerminalHistory({
            command: "",
            output: "All mission objectives complete! Mission successful.",
            timestamp: Date.now(),
          })
        }

        return result
      },

      addTerminalHistory: (item: TerminalHistoryItem) => {
        set((state) => ({
          terminalHistory: [...state.terminalHistory, item],
        }))
      },

      clearTerminalHistory: () => set({ terminalHistory: [] }),

      makeScenarioChoice: (scenarioId: string, choiceId: string) => {
        const state = get()
        const mission = state.getCurrentMission()
        if (!mission) return

        const scenario = mission.scenarios.find((s) => s.id === scenarioId)
        const choice = scenario?.choices.find((c) => c.id === choiceId)
        if (!scenario || !choice) return

        // Mark selected
        scenario.choices.forEach((c) => (c.selected = false))
        choice.selected = true

        // Update metrics based on choice
        const currentMetrics = state.metrics
        get().updateMetrics({
          technicalScore: Math.max(0, Math.min(100, currentMetrics.technicalScore + (choice.technicalScoreImpact || 0))),
          ethicsScore: Math.max(0, Math.min(100, currentMetrics.ethicsScore + (choice.ethicsImpact || 0))),
          detectionRisk: Math.max(0, Math.min(100, currentMetrics.detectionRisk + (choice.detectionRiskImpact || 0))),
        })

        // Complete objectives if specified
        if (choice.completesObjectives) {
          choice.completesObjectives.forEach((objId) => {
            get().completeObjective(objId)
          })
        }

        // Mark scenario as completed
        scenario.completed = true

        // Add to scenario history
        set((state) => ({
          scenarioHistory: [
            ...state.scenarioHistory,
            {
              scenarioId,
              choiceId,
              timestamp: Date.now(),
            },
          ],
        }))

        // Check if mission is complete
        const allObjectivesComplete = mission.objectives.every((obj) => obj.completed)
        if (allObjectivesComplete) {
          get().completeMission()
          get().addTerminalHistory({
            command: "",
            output: "All mission objectives complete! Mission successful.",
            timestamp: Date.now(),
          })
        }
      },

      updateMetrics: (updates: Partial<GameMetrics>) => {
        set((state) => ({
          metrics: { ...state.metrics, ...updates },
        }))
      },

      completeObjective: (objectiveId: string) => {
        const state = get()
        const mission = state.getCurrentMission()
        if (!mission) return
        const objective = mission.objectives.find((obj) => obj.id === objectiveId)
        if (objective) {
          objective.completed = true
        }
        set((state) => ({
          missions: [...state.missions],
        }))
      },

      getCurrentMission: (): Mission | null => {
        const state = get()
        if (!state.currentMissionId) return null
        // Return from deep clone of all missions
        return state.missions.find((m) => m.id === state.currentMissionId) || null
      },

      getAvailableScenarios: () => {
        const state = get()
        const mission = state.getCurrentMission()
        if (!mission) return []
        return mission.scenarios.filter((scenario) => {
          if (scenario.completed) return false
          if (scenario.requiredObjectives) {
            return scenario.requiredObjectives.every(
              (objId) => mission.objectives.find((obj) => obj.id === objId)?.completed,
            )
          }
          return true
        })
      },

      getCompletedObjectives: (): string[] => {
        const state = get()
        const mission = state.getCurrentMission()
        if (!mission) return []
        return mission.objectives.filter((obj) => obj.completed).map((obj) => obj.id)
      },

      calculateFinalScore: (): number => {
        const state = get()
        const { technicalScore, ethicsScore, detectionRisk } = state.metrics
        const stealthScore = 100 - detectionRisk
        return Math.round(technicalScore * 0.4 + ethicsScore * 0.4 + stealthScore * 0.2)
      },

      getHighlightScenarioId: () => {
        const state = get()
        return state.lastUnlockedScenarioId || null
      },
    }),
    {
      name: "ethical-hackers-journey-game-state",
      partialize: (state) => ({
        playerName: state.playerName,
        currentRole: state.currentRole,
        currentMissionId: state.currentMissionId,
        missionStatus: state.missionStatus,
        metrics: state.metrics,
        terminalHistory: state.terminalHistory,
        scenarioHistory: state.scenarioHistory,
        lastUnlockedScenarioId: state.lastUnlockedScenarioId,
        missions: state.missions,
      }),
    },
  ),
)
