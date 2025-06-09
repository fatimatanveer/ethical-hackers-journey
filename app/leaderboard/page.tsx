"use client"

import { useLeaderboardStore } from "@/lib/leaderboard-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LeaderboardPage() {
  const { entries, clear } = useLeaderboardStore()

  // Sort: Highest score first, then most recent
  const sorted = [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return b.completedAt - a.completedAt
  })

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-900 border-cyan-700 mb-8">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-3xl text-cyan-400 font-bold mb-1">
              🏆 Leaderboard
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Top players of all time (local to your browser)
            </p>
          </CardHeader>
          <CardContent>
            {sorted.length === 0 ? (
              <div className="text-center text-gray-400 py-6">No leaderboard entries yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-cyan-300 border-b border-gray-700">
                      <th className="py-2 px-2">#</th>
                      <th className="py-2 px-2">Player</th>
                      <th className="py-2 px-2">Role</th>
                      <th className="py-2 px-2">Score</th>
                      <th className="py-2 px-2">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((entry, i) => (
                      <tr key={i} className="border-b border-gray-800 last:border-0">
                        <td className="py-2 px-2">{i + 1}</td>
                        <td className="py-2 px-2 font-bold">{entry.playerName}</td>
                        <td className="py-2 px-2">
                          {entry.role === "red" ? (
                            <span className="inline-flex items-center gap-1 text-red-400">
                              <Zap className="w-4 h-4" /> Red
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-blue-400">
                              <Shield className="w-4 h-4" /> Blue
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-2 font-mono text-lg text-yellow-300">{entry.score}</td>
                        <td className="py-2 px-2 text-gray-400 text-xs">
                          {format(new Date(entry.completedAt), "yyyy-MM-dd HH:mm")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {sorted.length > 0 && (
              <div className="flex justify-between mt-6">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-800 text-red-400 hover:bg-red-900/40"
                  onClick={clear}
                >
                  Clear Leaderboard
                </Button>
                <Link href="/">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
