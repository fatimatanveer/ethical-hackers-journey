"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Sparkles, User, Target, Shield, Zap, ListChecks, BarChart, Trophy, RefreshCcw } from "lucide-react"

const guideSteps = [
  {
    icon: <Sparkles className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Access the Game",
    desc: "Open the application in your web browser."
  },
  {
    icon: <Target className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Start Game",
    desc: "Click the “Start Game” button on the landing page."
  },
  {
    icon: <User className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Enter Codename",
    desc: "Input your player codename or nickname."
  },
  {
    icon: <Shield className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Choose Your Role",
    desc: <>Select <span className="text-red-400 font-bold">Red Team</span> (offense) or <span className="text-blue-400 font-bold">Blue Team</span> (defense).</>
  },
  {
    icon: <ListChecks className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Select a Mission",
    desc: "Pick a mission and read the briefing carefully."
  },
  {
    icon: <Zap className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Begin Gameplay",
    desc: "Make decisions in scenario panels and use the in-game terminal for technical actions."
  },
  {
    icon: <BarChart className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Monitor Your Progress",
    desc: "Watch your dashboard cards and objectives panel."
  },
  {
    icon: <Trophy className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Complete the Mission",
    desc: "Finish all objectives or reach an end scenario. Get a debrief and your score."
  },
  {
    icon: <RefreshCcw className="text-cyan-300 inline-block mr-2" size={22} />,
    title: "Replay or Try New Missions",
    desc: "Use the reset/replay feature for more practice."
  }
]

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1932] via-[#23233b] to-[#181827] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl rounded-2xl border border-cyan-700/50 shadow-[0_8px_40px_rgba(0,190,255,0.10)] bg-black/80 p-8 mt-10"
        style={{
          boxShadow: "0 0 64px 0 rgba(80,200,255,0.12), 0 4px 24px 0 rgba(80,0,180,0.08)"
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow">
          User Guide
        </h1>
        <p className="mb-9 text-center text-cyan-200 text-lg tracking-wide">
          Step-by-step instructions for new players
        </p>

        <ol className="space-y-6 text-base md:text-lg">
          {guideSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="pt-1">{step.icon}</span>
              <div>
                <span className="font-semibold text-cyan-300">{step.title}:</span>{" "}
                <span className="text-cyan-100">{step.desc}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-800 font-bold shadow-lg shadow-cyan-400/10 px-7 py-2 text-lg rounded-xl">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
