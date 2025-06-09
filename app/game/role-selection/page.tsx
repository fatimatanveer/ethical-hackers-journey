"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Zap, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useGameStore } from "@/lib/game-state"
import { getMissionsByRole } from "@/lib/mission-data"
import Link from "next/link"

export default function RoleSelectionPage() {
  const router = useRouter()
  const { setPlayerName, setRole, startMission } = useGameStore()
  const [name, setName] = useState("")
  const [selectedRole, setSelectedRole] = useState<"red" | "blue" | null>(null)
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null)

  const handleStart = () => {
    if (!name || !selectedRole || !selectedMissionId) return
    setPlayerName(name)
    setRole(selectedRole)
    startMission(selectedMissionId)
    router.push("/game/gameplay")
  }

  const missions = selectedRole ? getMissionsByRole(selectedRole) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1021] via-[#191933] to-[#1a2248] text-white p-6 relative overflow-hidden">
      {/* Neon Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 top-[-130px] w-[500px] h-[440px] bg-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[250px] h-[320px] bg-purple-600/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950 mb-8 font-bold flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-xl">
            Start Your Mission
          </h1>
          <p className="text-cyan-200/80 mt-2 text-base md:text-lg">
            Choose your <span className="text-pink-400 font-bold">role</span> and mission to begin your cybersecurity journey.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Player Name */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <h2 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow">
              Enter Your <span className="text-purple-300">Codename</span>
            </h2>
            <Input
              type="text"
              placeholder="Enter your codename..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-900 border-cyan-700 text-white placeholder:text-cyan-200/60"
            />
          </motion.div>

          {/* Role Selection */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            <h2 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow">
              Choose Your <span className="text-pink-400">Role</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RED TEAM */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 32px #ff4e4e40" }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                <Card
                  className={`bg-gradient-to-br from-[#271631]/80 to-[#181827]/90 cursor-pointer border-2 transition-all duration-200 rounded-xl ${
                    selectedRole === "red"
                      ? "border-red-500 ring-2 ring-red-500/60 shadow-red-700/30 shadow-xl scale-105"
                      : "border-gray-700 hover:border-red-700"
                  }`}
                  onClick={() => setSelectedRole("red")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Zap className="h-8 w-8 text-red-400 animate-pulse mr-4" />
                      <div>
                        <h3 className="text-2xl font-bold text-red-300">Red Team</h3>
                        <p className="text-gray-300 text-sm">Offensive Security</p>
                      </div>
                    </div>
                    <p className="text-gray-200/90">
                      Take on the role of an ethical hacker, identify vulnerabilities, and execute controlled penetration tests to improve security posture.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              {/* BLUE TEAM */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 32px #48c7ff50" }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                <Card
                  className={`bg-gradient-to-br from-[#163344]/80 to-[#232c3b]/90 cursor-pointer border-2 transition-all duration-200 rounded-xl ${
                    selectedRole === "blue"
                      ? "border-blue-500 ring-2 ring-blue-500/60 shadow-blue-700/30 shadow-xl scale-105"
                      : "border-gray-700 hover:border-blue-700"
                  }`}
                  onClick={() => setSelectedRole("blue")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="h-8 w-8 text-blue-400 animate-pulse mr-4" />
                      <div>
                        <h3 className="text-2xl font-bold text-blue-300">Blue Team</h3>
                        <p className="text-gray-300 text-sm">Defensive Security</p>
                      </div>
                    </div>
                    <p className="text-gray-200/90">
                      Defend systems against attacks, monitor for suspicious activity, and implement security controls to protect critical assets.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Mission Selection */}
          {selectedRole && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
              <h2 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow">
                Select Your <span className="text-purple-300">Mission</span>
              </h2>
              <div className="space-y-4">
                {missions.map((mission) => (
                  <motion.div
                    whileHover={{
                      scale: 1.025,
                      boxShadow: selectedRole === "red"
                        ? "0 0 28px #ff4e4e40"
                        : "0 0 28px #48c7ff50"
                    }}
                    key={mission.id}
                  >
                    <Card
                      className={`bg-gray-900 cursor-pointer transition-all border-2 rounded-xl ${
                        selectedMissionId === mission.id
                          ? `border-${selectedRole === "red" ? "red" : "blue"}-500 ring-2 ring-${selectedRole === "red" ? "red" : "blue"}-500/50 scale-105`
                          : "border-gray-700 hover:border-cyan-700"
                      }`}
                      onClick={() => setSelectedMissionId(mission.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-white">{mission.title}</h3>
                            <p className="text-gray-400 text-sm">{mission.description}</p>
                          </div>
                          <div className={`bg-gradient-to-br ${selectedRole === "red"
                            ? "from-red-800/60 to-red-700/80 text-red-100"
                            : "from-blue-800/60 to-blue-700/80 text-blue-100"} px-2 py-1 rounded text-xs font-bold drop-shadow`}>
                            {mission.difficulty}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-8"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none px-8 font-bold text-xl shadow-lg shadow-cyan-700/20"
              disabled={!name || !selectedRole || !selectedMissionId}
              onClick={handleStart}
            >
              Start Mission
            </Button>
          </motion.div>
        </div>
      </div>
      {/* Animate pulse-slow */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1 }
          50% { opacity: .77 }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
