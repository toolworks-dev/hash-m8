"use client"

import { useState, useEffect } from "react"
import { Loader2, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface PreviewProps {
  isLoading: boolean
  password: string
  onRegenerate: () => void
}

export const Preview = ({ isLoading, password, onRegenerate }: PreviewProps) => {
  const availableTexts = ["Generating secure password...", "Applying entropy...", "Finalizing your password..."]
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setProgress(0)
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2 // Increased speed
      })
    }, 10)

    return () => clearInterval(interval)
  }, [isLoading])

  useEffect(() => {
    if (!isLoading) return

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % availableTexts.length)
    }, 800) // Slightly faster text change

    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <div className="rounded-xl mb-4 flex items-center justify-center">
      {isLoading ? (
        <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <div className="relative w-12 h-12">
              <Loader2 className="w-full h-full animate-spin text-blue-500" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-blue-500/10 rounded-full animate-spin-slow" />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{availableTexts[currentTextIndex]}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">This usually takes a few seconds</p>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              className="w-full p-2 text-lg font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-center"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            onClick={onRegenerate}
            className="mt-2 flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            <RefreshCw size={16} />
            Regenerate Password
          </button>
        </div>
      )}
    </div>
  )
}

