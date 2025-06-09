"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal } from "@/components/terminal"
import { ScenarioList } from "@/components/scenario-panel"
import { MetricsDisplay } from "@/components/metrics-display"
import { MissionObjectives } from "@/components/mission-objectives"
import { MissionLog } from "@/components/mission-log"
import { useGameStore } from "@/lib/game-state"
import { ArrowLeft, HelpCircle, Gamepad2, BookOpen } from "lucide-react"
import Link from "next/link"

export default function GameplayPage() {
  const router = useRouter()
  const {
    getCurrentMission,
    missionStatus,
    scenarioHistory,
    terminalHistory,
  } = useGameStore()
  const mission = getCurrentMission()

  // Banner for scenario unlocks, mission complete, etc.
  const [banner, setBanner] = useState<string | null>(null)

  // Detect scenario unlocks or mission completion
  useEffect(() => {
    if (!mission) {
      router.push("/game/role-selection")
      return
    }
    if (missionStatus === "completed") {
      setBanner("🎉 All objectives complete! Mission successful. Proceed to debrief.")
      setTimeout(() => router.push("/game/debrief"), 1800)
    }
    if (missionStatus === "failed") {
      setBanner("❌ Mission failed due to a critical error or ethical violation. Proceed to debrief.")
      setTimeout(() => router.push("/game/debrief"), 1800)
    }
    // Listen for new scenario unlocks in terminal
    const last = terminalHistory[terminalHistory.length - 1]
    if (last && last.output?.toLowerCase().includes("scenario unlocked")) {
      setBanner("🔓 New Scenario Unlocked! Check the Scenarios panel or use the terminal to view choices.")
      setTimeout(() => setBanner(null), 2200)
    }
  }, [mission, missionStatus, terminalHistory, router])

  // Dynamic scenario highlight if a scenario was just picked (for added engagement)
  const [highlightScenario, setHighlightScenario] = useState<string | null>(null)
  useEffect(() => {
    if (scenarioHistory.length > 0) {
      const lastScenario = scenarioHistory[scenarioHistory.length - 1]
      setHighlightScenario(lastScenario.scenarioId)
      setTimeout(() => setHighlightScenario(null), 1100)
    }
  }, [scenarioHistory])

  if (!mission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0e1320] to-[#191b2e] text-white flex items-center justify-center">
        <Card className="bg-gray-900 border-cyan-700 max-w-md shadow-2xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Gamepad2 className="h-8 w-8 text-cyan-400 animate-bounce" />
            </div>
            <p className="text-gray-300 mb-4 text-lg font-medium">No active mission. Please select a mission to begin.</p>
            <Link href="/game/role-selection">
              <Button className="bg-gradient-to-r from-cyan-600 to-purple-500 hover:from-cyan-700 hover:to-purple-700 font-semibold">
                Select Mission
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1320] to-[#191b2e] text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-1">
          <div>
            <Link href="/">
              <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950 mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Exit Mission
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-7 w-7 text-purple-400" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight">
                {mission.title}
              </h1>
            </div>
            <p className="text-gray-400 text-base mt-2 max-w-xl">{mission.description}</p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            <Link href="/instructions">
              <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950">
                <HelpCircle className="mr-2 h-4 w-4" /> Instructions
              </Button>
            </Link>
            <Link href="/game/guide">
              <Button variant="outline" className="border-purple-700 text-purple-400 hover:bg-purple-950">
                <BookOpen className="mr-2 h-4 w-4" /> Guide
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center mb-3">
          <div className="bg-cyan-900/80 text-cyan-200 px-4 py-1 rounded-xl text-xs flex items-center gap-2 border border-cyan-700 shadow">
            <svg width="16" height="16" fill="none" className="inline-block mr-1">
              <circle cx="8" cy="8" r="8" fill="#06b6d4"/>
              <text x="8" y="12" fontSize="10" fill="white" textAnchor="middle">i</text>
            </svg>
            Starting metrics reflect a typical professional baseline (neutral, not perfect or failed).
            <span className="ml-2 text-cyan-300">Make choices to improve or worsen your standing!</span>
          </div>
        </div>

        {/* KPI/Metrics Cards */}
        <MetricsDisplay />

        {/* Mission Feedback Banner */}
        {banner && (
          <div className="w-full py-2 px-4 mb-4 rounded-xl font-semibold bg-gradient-to-r from-purple-900/80 to-cyan-900/80 border border-purple-700 text-purple-100 text-center animate-pulse shadow-lg">
            {banner}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
          {/* Left: Terminal */}
          <div className="bg-[#17192d] rounded-2xl shadow-xl border-2 border-cyan-900 p-0 min-h-[540px] flex flex-col">
            <Terminal />
            <div className="text-xs text-cyan-400 px-4 pb-2 pt-1 opacity-80">
              {mission.role === "red"
                ? "Tip: Use the terminal to perform technical actions, then progress through scenario decisions to complete your objectives."
                : "Tip: Use the terminal for investigations and mitigations, and review scenarios for key decisions."}
            </div>
          </div>

          {/* Center: Scenarios */}
          <div className="bg-[#17192d] rounded-2xl shadow-xl border-2 border-purple-900 p-4 min-h-[540px] max-h-[650px] overflow-y-auto custom-scrollbar">
            <ScenarioList highlightId={highlightScenario} />
            {mission.scenarios.some((s) => !s.completed) && (
              <div className="text-xs mt-3 text-purple-300 opacity-80">
                New scenarios may unlock as you complete objectives. Check here or use <span className="font-mono text-green-400 bg-gray-800 rounded px-1">scenario</span> in the terminal.
              </div>
            )}
          </div>

          {/* Right: Objectives & Log */}
          <div className="flex flex-col gap-6 min-h-[540px]">
            <div className="bg-[#17192d] rounded-2xl shadow-xl border-2 border-cyan-900 p-4">
              <MissionObjectives />
            </div>
            <div className="bg-[#17192d] rounded-2xl shadow-xl border-2 border-purple-900 p-4 flex-1 min-h-[120px] max-h-[220px] overflow-y-auto custom-scrollbar">
              <MissionLog />
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: #181f2a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #384454;
          border-radius: 6px;
        }
      `}</style>
    </div>
  )
}
