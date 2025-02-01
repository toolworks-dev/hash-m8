import { Switch } from "@/components/ui/switch"
import { CaseUpperIcon as UpperCase, CaseLowerIcon as LowerCase, Hash, Asterisk } from "lucide-react"

interface PasswordSettings {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}

interface SettingsProps {
  settings: PasswordSettings
  onSettingsChange: (settings: PasswordSettings) => void
}

export const SettingsGeneration = ({ settings, onSettingsChange }: SettingsProps) => {
  return (
    <div className="space-y-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
      {/* Uppercase Letters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <UpperCase className="w-4 h-4 text-zinc-500" />
          <span className="text-sm text-zinc-500">Uppercase Letters (A-Z)</span>
        </div>
        <Switch
          checked={settings.includeUppercase}
          onCheckedChange={(checked) => onSettingsChange({ ...settings, includeUppercase: checked })}
        />
      </div>

      {/* Lowercase Letters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LowerCase className="w-4 h-4 text-zinc-500" />
          <span className="text-sm text-zinc-500">Lowercase Letters (a-z)</span>
        </div>
        <Switch
          checked={settings.includeLowercase}
          onCheckedChange={(checked) => onSettingsChange({ ...settings, includeLowercase: checked })}
        />
      </div>

      {/* Numbers */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-zinc-500" />
          <span className="text-sm text-zinc-500">Numbers (0-9)</span>
        </div>
        <Switch
          checked={settings.includeNumbers}
          onCheckedChange={(checked) => onSettingsChange({ ...settings, includeNumbers: checked })}
        />
      </div>

      {/* Symbols */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Asterisk className="w-4 h-4 text-zinc-500" />
          <span className="text-sm text-zinc-500">Symbols (!@#$%^&*)</span>
        </div>
        <Switch
          checked={settings.includeSymbols}
          onCheckedChange={(checked) => onSettingsChange({ ...settings, includeSymbols: checked })}
        />
      </div>
    </div>
  )
}

