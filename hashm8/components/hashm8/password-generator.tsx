"use client"

import { useState, useCallback } from "react"
import { Preview } from "./preview-generation"
import { ErrorGeneration } from "./error-generation"
import { FormGeneration } from "./form-generation"
import { HeaderGeneration } from "./header-generation"
import { StrengthMeter } from "./strength-meter"
import { toast } from "@/components/ui/use-toast"

interface PasswordSettings {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

export default function HashM8PasswordGenerator() {
  const [showForm, setShowForm] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState<string>("")
  const [settings, setSettings] = useState<PasswordSettings>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  })

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setShowForm(false)
      setIsLoading(true)
      setError(null)

      try {
        await new Promise((resolve) => setTimeout(resolve, 800)) // Reduced simulation time
        const password = generatePassword(settings)
        setGeneratedPassword(password)
        setShowForm(false)
      } catch (err) {
        setError("Failed to generate password. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    [settings],
  )

  const handleBackToSettings = useCallback(() => {
    setShowForm(true)
    setError(null)
    setGeneratedPassword("")
  }, [])

  const handleCopyPassword = useCallback(() => {
    navigator.clipboard.writeText(generatedPassword)
    toast({
      title: "Password copied!",
      description: "Your generated password has been copied to the clipboard.",
    })
  }, [generatedPassword])

  const handleRegeneratePassword = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      const newPassword = generatePassword(settings)
      setGeneratedPassword(newPassword)
      setIsLoading(false)
    }, 500)
  }, [settings])

  return (
    <div className="group relative overflow-hidden w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] min-h-[500px] flex flex-col justify-between gap-2">
      <HeaderGeneration />
      <div className="flex-1 overflow-hidden flex flex-col">
        {error && <ErrorGeneration error={error} />}

        {showForm ? (
          <FormGeneration onSubmit={handleSubmit} settings={settings} onSettingsChange={setSettings} />
        ) : (
          <div className="p-4 space-y-4">
            <Preview isLoading={isLoading} password={generatedPassword} onRegenerate={handleRegeneratePassword} />

            {!isLoading && (
              <>
                <StrengthMeter password={generatedPassword} />

                <div className="p-3 space-y-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Length</span>
                    <span className="text-zinc-900 dark:text-zinc-100">{settings.length} characters</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Character Types</span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {[
                        settings.includeUppercase && "A-Z",
                        settings.includeLowercase && "a-z",
                        settings.includeNumbers && "0-9",
                        settings.includeSymbols && "#$&",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleBackToSettings}
                    className="w-full h-9 flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-medium rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Back to Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="w-full h-9 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Copy Password
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function generatePassword(settings: PasswordSettings): string {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
  const numberChars = "0123456789"
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  let chars = ""
  if (settings.includeUppercase) chars += uppercaseChars
  if (settings.includeLowercase) chars += lowercaseChars
  if (settings.includeNumbers) chars += numberChars
  if (settings.includeSymbols) chars += symbolChars

  let password = ""
  const charArray = new Uint32Array(settings.length)
  crypto.getRandomValues(charArray)

  for (let i = 0; i < settings.length; i++) {
    password += chars.charAt(charArray[i] % chars.length)
  }

  return password
}

