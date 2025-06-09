import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface LeaderboardEntry {
  playerName: string
  score: number
  role: "red" | "blue"
  completedAt: number
}

export interface LeaderboardStore {
  entries: LeaderboardEntry[]
  add: (entry: LeaderboardEntry) => void
  clear: () => void
}

export const useLeaderboardStore = create<LeaderboardStore>()(
  persist(
    (set) => ({
      entries: [],
      add: (entry) =>
        set((state) => ({
          entries: [...state.entries, entry],
        })),
      clear: () =>
        set(() => ({
          entries: [],
        })),
    }),
    {
      name: "ethical-hackers-journey-leaderboard",
    }
  )
)
