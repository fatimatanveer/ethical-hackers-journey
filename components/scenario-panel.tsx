"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useGameStore } from "@/lib/game-state"
import type { Scenario, ScenarioChoice } from "@/lib/types"
import LogAnalysisMiniGame from "./LogAnalysisMiniGame"
import { motion } from "framer-motion"

// -- Scenario Panel (single scenario block) --
interface ScenarioPanelProps {
  scenario: Scenario
  isHighlighted?: boolean
  scrollIntoView?: boolean
}

export function ScenarioPanel({ scenario, isHighlighted, scrollIntoView }: ScenarioPanelProps) {
  const { makeScenarioChoice } = useGameStore()
  const [miniGameActive, setMiniGameActive] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const requiresMiniGame = scenario.requiresMiniGame === "log-analysis"

  useEffect(() => {
    if (requiresMiniGame && !scenario.completed) setMiniGameActive(true)
  }, [requiresMiniGame, scenario.completed])

  useEffect(() => {
    if (isHighlighted && scrollIntoView && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [isHighlighted, scrollIntoView])

  const handleMiniGameComplete = (success: boolean) => {
    setMiniGameActive(false)
    if (success) {
      const bestChoice = scenario.choices.find(choice =>
        choice.text.toLowerCase().includes("review") ||
        choice.text.toLowerCase().includes("analyze")
      )
      if (bestChoice) {
        makeScenarioChoice(scenario.id, bestChoice.id)
      }
    }
  }

  const handleChoiceClick = (choiceId: string) => {
    makeScenarioChoice(scenario.id, choiceId)
  }

  const getImpactColor = (impact: number) =>
    impact > 0 ? "text-green-400" : impact < 0 ? "text-red-400" : "text-gray-400"
  const getImpactIcon = (impact: number) => impact > 0 ? "+" : ""

  return (
    <motion.div
      ref={panelRef}
      className={`transition-all border-2 rounded-xl bg-gradient-to-br from-[#181928] to-[#1a233a] shadow-xl overflow-visible ${
        isHighlighted ? "border-purple-500 bg-purple-950/80 scale-[1.02] shadow-purple-800/30" : "border-cyan-700"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-400 flex items-center gap-2 text-xl font-bold drop-shadow">
            <Clock className="h-5 w-5" />
            {scenario.title}
          </CardTitle>
          {scenario.completed ? (
            <Badge variant="secondary" className="bg-green-900 text-green-300 shadow-sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          ) : (
            <Badge variant="secondary" className={isHighlighted ? "bg-purple-900 text-purple-200 animate-pulse" : "bg-yellow-900 text-yellow-300"}>
              <AlertTriangle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 break-words">
        <p className="text-gray-200 text-base px-1 break-words whitespace-pre-line">
          {scenario.description}
        </p>

        {/* Show consequence if completed */}
        {scenario.completed && scenario.choices.some(c => c.consequence) && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-cyan-950/80 p-3 rounded-lg text-sm text-cyan-200 border-l-4 border-cyan-600 font-medium shadow-inner break-words"
          >
            <b className="text-cyan-400">Outcome:</b>{" "}
            {scenario.choices.find(choice => choice.selected)?.consequence}
          </motion.div>
        )}

        {/* Mini-game */}
        {!scenario.completed && requiresMiniGame && miniGameActive ? (
          <LogAnalysisMiniGame onComplete={handleMiniGameComplete} />
        ) : (
          !scenario.completed && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-cyan-300 tracking-wide">
                Choose your approach:
              </h4>
              <div className="flex flex-col gap-2">
                {scenario.choices.map((choice) => (
                  <ChoiceButton key={choice.id} choice={choice} onClick={() => handleChoiceClick(choice.id)} disabled={!!scenario.completed} />
                ))}
              </div>
            </div>
          )
        )}
      </CardContent>
    </motion.div>
  )
}

// -- ChoiceButton for scenario choices --
interface ChoiceButtonProps {
  choice: ScenarioChoice
  onClick: () => void
  disabled?: boolean
}
function ChoiceButton({ choice, onClick, disabled }: ChoiceButtonProps) {
  const getImpactColor = (impact: number) =>
    impact > 0 ? "text-green-400" : impact < 0 ? "text-red-400" : "text-gray-400"
  const getImpactIcon = (impact: number) => (impact > 0 ? "+" : "")

  return (
    <Button
      variant="outline"
      className="w-full text-left h-auto p-4 border-cyan-700 hover:border-cyan-400/80 hover:bg-cyan-900/10 transition-all duration-150 rounded-lg break-words whitespace-normal"
      onClick={onClick}
      disabled={disabled}
      style={{ wordBreak: "break-word", whiteSpace: "normal" }}
    >
      <div className="space-y-1 w-full break-words whitespace-normal">
        <div className="text-white font-medium break-words whitespace-normal">{choice.text}</div>
        <div className="flex gap-4 text-xs mt-1 flex-wrap">
          <span className={getImpactColor(choice.ethicsImpact)}>
            Ethics: {getImpactIcon(choice.ethicsImpact)}
            {choice.ethicsImpact}
          </span>
          <span className={getImpactColor(-choice.detectionRiskImpact)}>
            Stealth: {getImpactIcon(-choice.detectionRiskImpact)}
            {-choice.detectionRiskImpact}
          </span>
          <span className={getImpactColor(choice.technicalScoreImpact)}>
            Technical: {getImpactIcon(choice.technicalScoreImpact)}
            {choice.technicalScoreImpact}
          </span>
        </div>
      </div>
    </Button>
  )
}

// -- Scenarios List Panel --
export function ScenarioList({ highlightId }: { highlightId?: string | null }) {
  const { getAvailableScenarios, getHighlightScenarioId } = useGameStore()
  const availableScenarios = getAvailableScenarios()
  const highlight = highlightId || getHighlightScenarioId()

  if (availableScenarios.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">No scenarios available at this time.</p>
          <p className="text-sm text-gray-500 mt-2">Complete more objectives to unlock new scenarios.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-lg md:text-xl font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          SCENARIOS PANEL
        </h2>
        <p className="text-xs text-cyan-200/70 pl-6">
          Each scenario represents a real-life cybersecurity decision. Choose wisely!
        </p>
      </motion.div>
      <div className="space-y-5">
        {availableScenarios.map((scenario) => (
          <ScenarioPanel
            key={scenario.id}
            scenario={scenario}
            isHighlighted={highlight === scenario.id}
            scrollIntoView={highlight === scenario.id}
          />
        ))}
      </div>
    </div>
  )
}
