"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Info, Lock } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [isHovering, setIsHovering] = useState(false)
  const [isAdminHover, setIsAdminHover] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1021] via-[#1a1932] to-[#1b2245] text-white flex flex-col relative overflow-hidden">
      {/* Animated Neon Background Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[650px] h-[700px] bg-purple-700/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-1/2 translate-x-1/2 w-[450px] h-[400px] bg-cyan-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 drop-shadow-[0_4px_32px_rgba(80,0,180,0.3)] mb-3">
            Ethical Hacker&apos;s Journey
          </h1>
          <motion.p
            className="text-2xl md:text-3xl font-semibold tracking-wide text-cyan-200 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-pink-400">Red Team</span> / <span className="text-blue-400">Blue Team</span> Simulator
          </motion.p>
          <p className="text-base md:text-lg text-cyan-100/90 max-w-2xl mx-auto mt-3">
            Master the art of cybersecurity through immersive, ethical hacking simulations.<br className="hidden md:block" />
            <span className="text-purple-300/90">Choose your path, complete missions, and learn real-world security skills.</span>
          </p>
        </motion.div>

        {/* Role Cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col md:flex-row gap-7 max-w-3xl w-full mb-14"
        >
          <Card className="flex-1 bg-gradient-to-br from-[#271631]/80 to-[#181827]/80 border-2 border-red-700 shadow-lg overflow-hidden hover:scale-105 hover:shadow-red-700/30 transition-all duration-300 group">
            <CardContent className="p-7">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-red-400 animate-pulse mr-3" />
                <div>
                  <h3 className="text-2xl font-bold text-red-300 group-hover:text-white transition">Red Team</h3>
                  <p className="text-gray-300 text-sm">Offensive Security</p>
                </div>
              </div>
              <p className="text-gray-200/90">
                Take on the role of an ethical hacker, identify vulnerabilities, and execute controlled penetration
                tests to improve security posture.
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-gradient-to-br from-[#163344]/80 to-[#232c3b]/80 border-2 border-blue-700 shadow-lg overflow-hidden hover:scale-105 hover:shadow-blue-700/30 transition-all duration-300 group">
            <CardContent className="p-7">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-400 animate-pulse mr-3" />
                <div>
                  <h3 className="text-2xl font-bold text-blue-300 group-hover:text-white transition">Blue Team</h3>
                  <p className="text-gray-300 text-sm">Defensive Security</p>
                </div>
              </div>
              <p className="text-gray-200/90">
                Defend systems against attacks, monitor for suspicious activity, and implement security controls to
                protect critical assets.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/game/role-selection">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none px-8 font-bold shadow-cyan-500/30 shadow-xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <motion.span animate={{ x: isHovering ? 6 : 0 }} transition={{ type: "spring", stiffness: 500 }}>
                Start Game
              </motion.span>
              {isHovering && (
                <motion.span initial={{ opacity: 0, x: -7 }} animate={{ opacity: 1, x: 0 }} className="ml-2">
                  →
                </motion.span>
              )}
            </Button>
          </Link>
          <Link href="/instructions">
            <Button variant="outline" size="lg" className="border-purple-700 text-purple-300 hover:bg-purple-900/40 font-bold px-8">
              <Info className="mr-2 h-5 w-5" /> Instructions
            </Button>
          </Link>
          
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="z-10 py-4 text-center text-cyan-300 text-xs md:text-sm font-mono tracking-widest border-t border-cyan-800/30 bg-gradient-to-r from-cyan-900/10 to-purple-900/10 shadow-inner">
        Ethical Hacker&apos;s Journey &copy; {new Date().getFullYear()} | <span className="text-purple-200">Educational Purposes Only</span>
      </footer>

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
      <Link
        href="/admin"
        className="fixed z-50 bottom-6 right-8 flex items-center gap-2 bg-gradient-to-r from-cyan-700 to-purple-700 hover:from-cyan-500 hover:to-purple-500 text-white px-5 py-2 rounded-xl shadow-lg font-semibold transition-all border-2 border-cyan-800 opacity-80 hover:opacity-100"
      >
        <Lock className="h-4 w-4 mr-1" />
        Admin Panel
      </Link>
    </div>
  )
}
