"use client"

import React, { useEffect, useState } from "react"

function DebriefContent() {
  // Import Zustand hooks ONLY on client (avoids SSR mismatch)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useGameStore } = require("@/lib/game-state")
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useLeaderboardStore } = require("@/lib/leaderboard-store")

  const { useRouter } = require("next/navigation")
  const router = useRouter()

  // --- Zustand game state
  const {
    getCurrentMission,
    missionStatus,
    metrics,
    calculateFinalScore,
    resetGame,
    playerName,
    currentRole,
  } = useGameStore()
  const { add, entries } = useLeaderboardStore()
  const mission = getCurrentMission()

  // --- Redirect if no mission data
  useEffect(() => {
    if (!mission) {
      router.push("/game/role-selection")
    }
  }, [mission, router])

  const finalScore = calculateFinalScore()
  const isSuccess = missionStatus === "completed"

  // --- Add to leaderboard on mission complete (prevent duplicate)
  useEffect(() => {
    if (!mission || !isSuccess) return
    const now = Date.now()
    const alreadyOnLeaderboard = entries.some(
      (e: any) =>
        e.playerName === (playerName || "Anonymous") &&
        e.role === currentRole &&
        e.score === finalScore &&
        Math.abs(e.completedAt - now) < 5 * 60 * 1000 // within 5 min
    )
    if (!alreadyOnLeaderboard) {
      add({
        playerName: playerName || "Anonymous",
        role: currentRole,
        score: finalScore,
        completedAt: now,
      })
    }
    // eslint-disable-next-line
  }, [isSuccess, playerName, currentRole, finalScore, mission, add, entries])

  // --- Grade helper ---
  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-green-500" }
    if (score >= 80) return { grade: "A", color: "text-green-500" }
    if (score >= 70) return { grade: "B", color: "text-yellow-500" }
    if (score >= 60) return { grade: "C", color: "text-yellow-500" }
    if (score >= 50) return { grade: "D", color: "text-orange-500" }
    return { grade: "F", color: "text-red-500" }
  }

  const { grade, color } = getScoreGrade(finalScore)

  if (!mission) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading mission data...</p>
      </div>
    )
  }

  // Imports required for rendering (outside hydration logic)
  const { Button } = require("@/components/ui/button")
  const { Card, CardContent, CardHeader, CardTitle } = require("@/components/ui/card")
  const { Badge } = require("@/components/ui/badge")
  const { Progress } = require("@/components/ui/progress")
  const {
    CheckCircle,
    XCircle,
    Home,
    RotateCcw,
    Trophy,
    Shield,
    Zap,
    Eye,
  } = require("lucide-react")
  const { motion } = require("framer-motion")

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Mission {isSuccess ? "Complete" : "Failed"}
          </h1>
          <div className="flex justify-center mt-2">
            <Badge
              className={`text-lg py-1 px-4 ${
                isSuccess ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
              }`}
            >
              {isSuccess ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />}
              {isSuccess ? "Mission Successful" : "Mission Failed"}
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-gray-900 border-cyan-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Mission Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-gray-400 mb-1">Agent</h3>
                  <p className="text-xl font-bold text-white">{playerName || "Anonymous"}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-1">Role</h3>
                  <div className="flex items-center">
                    {currentRole === "red" ? (
                      <>
                        <div className="bg-red-900/30 p-2 rounded-lg mr-2">
                          <Zap className="h-5 w-5 text-red-500" />
                        </div>
                        <span className="text-red-400 font-medium">Red Team</span>
                      </>
                    ) : (
                      <>
                        <div className="bg-blue-900/30 p-2 rounded-lg mr-2">
                          <Shield className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="text-blue-400 font-medium">Blue Team</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-1">Mission</h3>
                  <p className="text-white">{mission.title}</p>
                  <p className="text-gray-400 text-sm mt-1">{mission.description}</p>
                </div>
                <div>
                  <h3 className="text-gray-400 mb-1">Objectives Completed</h3>
                  <div className="space-y-2">
                    {mission.objectives.map((objective: any) => (
                      <div key={objective.id} className="flex items-center">
                        {objective.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={objective.completed ? "text-green-300" : "text-red-300"}>
                          {objective.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="bg-gray-900 border-cyan-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-4 bg-gray-800 rounded-full mb-2">
                    <Trophy className="h-12 w-12 text-yellow-500" />
                  </div>
                  <h2 className="text-4xl font-bold text-white">{finalScore}</h2>
                  <div className={`text-2xl font-bold ${color}`}>{grade}</div>
                  <p className="text-gray-400 text-sm mt-1">Final Score</p>
                </div>
                <div className="space-y-4">
                  {/* Technical Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-gray-300">Technical Skill</span>
                      </div>
                      <span className="text-white font-bold">{metrics.technicalScore}</span>
                    </div>
                    <Progress value={metrics.technicalScore} className="h-2" />
                  </div>
                  {/* Ethics Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-gray-300">Ethics Score</span>
                      </div>
                      <span className="text-white font-bold">{metrics.ethicsScore}</span>
                    </div>
                    <Progress value={metrics.ethicsScore} className="h-2" />
                  </div>
                  {/* Detection Risk */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-gray-300">Detection Risk</span>
                      </div>
                      <span className="text-white font-bold">{metrics.detectionRisk}</span>
                    </div>
                    <Progress value={metrics.detectionRisk} className="h-2" />
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Performance Analysis</h3>
                  <p className="text-gray-300 text-sm">
                    {finalScore >= 80 &&
                      "Excellent work! You demonstrated strong technical skills while maintaining ethical standards. Your approach was methodical and effective."}
                    {finalScore >= 60 &&
                      finalScore < 80 &&
                      "Good job. You completed the mission with reasonable success, though there's room for improvement in balancing technical execution with ethical considerations."}
                    {finalScore < 60 &&
                      "Mission completed, but with significant issues. Consider reviewing ethical guidelines and improving your technical approach for future missions."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-cyan-700 text-cyan-400 hover:bg-cyan-950"
            onClick={() => {
              resetGame()
              router.push("/")
            }}
          >
            <Home className="mr-2 h-4 w-4" /> Return to Home
          </Button>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            onClick={() => {
              resetGame()
              router.push("/game/role-selection")
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Start New Mission
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default function DebriefPage() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  if (!hydrated) return null
  return <DebriefContent />
}
