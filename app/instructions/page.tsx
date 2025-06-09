"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Zap, Terminal, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Game Instructions
          </h1>
          <p className="text-gray-400 mt-2">
            Learn how to play Ethical Hacker&apos;s Journey and master both offensive and defensive cybersecurity
            skills.
          </p>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="red-team">Red Team</TabsTrigger>
            <TabsTrigger value="blue-team">Blue Team</TabsTrigger>
            <TabsTrigger value="commands">Commands</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Card className="bg-gray-900 border-cyan-900">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Game Overview</CardTitle>
                  <CardDescription>How the simulation works</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Ethical Hacker&apos;s Journey is an educational cybersecurity simulation that lets you experience
                    both offensive (Red Team) and defensive (Blue Team) security roles.
                  </p>

                  <div className="space-y-4 mt-4">
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h3 className="font-bold text-lg text-cyan-400">Game Flow</h3>
                      <ol className="list-decimal list-inside space-y-2 mt-2 text-gray-300">
                        <li>Choose your role (Red Team or Blue Team)</li>
                        <li>Read the mission briefing to understand your objectives</li>
                        <li>Use the terminal and interactive scenario panels to complete tasks and make decisions</li>
                        <li>Monitor your Ethics and Threat meters throughout the mission</li>
                        <li>Complete the mission and review your performance in the debrief</li>
                      </ol>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="font-bold text-lg text-purple-400">Key Components</h3>
                      <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
                        <li>
                          <span className="font-bold text-white">Terminal:</span> Execute commands to interact with
                          systems
                        </li>
                        <li>
                          <span className="font-bold text-white">Scenario Panels:</span> Make decisions that affect the
                          mission outcome
                        </li>
                        <li>
                          <span className="font-bold text-white">Ethics Meter:</span> Tracks the ethical implications of
                          your actions
                        </li>
                        <li>
                          <span className="font-bold text-white">Threat Meter:</span> Shows your risk of detection or
                          system compromise
                        </li>
                        <li>
                          <span className="font-bold text-white">Mini-games:</span> Solve puzzles representing security
                          challenges
                        </li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h3 className="font-bold text-lg text-yellow-400">Scoring</h3>
                      <p className="mt-2 text-gray-300">
                        Your performance is evaluated based on:
                        <br />- Technical Success: How effectively you completed objectives
                        <br />- Detection Risk: How stealthy or secure your approach was
                        <br />- Ethics Score: How well you adhered to ethical principles
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="red-team" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Card className="bg-gray-900 border-red-900">
                <CardHeader>
                  <CardTitle className="text-red-400">Red Team Instructions</CardTitle>
                  <CardDescription>Offensive security role</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start mb-4">
                    <div className="bg-red-900/30 p-3 rounded-lg mr-4">
                      <Zap className="h-8 w-8 text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-300">
                        As a Red Team member, your role is to identify and exploit vulnerabilities in systems, while
                        maintaining ethical standards and minimizing damage.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h3 className="font-bold text-lg text-red-400">Key Responsibilities</h3>
                      <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
                        <li>Reconnaissance: Gather information about target systems</li>
                        <li>Vulnerability Scanning: Identify potential security weaknesses</li>
                        <li>Exploitation: Demonstrate how vulnerabilities could be leveraged</li>
                        <li>Privilege Escalation: Gain higher-level access when possible</li>
                        <li>Documentation: Record findings for remediation</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-bold text-lg text-orange-400">Ethical Considerations</h3>
                      <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
                        <li>Only test systems you have explicit permission to test</li>
                        <li>Avoid destructive testing that could cause outages</li>
                        <li>Protect sensitive data discovered during testing</li>
                        <li>Provide clear documentation to help fix vulnerabilities</li>
                        <li>Follow the principle of least privilege</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h3 className="font-bold text-lg text-yellow-400">Common Tools</h3>
                      <p className="mt-2 text-gray-300">
                        In the simulation, you&apos;ll use commands representing tools like:
                        <br />- nmap: Network scanning
                        <br />- dirb/gobuster: Directory enumeration
                        <br />- metasploit: Exploitation framework
                        <br />- hydra: Password cracking
                        <br />- wireshark: Network traffic analysis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="blue-team" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Card className="bg-gray-900 border-blue-900">
                <CardHeader>
                  <CardTitle className="text-blue-400">Blue Team Instructions</CardTitle>
                  <CardDescription>Defensive security role</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg mr-4">
                      <Shield className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-gray-300">
                        As a Blue Team member, your role is to protect systems from attacks, detect security incidents,
                        and respond effectively to minimize damage.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-bold text-lg text-blue-400">Key Responsibilities</h3>
                      <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
                        <li>Monitoring: Watch for suspicious activity in systems and networks</li>
                        <li>Hardening: Implement security controls to prevent attacks</li>
                        <li>Incident Response: React quickly to security breaches</li>
                        <li>Forensics: Analyze systems to understand attack methods</li>
                        <li>Recovery: Restore systems to normal operation after incidents</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h3 className="font-bold text-lg text-indigo-400">Defense Strategies</h3>
                      <ul className="list-disc list-inside space-y-2 mt-2 text-gray-300">
                        <li>Defense in Depth: Multiple layers of security controls</li>
                        <li>Principle of Least Privilege: Limit access to what&apos;s necessary</li>
                        <li>Regular Patching: Keep systems updated against known vulnerabilities</li>
                        <li>Security Monitoring: Implement detection systems</li>
                        <li>Incident Response Planning: Prepare for security breaches</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h3 className="font-bold text-lg text-cyan-400">Common Tools</h3>
                      <p className="mt-2 text-gray-300">
                        In the simulation, you&apos;ll use commands representing tools like:
                        <br />- SIEM: Security Information and Event Management
                        <br />- IDS/IPS: Intrusion Detection/Prevention Systems
                        <br />- Firewall: Network traffic filtering
                        <br />- Log Analysis: Examining system logs for suspicious activity
                        <br />- Vulnerability Scanners: Identifying security weaknesses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="commands" className="mt-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Card className="bg-gray-900 border-green-900">
                <CardHeader>
                  <CardTitle className="text-green-400">Terminal Commands</CardTitle>
                  <CardDescription>How to interact with the simulation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start mb-4">
                    <div className="bg-green-900/30 p-3 rounded-lg mr-4">
                      <Terminal className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                      <p className="text-gray-300">
                        The terminal is your primary interface for interacting with systems in the simulation. Here are
                        some common commands you can use:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-bold text-lg text-green-400">General Commands</h3>
                        <div className="mt-2 space-y-2">
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">help</span>
                            <span className="text-gray-400 block text-xs mt-1">Display available commands</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">clear</span>
                            <span className="text-gray-400 block text-xs mt-1">Clear the terminal</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">status</span>
                            <span className="text-gray-400 block text-xs mt-1">Show current mission status</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">objectives</span>
                            <span className="text-gray-400 block text-xs mt-1">List mission objectives</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-l-4 border-yellow-500 pl-4">
                        <h3 className="font-bold text-lg text-yellow-400">Red Team Commands</h3>
                        <div className="mt-2 space-y-2">
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">scan [target]</span>
                            <span className="text-gray-400 block text-xs mt-1">Scan a target for vulnerabilities</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">exploit [vulnerability] [target]</span>
                            <span className="text-gray-400 block text-xs mt-1">Attempt to exploit a vulnerability</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">brute [service] [target]</span>
                            <span className="text-gray-400 block text-xs mt-1">Attempt a brute force attack</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-bold text-lg text-blue-400">Blue Team Commands</h3>
                        <div className="mt-2 space-y-2">
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">monitor [system]</span>
                            <span className="text-gray-400 block text-xs mt-1">
                              Monitor a system for suspicious activity
                            </span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">analyze [log]</span>
                            <span className="text-gray-400 block text-xs mt-1">Analyze a log file</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">patch [system] [vulnerability]</span>
                            <span className="text-gray-400 block text-xs mt-1">Apply a security patch</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">block [ip]</span>
                            <span className="text-gray-400 block text-xs mt-1">Block an IP address</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-l-4 border-red-500 pl-4">
                        <h3 className="font-bold text-lg text-red-400">Advanced Commands</h3>
                        <div className="mt-2 space-y-2">
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">decrypt [file]</span>
                            <span className="text-gray-400 block text-xs mt-1">Attempt to decrypt a file</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">forensic [system]</span>
                            <span className="text-gray-400 block text-xs mt-1">Perform forensic analysis</span>
                          </div>
                          <div className="bg-black/50 p-2 rounded font-mono">
                            <span className="text-purple-400">report [finding]</span>
                            <span className="text-gray-400 block text-xs mt-1">Document a security finding</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-black/30 p-4 rounded-lg border border-yellow-900">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-300 text-sm">
                        <span className="font-bold">Note:</span> The available commands will vary depending on your
                        mission and role. Use the <span className="font-mono bg-black/50 px-1 rounded">help</span>{" "}
                        command to see what&apos;s available in your current context.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Link href="/game/role-selection">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Start Your Mission
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
