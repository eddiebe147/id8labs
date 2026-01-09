'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Skill } from '@/lib/skill-types'

export type StackItemType = 'skill' | 'agent' | 'command' | 'setting' | 'plugin'

export interface StackItem {
  id: string
  slug: string
  name: string
  description: string
  type: StackItemType
  category?: string
  tags?: string[]
}

export interface SavedStack {
  id: string
  name: string
  description?: string
  items: StackItem[]
  createdAt: string
  updatedAt: string
}

export interface StackState {
  items: StackItem[]
  currentStackId: string | null
  savedStacks: SavedStack[]
  
  // Current stack management
  addItem: (item: StackItem) => void
  removeItem: (itemId: string) => void
  clearStack: () => void
  isInStack: (itemId: string) => boolean
  
  // Saved stacks management
  saveStack: (name: string, description?: string) => SavedStack
  loadStack: (stackId: string) => void
  deleteStack: (stackId: string) => void
  renameStack: (stackId: string, name: string, description?: string) => void
  getAllSavedStacks: () => SavedStack[]
  
  // Export/Import
  exportStack: (stackId?: string) => string
  importStack: (jsonString: string) => SavedStack | null
  
  // Filters
  getSkillsOnly: () => StackItem[]
  getAgentsOnly: () => StackItem[]
  getCommandsOnly: () => StackItem[]
  getSettingsOnly: () => StackItem[]
  getPluginsOnly: () => StackItem[]
  getByType: (type: StackItemType) => StackItem[]
}

function generateId(): string {
  return `stack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const useStackStore = create<StackState>()(
  persist(
    (set, get) => ({
      items: [],
      currentStackId: null,
      savedStacks: [],

      // Current stack management
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

      clearStack: () => set({ items: [], currentStackId: null }),

      isInStack: (itemId) => get().items.some((s) => s.id === itemId),

      // Saved stacks management
      saveStack: (name, description) => {
        const now = new Date().toISOString()
        const currentId = get().currentStackId
        
        // If editing existing stack
        if (currentId) {
          const existingStack = get().savedStacks.find((s) => s.id === currentId)
          if (existingStack) {
            const updatedStack: SavedStack = {
              ...existingStack,
              name,
              description,
              items: get().items,
              updatedAt: now,
            }
            set((state) => ({
              savedStacks: state.savedStacks.map((s) =>
                s.id === currentId ? updatedStack : s
              ),
            }))
            return updatedStack
          }
        }
        
        // Create new stack
        const newStack: SavedStack = {
          id: generateId(),
          name,
          description,
          items: get().items,
          createdAt: now,
          updatedAt: now,
        }
        
        set((state) => ({
          savedStacks: [...state.savedStacks, newStack],
          currentStackId: newStack.id,
        }))
        
        return newStack
      },

      loadStack: (stackId) => {
        const stack = get().savedStacks.find((s) => s.id === stackId)
        if (stack) {
          set({
            items: stack.items,
            currentStackId: stack.id,
          })
        }
      },

      deleteStack: (stackId) =>
        set((state) => ({
          savedStacks: state.savedStacks.filter((s) => s.id !== stackId),
          currentStackId: state.currentStackId === stackId ? null : state.currentStackId,
          items: state.currentStackId === stackId ? [] : state.items,
        })),

      renameStack: (stackId, name, description) =>
        set((state) => ({
          savedStacks: state.savedStacks.map((s) =>
            s.id === stackId
              ? { ...s, name, description, updatedAt: new Date().toISOString() }
              : s
          ),
        })),

      getAllSavedStacks: () => get().savedStacks,

      // Export/Import
      exportStack: (stackId) => {
        const stack = stackId
          ? get().savedStacks.find((s) => s.id === stackId)
          : {
              id: 'current',
              name: 'Current Stack',
              items: get().items,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
        
        if (!stack) {
          throw new Error('Stack not found')
        }
        
        return JSON.stringify(stack, null, 2)
      },

      importStack: (jsonString) => {
        try {
          const stack = JSON.parse(jsonString) as SavedStack
          
          // Validate structure
          if (!stack.items || !Array.isArray(stack.items)) {
            throw new Error('Invalid stack format')
          }
          
          // Generate new ID to avoid conflicts
          const importedStack: SavedStack = {
            ...stack,
            id: generateId(),
            name: `${stack.name} (imported)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          
          set((state) => ({
            savedStacks: [...state.savedStacks, importedStack],
          }))
          
          return importedStack
        } catch (error) {
          console.error('Failed to import stack:', error)
          return null
        }
      },

      // Filters
      getSkillsOnly: () =>
        get().items.filter((item) => item.type === 'skill'),

      getAgentsOnly: () =>
        get().items.filter((item) => item.type === 'agent'),

      getCommandsOnly: () =>
        get().items.filter((item) => item.type === 'command'),

      getSettingsOnly: () =>
        get().items.filter((item) => item.type === 'setting'),

      getPluginsOnly: () =>
        get().items.filter((item) => item.type === 'plugin'),

      getByType: (type) =>
        get().items.filter((item) => item.type === type),
    }),
    {
      name: 'stackshack-stacks',
      version: 4, // v4: Added plugin type support
    }
  )
)
