"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Clock, User, TerminalIcon } from "lucide-react"
import { useGameStore } from "@/lib/game-state"

export function MissionLog() {
  const { terminalHistory, scenarioHistory, getCurrentMission } = useGameStore()
  const mission = getCurrentMission()

  // Combine and sort all activities by timestamp
  const allActivities = [
    ...terminalHistory.map((item) => ({
      type: "command" as const,
      timestamp: item.timestamp,
      content: item.command,
      output: item.output,
    })),
    ...scenarioHistory.map((item) => {
      const scenario = mission?.scenarios.find((s) => s.id === item.scenarioId)
      const choice = scenario?.choices.find((c) => c.id === item.choiceId)
      return {
        type: "scenario" as const,
        timestamp: item.timestamp,
        content: scenario?.title || "Unknown Scenario",
        choice: choice?.text || "Unknown Choice",
        consequence: choice?.consequence,
      }
    }),
  ].sort((a, b) => a.timestamp - b.timestamp)

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <Card className="h-full bg-gray-900 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-gray-300 flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          Mission Log
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 p-4">
          {allActivities.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No activities logged yet</p>
              <p className="text-xs mt-1">Start executing commands or making decisions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allActivities.map((activity, index) => (
                <div key={index} className="border-l-2 border-gray-700 pl-4 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="secondary"
                      className={
                        activity.type === "command" ? "bg-green-900 text-green-300" : "bg-blue-900 text-blue-300"
                      }
                    >
                      {activity.type === "command" ? (
                        <TerminalIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <User className="h-3 w-3 mr-1" />
                      )}
                      {activity.type === "command" ? "Command" : "Decision"}
                    </Badge>
                    <span className="text-xs text-gray-500">{formatTime(activity.timestamp)}</span>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-300 font-medium">{activity.content}</p>

                    {activity.type === "command" && activity.output && (
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{activity.output}</p>
                    )}

                    {activity.type === "scenario" && (
                      <div className="mt-1 space-y-1">
                        <p className="text-gray-400 text-xs">Choice: {activity.choice}</p>
                        {activity.consequence && <p className="text-gray-500 text-xs">{activity.consequence}</p>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
