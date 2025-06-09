"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGameStore } from "@/lib/game-state"
import { Eye, RefreshCw, User, BookOpenCheck, BarChart2 } from "lucide-react"

export default function AdminPanel() {
  // Admin login state
  const [access, setAccess] = useState(false)
  const [password, setPassword] = useState("")

  // Pull state from Zustand
  const {
    playerName,
    missions,
    currentMissionId,
    scenarioHistory,
    terminalHistory,
    resetGame,
    missionStatus,
    metrics,
  } = useGameStore()

  // Show current savegame (from localStorage, for demo)
  const [savegame, setSavegame] = useState<string | null>(null)
  useEffect(() => {
    if (access && typeof window !== "undefined") {
      setSavegame(localStorage.getItem("ethical-hackers-journey-game-state"))
    }
  }, [access])

  // Admin login handler
  function handleLogin() {
    if (password === "admin123") setAccess(true)
    else alert("Incorrect password")
  }

  // Reset ALL game progress
  function handleReset() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ethical-hackers-journey-game-state")
      setSavegame(null)
      resetGame()
      alert("All player progress has been reset!")
    }
  }

  // --- Admin login screen ---
  if (!access) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Card className="bg-gray-900 border-cyan-700 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-xl">Admin Panel Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="password"
              placeholder="Enter admin password"
              className="bg-gray-800 border-cyan-700 text-white mb-4"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-700"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // --- Main admin panel ---
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Ethical Hacker's Journey – Admin Panel</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* User/Player Management */}
        <Card className="bg-gray-900 border-cyan-700">
          <CardHeader>
            <CardTitle>
              <User className="inline mr-2" />User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">Current Player: <span className="text-cyan-300">{playerName || "None"}</span></div>
            <div className="mb-2">Current Mission: <span className="text-cyan-300">{currentMissionId || "None"}</span></div>
            <div className="mb-2">Mission Status: <span className="text-cyan-300 capitalize">{missionStatus}</span></div>
            <div className="mb-4">Progress Metrics:</div>
            <ul className="text-cyan-200 ml-4 mb-4">
              <li>Technical Score: {metrics?.technicalScore ?? "N/A"}</li>
              <li>Ethics Score: {metrics?.ethicsScore ?? "N/A"}</li>
              <li>Detection Risk: {metrics?.detectionRisk ?? "N/A"}</li>
            </ul>
            <Button
              variant="destructive"
              className="w-full mb-2"
              onClick={handleReset}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Reset All Player Progress
            </Button>
          </CardContent>
        </Card>

        {/* Missions/Scenarios Overview */}
        <Card className="bg-gray-900 border-cyan-700">
          <CardHeader>
            <CardTitle>
              <BookOpenCheck className="inline mr-2" />Missions & Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            {missions.length === 0 ? (
              <div className="text-gray-400">No missions found.</div>
            ) : (
              <ul className="mb-4">
                {missions.map(m => (
                  <li key={m.id} className="mb-2">
                    <span className="font-bold text-cyan-300">{m.title}</span>
                    <span className="text-xs text-gray-400 ml-2">({m.role.toUpperCase()}, {m.difficulty})</span>
                    <div className="text-gray-400 ml-2">{m.description}</div>
                    <ul className="ml-4 text-sm text-cyan-200">
                      {m.scenarios.map(s => (
                        <li key={s.id}>– {s.title}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
            <Button variant="outline" className="w-full" disabled>
              (Future) Add/Edit Missions
            </Button>
          </CardContent>
        </Card>

        {/* Analytics/Stats */}
        <Card className="bg-gray-900 border-cyan-700">
          <CardHeader>
            <CardTitle>
              <BarChart2 className="inline mr-2" />Analytics & Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">Scenario History: <span className="text-cyan-300">{scenarioHistory.length}</span></div>
            <div className="mb-2">Terminal Commands Entered: <span className="text-cyan-300">{terminalHistory.length}</span></div>
            {/* Expand with more analytics if needed */}
          </CardContent>
        </Card>

        {/* Raw Savegame View */}
        <Card className="bg-gray-900 border-cyan-700">
          <CardHeader>
            <CardTitle>
              <Eye className="inline mr-2" />Raw Game Save (JSON)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-800 text-cyan-200 p-3 rounded overflow-x-auto text-xs max-h-64">
              {savegame ? savegame : "No saved progress found."}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
