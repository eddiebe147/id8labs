'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseVoiceInputOptions {
  /** Callback when transcript is received */
  onTranscript?: (text: string, isFinal: boolean) => void
  /** Callback when speech ends */
  onSpeechEnd?: () => void
  /** Callback on error */
  onError?: (error: string) => void
  /** Auto-stop after silence (ms). 0 = disabled */
  autoStopOnSilence?: number
  /** Language for recognition */
  language?: string
  /** Continuous mode - keep listening */
  continuous?: boolean
}

interface UseVoiceInputReturn {
  /** Is currently listening */
  isListening: boolean
  /** Is speech recognition supported */
  isSupported: boolean
  /** Current interim transcript (not finalized) */
  interimTranscript: string
  /** Final transcript from last utterance */
  finalTranscript: string
  /** Error message if any */
  error: string | null
  /** Start listening */
  startListening: () => void
  /** Stop listening */
  stopListening: () => void
  /** Toggle listening state */
  toggleListening: () => void
  /** Clear all transcripts */
  clearTranscripts: () => void
}

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  readonly length: number
  item(index: number): SpeechRecognitionAlternative
  readonly isFinal: boolean
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  readonly transcript: string
  readonly confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null
  onend: ((this: SpeechRecognition, ev: Event) => void) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null
  onspeechend: ((this: SpeechRecognition, ev: Event) => void) | null
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

/**
 * useVoiceInput - Hook for browser-based speech recognition
 *
 * Uses the Web Speech API (SpeechRecognition) for real-time speech-to-text.
 * Provides interim and final transcripts, with auto-stop on silence.
 */
export function useVoiceInput(options: UseVoiceInputOptions = {}): UseVoiceInputReturn {
  const {
    onTranscript,
    onSpeechEnd,
    onError,
    autoStopOnSilence = 3000,
    language = 'en-US',
    continuous = false,
  } = options

  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState('')
  const [finalTranscript, setFinalTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMountedRef = useRef(true)

  // Check for support on mount
  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    setIsSupported(!!SpeechRecognitionAPI)

    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Clear silence timer
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current)
      silenceTimerRef.current = null
    }
  }, [])

  // Reset silence timer
  const resetSilenceTimer = useCallback(() => {
    clearSilenceTimer()

    if (autoStopOnSilence > 0 && isListening) {
      silenceTimerRef.current = setTimeout(() => {
        if (isMountedRef.current && recognitionRef.current) {
          recognitionRef.current.stop()
        }
      }, autoStopOnSilence)
    }
  }, [autoStopOnSilence, clearSilenceTimer, isListening])

  // Start listening
  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser.')
      onError?.('Speech recognition is not supported in this browser.')
      return
    }

    // Clean up existing recognition
    if (recognitionRef.current) {
      recognitionRef.current.abort()
      recognitionRef.current = null
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognitionAPI) return

    const recognition = new SpeechRecognitionAPI()

    recognition.continuous = continuous
    recognition.interimResults = true
    recognition.lang = language

    recognition.onstart = () => {
      if (isMountedRef.current) {
        setIsListening(true)
        setError(null)
        resetSilenceTimer()
      }
    }

    recognition.onend = () => {
      if (isMountedRef.current) {
        setIsListening(false)
        clearSilenceTimer()
        onSpeechEnd?.()
      }
    }

    recognition.onerror = (event) => {
      if (isMountedRef.current) {
        // Ignore 'aborted' errors (from manual stop)
        if (event.error === 'aborted') return

        const errorMessage = getErrorMessage(event.error)
        setError(errorMessage)
        setIsListening(false)
        clearSilenceTimer()
        onError?.(errorMessage)
      }
    }

    recognition.onresult = (event) => {
      if (!isMountedRef.current) return

      resetSilenceTimer()

      let interim = ''
      let final = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcript = result[0].transcript

        if (result.isFinal) {
          final += transcript
          onTranscript?.(transcript, true)
        } else {
          interim += transcript
          onTranscript?.(transcript, false)
        }
      }

      if (interim) {
        setInterimTranscript(interim)
      }

      if (final) {
        setFinalTranscript((prev) => prev + final)
        setInterimTranscript('')
      }
    }

    recognitionRef.current = recognition

    try {
      recognition.start()
    } catch (err) {
      console.error('Failed to start speech recognition:', err)
      setError('Failed to start speech recognition. Please try again.')
      onError?.('Failed to start speech recognition. Please try again.')
    }
  }, [
    isSupported,
    continuous,
    language,
    onTranscript,
    onSpeechEnd,
    onError,
    resetSilenceTimer,
    clearSilenceTimer,
  ])

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    clearSilenceTimer()
  }, [clearSilenceTimer])

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  // Clear transcripts
  const clearTranscripts = useCallback(() => {
    setInterimTranscript('')
    setFinalTranscript('')
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      clearSilenceTimer()
    }
  }, [clearSilenceTimer])

  return {
    isListening,
    isSupported,
    interimTranscript,
    finalTranscript,
    error,
    startListening,
    stopListening,
    toggleListening,
    clearTranscripts,
  }
}

// Helper to convert error codes to user-friendly messages
function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'no-speech':
      return 'No speech detected. Please try again.'
    case 'audio-capture':
      return 'No microphone detected. Please check your audio settings.'
    case 'not-allowed':
      return 'Microphone access denied. Please allow microphone access.'
    case 'network':
      return 'Network error. Please check your connection.'
    case 'service-not-allowed':
      return 'Speech recognition service not available.'
    default:
      return `Speech recognition error: ${errorCode}`
  }
}

export default useVoiceInput
