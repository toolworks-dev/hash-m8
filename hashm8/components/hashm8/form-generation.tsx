import { Lock, Sparkles } from "lucide-react"
import { SettingsGeneration } from "./settings-generation"
import { Input } from "@/components/ui/input"
import type React from "react" // Added import for React

interface PasswordSettings {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

interface FormProps {
  onSubmit: (e: React.FormEvent) => void
  settings: PasswordSettings
  onSettingsChange: (settings: PasswordSettings) => void
}

export const FormGeneration = ({ onSubmit, settings, onSettingsChange }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 flex-1 p-4 justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-zinc-500" />
          <span className="text-sm text-zinc-500">Password Length</span>
        </div>
        <Input
          type="number"
          min={8}
          max={64}
          value={settings.length}
          onChange={(e) => onSettingsChange({ ...settings, length: Number.parseInt(e.target.value) })}
          className="w-full bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 dark:focus-visible:border-zinc-100"
        />
      </div>

      <SettingsGeneration settings={settings} onSettingsChange={onSettingsChange} />

      <button
        type="submit"
        className="w-full h-9 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-white text-sm font-medium rounded-xl transition-colors self-end"
      >
        <Sparkles className="w-4 h-4" />
        Generate Password
      </button>
    </form>
  )
}

