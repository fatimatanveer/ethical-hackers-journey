// Game roles
export type Role = "red" | "blue"

// Mission difficulty levels
export type DifficultyLevel = "beginner" | "intermediate" | "advanced"

// Mission status
export type MissionStatus = "not_started" | "in_progress" | "completed" | "failed"

// Game metrics
export interface GameMetrics {
  technicalScore: number // 0-100
  ethicsScore: number // 0-100
  detectionRisk: number // 0-100
  timeElapsed: number // seconds
}

// Mission interface
export interface Mission {
  id: string
  title: string
  description: string
  briefing: string
  role: Role
  difficulty: DifficultyLevel
  objectives: MissionObjective[]
  scenarios: Scenario[]
  initialCommands: string[]
}

// Mission objective
export interface MissionObjective {
  id: string
  description: string
  completed: boolean
  ethicalImplications?: string
}

// Scenario interface
export interface Scenario {
  id: string
  title: string
  description: string
  choices: ScenarioChoice[]
  completed: boolean
  selectedChoiceId?: string
  requiredObjectives?: string[] // Objectives that must be completed before this scenario is available
  requiresMiniGame?: string
}

// Scenario choice
export interface ScenarioChoice {
  id: string
  text: string
  ethicsImpact: number
  detectionRiskImpact: number
  technicalScoreImpact: number
  consequence?: string
  completesObjectives?: string[]
  nextScenarioId?: string
  endsMission?: boolean
  failReason?: string
  selected?: boolean    // <-- Add this line
}



// Terminal command result
export interface CommandResult {
  output: string
  ethicsImpact?: number
  detectionRiskImpact?: number
  technicalScoreImpact?: number
  completesObjectives?: string[]
}

// Game state
export interface GameState {
  playerName: string
  currentRole: Role
  currentMissionId: string | null
  missions: Mission[]
  metrics: GameMetrics
  missionStatus: MissionStatus
  terminalHistory: TerminalHistoryItem[]
  scenarioHistory: ScenarioHistoryItem[]
  lastUnlockedScenarioId: string | null  // <-- ADD THIS LINE

}

// Terminal history item
export interface TerminalHistoryItem {
  command: string
  output: string
  timestamp: number
}

// Scenario history item
export interface ScenarioHistoryItem {
  scenarioId: string
  choiceId: string
  timestamp: number
}

// Mini-game
export interface MiniGame {
  id: string
  type: "codebreaker" | "loganalysis" | "patternmatching"
  title: string
  description: string
  difficulty: DifficultyLevel
  content: any // Specific content based on mini-game type
  completed: boolean
  ethicsImpact: number
  detectionRiskImpact: number
  technicalScoreImpact: number
  completesObjectives?: string[]
}
