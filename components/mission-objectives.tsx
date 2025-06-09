"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, AlertTriangle, Target } from "lucide-react"
import { useGameStore } from "@/lib/game-state"
import { motion } from "framer-motion"

export function MissionObjectives() {
  const { getCurrentMission } = useGameStore()
  const mission = getCurrentMission()

  if (!mission) {
    return (
      <Card className="bg-gray-900 border-gray-700 shadow-lg">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">No active mission</p>
        </CardContent>
      </Card>
    )
  }

  const completedCount = mission.objectives.filter((obj) => obj.completed).length
  const totalCount = mission.objectives.length
  const progressPercentage = (completedCount / totalCount) * 100

  return (
    <Card className="bg-gradient-to-br from-[#181928] to-[#142133] border-cyan-700 shadow-2xl rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-400 flex items-center gap-2 font-bold tracking-wide text-lg uppercase drop-shadow">
            <Target className="h-5 w-5" />
            Mission Objectives
          </CardTitle>
          <Badge variant="secondary" className="bg-cyan-900 text-cyan-300 shadow">
            {completedCount}/{totalCount} Complete
          </Badge>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2 shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full shadow-cyan-400/30"
            style={{ width: `${progressPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 mt-1">
        {mission.objectives.map((objective, index) => (
          <motion.div
            key={objective.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-200
              ${
                objective.completed
                  ? "bg-green-950/20 border-green-700 shadow-green-400/10"
                  : "bg-gray-800/60 border-gray-700"
              }
            `}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index, duration: 0.4, type: "spring" }}
          >
            <div className="flex-shrink-0 mt-0.5">
              {objective.completed ? (
                <CheckCircle className="h-5 w-5 text-green-400 drop-shadow" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </div>

            <div className="flex-1 space-y-1">
              <p className={`font-medium ${objective.completed ? "text-green-300" : "text-gray-300"}`}>
                {objective.description}
              </p>

              {objective.ethicalImplications && (
                <div className="flex items-start gap-2 text-xs text-yellow-400">
                  <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>{objective.ethicalImplications}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
