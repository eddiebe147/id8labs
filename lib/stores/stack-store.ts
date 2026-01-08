'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Skill } from '@/lib/skill-types'

export type StackItemType = 'skill' | 'agent' | 'command' | 'setting'

export interface StackItem {
  id: string
  slug: string
  name: string
  description: string
  type: StackItemType
  category?: string
  tags?: string[]
}

export interface StackState {
  items: StackItem[]
  addItem: (item: StackItem) => void
  removeItem: (itemId: string) => void
  clearStack: () => void
  isInStack: (itemId: string) => boolean
  getSkillsOnly: () => StackItem[]
  getAgentsOnly: () => StackItem[]
  getCommandsOnly: () => StackItem[]
  getSettingsOnly: () => StackItem[]
  getByType: (type: StackItemType) => StackItem[]
}

export const useStackStore = create<StackState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          // Check if already in stack
          if (state.items.find((s) => s.id === item.id)) {
            return state
          }
          return {
            items: [...state.items, item],
          }
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((s) => s.id !== itemId),
        })),

      clearStack: () => set({ items: [] }),

      isInStack: (itemId) => get().items.some((s) => s.id === itemId),

      getSkillsOnly: () =>
        get().items.filter((item) => item.type === 'skill'),

      getAgentsOnly: () =>
        get().items.filter((item) => item.type === 'agent'),

      getCommandsOnly: () =>
        get().items.filter((item) => item.type === 'command'),

      getSettingsOnly: () =>
        get().items.filter((item) => item.type === 'setting'),

      getByType: (type) =>
        get().items.filter((item) => item.type === type),
    }),
    {
      name: 'stackshack-stack',
      version: 2, // Increment version to clear old storage
    }
  )
)
