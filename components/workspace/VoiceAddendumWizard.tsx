'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  MicOff,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  AlertCircle,
  Send,
  FileText,
  Calendar,
  DollarSign,
  Search,
  Landmark,
  TrendingDown,
  TrendingUp,
  Wrench,
  Wallet,
  CheckCircle,
  PlusCircle,
  Receipt,
  Shield,
  Package,
  FileEdit,
} from 'lucide-react'
import { VoiceWaveform } from './VoiceWaveform'
import { useVoiceInput } from '@/hooks/useVoiceInput'
import { useAddendumWizard } from '@/lib/stores/agent-store'
import type { AddendumType, AddendumTypeInfo, AddendumField } from '@/lib/types/workspace'
import { ADDENDUM_TYPES, getAddendumTypeInfo, getCommonAddendumTypes } from '@/lib/types/workspace'

interface VoiceAddendumWizardProps {
  onComplete?: (addendumData: Record<string, unknown>) => void
  onCancel?: () => void
  className?: string
}

// Icon mapping for addendum types
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Search,
  Landmark,
  TrendingDown,
  TrendingUp,
  Wrench,
  DollarSign,
  Wallet,
  CheckCircle,
  PlusCircle,
  Receipt,
  Shield,
  Package,
  FileEdit,
}

// Step definitions
const STEPS = [
  { id: 'type_selection', label: 'Select Type', icon: FileText },
  { id: 'details', label: 'Add Details', icon: FileEdit },
  { id: 'review', label: 'Review', icon: Search },
  { id: 'confirm', label: 'Confirm', icon: Send },
] as const

type StepId = typeof STEPS[number]['id']

/**
 * VoiceAddendumWizard - Multi-step voice-enabled addendum creation
 *
 * Steps:
 * 1. Type Selection - Choose addendum type via voice or click
 * 2. Details - Capture field values via voice or text
 * 3. Review - Preview generated addendum
 * 4. Confirm - Send for signatures via DocuSign
 */
