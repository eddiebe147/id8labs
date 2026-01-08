/**
 * Formatting utilities
 * Client-safe formatting functions
 */

/**
 * Format model name for display
 */
export function formatModelName(model?: string): string {
  if (!model) return 'Default'
  
  const modelMap: Record<string, string> = {
    'claude-sonnet-4-20250514': 'Claude Sonnet 4',
    'claude-opus-4-20250514': 'Claude Opus 4',
    'claude-3-5-sonnet-20241022': 'Claude 3.5 Sonnet',
    'claude-3-5-haiku-20241022': 'Claude 3.5 Haiku',
  }

  return modelMap[model] || model
}
