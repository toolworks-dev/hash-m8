import { ShieldCheck } from "lucide-react"

export const HeaderGeneration = () => {
  return (
    <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-blue-500" />
        <div>
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">HashM8 Password Generator</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Create secure passwords with ease</p>
        </div>
      </div>
    </div>
  )
}

