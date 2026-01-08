'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Skill } from '@/lib/skill-types'

export interface StackState {
  items: Skill[]
  addItem: (skill: Skill) => void
  removeItem: (skillId: string) => void
  clearStack: () => void
  isInStack: (skillId: string) => boolean
  getSkillsOnly: () => Skill[]
  getAgentsOnly: () => Skill[]
}

export const useStackStore = create<StackState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (skill) =>
        set((state) => {
          // Check if already in stack
          if (state.items.find((s) => s.id === skill.id)) {
            return state
          }
          return {
            items: [...state.items, skill],
          }
        }),

      removeItem: (skillId) =>
        set((state) => ({
          items: state.items.filter((s) => s.id !== skillId),
        })),

      clearStack: () => set({ items: [] }),

      isInStack: (skillId) => get().items.some((s) => s.id === skillId),

      getSkillsOnly: () =>
        get().items.filter((item) => !item.tags?.includes('agent')),

      getAgentsOnly: () =>
        get().items.filter((item) => item.tags?.includes('agent')),
    }),
    {
      name: 'stackshack-stack',
    }
  )
)
