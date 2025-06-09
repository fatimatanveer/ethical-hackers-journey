"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Eye, Trophy } from "lucide-react"
import { useGameStore } from "@/lib/game-state"
import { motion } from "framer-motion"

export function MetricsDisplay() {
  const { metrics, calculateFinalScore } = useGameStore()

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    if (score >= 40) return "text-orange-400"
    return "text-red-400"
  }

  const getScoreGlow = (score: number) => {
    if (score >= 80) return "shadow-[0_0_10px_2px_rgba(34,197,94,0.6)]"
    if (score >= 60) return "shadow-[0_0_10px_2px_rgba(251,191,36,0.6)]"
    if (score >= 40) return "shadow-[0_0_10px_2px_rgba(251,146,60,0.6)]"
    return "shadow-[0_0_10px_2px_rgba(239,68,68,0.6)]"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Good"
    if (score >= 70) return "Fair"
    if (score >= 60) return "Poor"
    return "Critical"
  }

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "text-red-400"
    if (risk >= 60) return "text-orange-400"
    if (risk >= 40) return "text-yellow-400"
    return "text-green-400"
  }

  const getRiskGlow = (risk: number) => {
    if (risk >= 80) return "shadow-[0_0_10px_2px_rgba(239,68,68,0.6)]"
    if (risk >= 60) return "shadow-[0_0_10px_2px_rgba(251,146,60,0.6)]"
    if (risk >= 40) return "shadow-[0_0_10px_2px_rgba(251,191,36,0.6)]"
    return "shadow-[0_0_10px_2px_rgba(34,197,94,0.6)]"
  }

  const getRiskLabel = (risk: number) => {
    if (risk >= 80) return "Critical"
    if (risk >= 60) return "High"
    if (risk >= 40) return "Medium"
    if (risk >= 20) return "Low"
    return "Minimal"
  }

  // Here, we define an array for the UI cards!
  const metricCards = [
    {
      icon: <Zap className="h-6 w-6" />,
      label: "Technical Skill",
      value: metrics.technicalScore,
      color: getScoreColor(metrics.technicalScore),
      glow: getScoreGlow(metrics.technicalScore),
      badge: getScoreLabel(metrics.technicalScore),
      border: "border-blue-700",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      label: "Ethics Score",
      value: metrics.ethicsScore,
      color: getScoreColor(metrics.ethicsScore),
      glow: getScoreGlow(metrics.ethicsScore),
      badge: getScoreLabel(metrics.ethicsScore),
      border: "border-green-700",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-400 shadow-lg",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      label: "Detection Risk",
      value: metrics.detectionRisk,
      color: getRiskColor(metrics.detectionRisk),
      glow: getRiskGlow(metrics.detectionRisk),
      badge: getRiskLabel(metrics.detectionRisk),
      border: "border-red-700",
      iconBg: "bg-gradient-to-br from-red-500 to-pink-400 shadow-lg",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      label: "Overall Score",
      value: calculateFinalScore(),
      color: getScoreColor(calculateFinalScore()),
      glow: getScoreGlow(calculateFinalScore()),
      badge: getScoreLabel(calculateFinalScore()),
      border: "border-purple-700",
      iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-400 shadow-lg",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {metricCards.map((m, idx) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.12 }}
        >
          <Card
            className={`relative bg-gradient-to-br from-[#1a233a] to-[#181928] ${m.border} border-2 overflow-hidden rounded-2xl ${m.glow}`}
          >
            <CardHeader className="pb-1 flex flex-row items-center gap-3">
              <span className={`rounded-xl p-2 ${m.iconBg}`}>{m.icon}</span>
              <CardTitle className={`${m.color} text-base font-bold`}>{m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-3xl font-extrabold drop-shadow ${m.color}`}>{m.value}</span>
                  <Badge variant="secondary" className={`text-sm px-3 py-1 bg-black/60 ${m.color} border ${m.border}`}>
                    {m.badge}
                  </Badge>
                </div>
                <Progress value={m.value} className="h-2 bg-[#1a233a] mt-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