export function VoiceAddendumWizard({
  onComplete,
  onCancel,
  className = '',
}: VoiceAddendumWizardProps) {
  const {
    wizard,
    setStep,
    setType,
    setDetails,
    updateDetail,
    setContent,
    setProcessing,
    setError,
  } = useAddendumWizard()

  const [showAllTypes, setShowAllTypes] = useState(false)
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0)

  // Get current addendum type info
  const currentTypeInfo = useMemo(() => {
    return wizard.selectedType ? getAddendumTypeInfo(wizard.selectedType) : null
  }, [wizard.selectedType])

  // Get required fields for current type
  const requiredFields = useMemo(() => {
    return currentTypeInfo?.requiredFields || []
  }, [currentTypeInfo])

  // Current field being filled
  const currentField = requiredFields[currentFieldIndex]

  // Generate mock addendum content
  const generateMockContent = useCallback((): string => {
    if (!currentTypeInfo) return ''

    const details = wizard.details
    let content = `ADDENDUM TO PURCHASE AGREEMENT\n\n`
    content += `Type: ${currentTypeInfo.label}\n\n`
    content += `This addendum modifies the Purchase Agreement as follows:\n\n`

    for (const field of requiredFields) {
      const value = details[field.key]
      if (value !== undefined) {
        content += `${field.label}: ${value}\n`
      }
    }

    content += `\nAll other terms and conditions of the original Purchase Agreement remain in full force and effect.`

    return content
  }, [currentTypeInfo, wizard.details, requiredFields])

  // Generate addendum content (mock - would call AI in real implementation)
  const generateAddendumContent = useCallback(async () => {
    setProcessing(true)

    try {
      // Simulate AI generation delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate mock content based on type and details
      const content = generateMockContent()
      setContent(content)
      setStep('review')
    } catch {
      setError('Failed to generate addendum content. Please try again.')
    } finally {
      setProcessing(false)
    }
  }, [generateMockContent, setContent, setStep, setProcessing, setError])

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    setProcessing(true)

    try {
      // Simulate DocuSign submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onComplete?.({
        type: wizard.selectedType,
        details: wizard.details,
        content: wizard.generatedContent,
      })
    } catch {
      setError('Failed to submit addendum. Please try again.')
    } finally {
      setProcessing(false)
    }
  }, [onComplete, wizard.selectedType, wizard.details, wizard.generatedContent, setProcessing, setError])

  // Ref to store the voice handler (avoids circular dependency)
  const voiceHandlerRef = useRef<(text: string) => void>(() => {})

  // Voice input setup
  const {
    isListening,
    isSupported,
    interimTranscript,
    error: voiceError,
    startListening,
    stopListening,
    clearTranscripts,
  } = useVoiceInput({
    onTranscript: (text, isFinal) => {
      if (isFinal && text.trim()) {
        voiceHandlerRef.current(text.trim())
      }
    },
    autoStopOnSilence: 3000,
  })

  // Handle voice input based on current step
  const handleVoiceInput = useCallback((text: string) => {
    switch (wizard.step) {
      case 'type_selection':
        // Try to match addendum type from voice
        const matchedType = matchAddendumType(text)
        if (matchedType) {
          setType(matchedType)
          setStep('details')
          setCurrentFieldIndex(0)
        }
        break

      case 'details':
        if (currentField) {
          // Parse the value based on field type
          const parsedValue = parseFieldValue(text, currentField.type)
          updateDetail(currentField.key, parsedValue)

          // Move to next field or review step
          if (currentFieldIndex < requiredFields.length - 1) {
            setCurrentFieldIndex((prev) => prev + 1)
          } else {
            // All fields filled, generate content and move to review
            generateAddendumContent()
          }
        }
        break

      case 'review':
        // "confirm" or "approve" moves to confirm step
        if (text.toLowerCase().includes('confirm') || text.toLowerCase().includes('approve')) {
          setStep('confirm')
        } else if (text.toLowerCase().includes('back') || text.toLowerCase().includes('edit')) {
          setStep('details')
        }
        break

      case 'confirm':
        // "send" or "submit" completes the wizard
        if (text.toLowerCase().includes('send') || text.toLowerCase().includes('submit')) {
          handleSubmit()
        }
        break
    }

    clearTranscripts()
  }, [wizard.step, currentField, currentFieldIndex, requiredFields.length, setType, setStep, updateDetail, clearTranscripts, generateAddendumContent, handleSubmit])

  // Keep ref in sync with the callback
  useEffect(() => {
    voiceHandlerRef.current = handleVoiceInput
  }, [handleVoiceInput])

  // Match voice input to addendum type
  const matchAddendumType = (text: string): AddendumType | null => {
    const lower = text.toLowerCase()

    // Check for exact or close matches
    for (const typeInfo of ADDENDUM_TYPES) {
      const typeLower = typeInfo.label.toLowerCase()
      const typeWords = typeLower.split(' ')

      // Check if input contains type name or key words
      if (lower.includes(typeLower) || typeWords.every((w) => lower.includes(w))) {
        return typeInfo.type
      }

      // Check for common variations
      if (typeInfo.type === 'closing_extension' && (lower.includes('closing') || lower.includes('extend closing'))) {
        return typeInfo.type
      }
      if (typeInfo.type === 'inspection_extension' && lower.includes('inspection')) {
        return typeInfo.type
      }
      if (typeInfo.type === 'financing_extension' && lower.includes('financing')) {
        return typeInfo.type
      }
      if (typeInfo.type === 'price_reduction' && (lower.includes('reduce') || lower.includes('lower price'))) {
        return typeInfo.type
      }
      if (typeInfo.type === 'repair_request' && lower.includes('repair')) {
        return typeInfo.type
      }
      if (typeInfo.type === 'repair_credit' && lower.includes('credit')) {
        return typeInfo.type
      }
    }

    return null
  }

  // Parse field value based on type
  const parseFieldValue = (text: string, fieldType: string): string | number => {
    switch (fieldType) {
      case 'currency':
        // Extract numbers and parse as currency
        const numMatch = text.match(/[\d,]+(?:\.\d{2})?/)
        if (numMatch) {
          return parseFloat(numMatch[0].replace(/,/g, ''))
        }
        return text

      case 'date':
        // Try to parse natural date expressions
        // For now, just return the text - real implementation would use date parsing
        return text

      case 'number':
        const num = parseFloat(text.replace(/[^\d.-]/g, ''))
        return isNaN(num) ? text : num

      default:
        return text
    }
  }

  // Handle back navigation
  const handleBack = () => {
    switch (wizard.step) {
      case 'details':
        if (currentFieldIndex > 0) {
          setCurrentFieldIndex((prev) => prev - 1)
        } else {
          setType(null)
          setStep('type_selection')
        }
        break
      case 'review':
        setStep('details')
        break
      case 'confirm':
        setStep('review')
        break
    }
  }

  // Handle text input change for current field
  const handleTextInputChange = (value: string) => {
    if (currentField) {
      updateDetail(currentField.key, value)
    }
  }

  // Handle next button in details step
  const handleNextField = () => {
    if (currentFieldIndex < requiredFields.length - 1) {
      setCurrentFieldIndex((prev) => prev + 1)
    } else {
      generateAddendumContent()
    }
  }

  // Get current step index for progress
  const currentStepIndex = STEPS.findIndex((s) => s.id === wizard.step)

  // Commonly used types for quick access
  const commonTypes = useMemo(() => getCommonAddendumTypes(), [])
  const allTypes = ADDENDUM_TYPES

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Progress indicator */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
        {STEPS.map((step, index) => {
          const isActive = index === currentStepIndex
          const isCompleted = index < currentStepIndex
          const StepIcon = step.icon

          return (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  isActive
                    ? 'bg-[var(--accent)] text-white'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <StepIcon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
                }`}
              >
                {step.label}
              </span>
              {index < STEPS.length - 1 && (
                <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
              )}
            </div>
          )
        })}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Type Selection */}
          {wizard.step === 'type_selection' && (
            <motion.div
              key="type_selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  What type of addendum?
                </h3>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">
                  Say the type or click to select
                </p>
              </div>

              {/* Voice input indicator */}
              <div className="flex flex-col items-center mb-6">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={!isSupported}
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                    isListening
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                  } ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isListening ? (
                    <VoiceWaveform isActive size="md" color="white" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                </button>
                {isListening && (
                  <p className="text-sm text-[var(--accent)] mt-2 animate-pulse">
                    Listening...
                  </p>
                )}
                {interimTranscript && (
                  <p className="text-sm text-[var(--text-secondary)] mt-2 italic">
                    "{interimTranscript}"
                  </p>
                )}
              </div>

              {/* Quick access types */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase">
                  Common Addendums
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {commonTypes.map((typeInfo) => {
                    const Icon = ICON_MAP[typeInfo.icon] || FileText
                    return (
                      <button
                        key={typeInfo.type}
                        onClick={() => {
                          setType(typeInfo.type)
                          setStep('details')
                          setCurrentFieldIndex(0)
                        }}
                        className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-left"
                      >
                        <Icon className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {typeInfo.label}
                          </p>
                          <p className="text-xs text-[var(--text-tertiary)] line-clamp-1">
                            {typeInfo.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Show all types */}
              {!showAllTypes ? (
                <button
                  onClick={() => setShowAllTypes(true)}
                  className="w-full text-center text-sm text-[var(--accent)] hover:underline py-2"
                >
                  Show all {allTypes.length} addendum types
                </button>
              ) : (
                <div className="space-y-2 mt-4">
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase">
                    All Types
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {allTypes
                      .filter((t) => !t.commonlyUsed)
                      .map((typeInfo) => {
                        const Icon = ICON_MAP[typeInfo.icon] || FileText
                        return (
                          <button
                            key={typeInfo.type}
                            onClick={() => {
                              setType(typeInfo.type)
                              setStep('details')
                              setCurrentFieldIndex(0)
                            }}
                            className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-left"
                          >
                            <Icon className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-[var(--text-primary)]">
                                {typeInfo.label}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Details */}
          {wizard.step === 'details' && currentField && (
            <motion.div
              key={`details-${currentFieldIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {currentField.voicePrompt}
                </h3>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">
                  Field {currentFieldIndex + 1} of {requiredFields.length}
                </p>
              </div>

              {/* Voice input */}
              <div className="flex flex-col items-center">
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={!isSupported}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
                    isListening
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                  }`}
                >
                  {isListening ? (
                    <VoiceWaveform isActive size="lg" color="white" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </button>
                {isListening && (
                  <p className="text-sm text-[var(--accent)] mt-3 animate-pulse">
                    Listening...
                  </p>
                )}
                {interimTranscript && (
                  <p className="text-sm text-[var(--text-secondary)] mt-2 italic">
                    "{interimTranscript}"
                  </p>
                )}
              </div>

              {/* Text fallback */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-secondary)]">
                  {currentField.label}
                  {currentField.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type={currentField.type === 'date' ? 'date' : currentField.type === 'currency' ? 'number' : 'text'}
                  placeholder={currentField.placeholder}
                  value={(wizard.details[currentField.key] as string) || ''}
                  onChange={(e) => handleTextInputChange(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 text-[var(--text-primary)]"
                />
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNextField}
                  disabled={currentField.required && !wizard.details[currentField.key]}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentFieldIndex < requiredFields.length - 1 ? 'Next' : 'Review'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {wizard.step === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Review Your Addendum
                </h3>
                <p className="text-sm text-[var(--text-tertiary)] mt-1">
                  Confirm the details before sending
                </p>
              </div>

              {/* Type badge */}
              {currentTypeInfo && (
                <div className="flex items-center gap-2 p-3 bg-[var(--bg-secondary)] rounded-lg">
                  <FileText className="w-5 h-5 text-[var(--accent)]" />
                  <span className="font-medium text-[var(--text-primary)]">
                    {currentTypeInfo.label}
                  </span>
                </div>
              )}

              {/* Details summary */}
              <div className="space-y-2">
                {requiredFields.map((field) => {
                  const value = wizard.details[field.key]
                  if (!value) return null

                  return (
                    <div
                      key={field.key}
                      className="flex justify-between items-center py-2 border-b border-[var(--border)]"
                    >
                      <span className="text-sm text-[var(--text-tertiary)]">
                        {field.label}
                      </span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {field.type === 'currency' && typeof value === 'number'
                          ? `$${value.toLocaleString()}`
                          : String(value)}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Generated content preview */}
              {wizard.generatedContent && (
                <div className="mt-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase mb-2">
                    Preview
                  </p>
                  <pre className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap font-sans">
                    {wizard.generatedContent}
                  </pre>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleBack}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
                >
                  Confirm
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirm & Send */}
          {wizard.step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Ready to Send
                </h3>
                <p className="text-sm text-[var(--text-tertiary)] mt-2 max-w-sm mx-auto">
                  This addendum will be sent to all parties via DocuSign for signature.
                </p>
              </div>

              {/* Voice confirmation */}
              <div className="flex flex-col items-center">
                <p className="text-sm text-[var(--text-tertiary)] mb-3">
                  Say "Send" to confirm, or click the button below
                </p>
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={!isSupported}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isListening
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  disabled={wizard.isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={wizard.isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  {wizard.isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send for Signatures
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error display */}
      {(wizard.error || voiceError) && (
        <div className="mx-4 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{wizard.error || voiceError}</p>
        </div>
      )}

      {/* Processing overlay */}
      {wizard.isProcessing && wizard.step === 'details' && (
        <div className="absolute inset-0 bg-[var(--bg-primary)]/80 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)] mx-auto mb-2" />
            <p className="text-sm text-[var(--text-secondary)]">Generating addendum...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceAddendumWizard
