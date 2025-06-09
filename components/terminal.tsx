"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TerminalIcon } from "lucide-react"
import { useGameStore } from "@/lib/game-state"

const isErrorOrWarning = (output: string) =>
  output?.toLowerCase().includes("not recognized") ||
  output?.toLowerCase().includes("error") ||
  output?.toLowerCase().includes("fail") ||
  output?.toLowerCase().includes("alert")

export function Terminal() {
  const [currentCommand, setCurrentCommand] = useState("")
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [localHistory, setLocalHistory] = useState<string[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { terminalHistory, executeCommand } = useGameStore()

  useEffect(() => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
      }
    }, 20)
  }, [terminalHistory])

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  useEffect(() => {
    setLocalHistory(
      terminalHistory.map((item) => item.command).filter((cmd) => !!cmd)
    )
  }, [terminalHistory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentCommand.trim()) return
    executeCommand(currentCommand)
    setCurrentCommand("")
    setHistoryIndex(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setHistoryIndex((prev) => {
        if (localHistory.length === 0) return null
        if (prev === null) return localHistory.length - 1
        if (prev > 0) return prev - 1
        return 0
      })
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setHistoryIndex((prev) => {
        if (localHistory.length === 0) return null
        if (prev === null) return null
        if (prev < localHistory.length - 1) return prev + 1
        return null
      })
    }
  }

  useEffect(() => {
    if (
      historyIndex !== null &&
      localHistory.length > 0 &&
      localHistory[historyIndex]
    ) {
      setCurrentCommand(localHistory[historyIndex])
    } else if (historyIndex === null) {
      setCurrentCommand("")
    }
    // eslint-disable-next-line
  }, [historyIndex])

  const [showCursor, setShowCursor] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 600)
    return () => clearInterval(interval)
  }, [])

  const handleCommandClick = (cmd: string) => {
    setCurrentCommand(cmd)
    setHistoryIndex(null)
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <Card className="h-full bg-black border-green-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-500 flex items-center gap-2 text-sm">
          <TerminalIcon className="h-4 w-4" />
          Security Terminal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="terminal">
          <ScrollArea className="terminal-output" ref={scrollAreaRef}>
            <div className="p-4 space-y-1">
              {terminalHistory.length === 0 && (
                <div className="text-green-400 text-sm">
                  Welcome to the Ethical Hacker&apos;s Journey Terminal
                  <br />
                  Type &apos;help&apos; to see available commands
                </div>
              )}
              {terminalHistory.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-start cursor-pointer group" tabIndex={-1} onClick={() => handleCommandClick(item.command)}>
                    <span className="text-green-500 mr-2 flex-shrink-0">$</span>
                    <span className="text-green-300 group-hover:underline">{item.command}</span>
                  </div>
                  {item.output && (
                    <div
                      className={
                        "whitespace-pre-wrap ml-4 text-sm " +
                        (isErrorOrWarning(item.output)
                          ? "text-red-400"
                          : "text-green-100")
                      }
                    >
                      {item.output}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSubmit} className="terminal-input border-t border-green-700 p-4">
            <div className="flex items-center">
              <span className="terminal-prompt">
                ${showCursor ? <span className="animate-pulse">▊</span> : " "}
              </span>
              <Input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => {
                  setCurrentCommand(e.target.value)
                  setHistoryIndex(null)
                }}
                onKeyDown={handleKeyDown}
                className="terminal-command bg-transparent border-none text-green-500 focus:ring-0 focus:outline-none"
                placeholder="Enter command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
