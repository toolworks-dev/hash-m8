import { Lock, Sparkles } from "lucide-react"
import { SettingsGeneration } from "./settings-generation"
import { Slider } from "@/components/ui/slider"
import type React from "react"

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
    <form onSubmit={onSubmit} className="flex flex-col gap-4 flex-1 p-4 justify-between">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Password Length</span>
            </div>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{settings.length}</span>
          </div>
          <Slider
            value={[settings.length]}
            onValueChange={([value]) => onSettingsChange({ ...settings, length: value })}
            min={8}
            max={64}
            step={1}
            className="w-full"
          />
        </div>

        <SettingsGeneration settings={settings} onSettingsChange={onSettingsChange} />
      </div>

      <button
        type="submit"
        className="w-full h-10 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors self-end"
      >
        <Sparkles className="w-4 h-4" />
        Generate Secure Password
      </button>
    </form>
  )
}

