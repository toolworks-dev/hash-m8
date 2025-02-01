import { useState, useEffect } from "react"

interface StrengthMeterProps {
  password: string
}

export const StrengthMeter: React.FC<StrengthMeterProps> = ({ password }) => {
  const [strength, setStrength] = useState(0)
  const [label, setLabel] = useState("")

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0
      if (password.length >= 8) score++
      if (password.length >= 12) score++
      if (/[A-Z]/.test(password)) score++
      if (/[a-z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++
      return score
    }

    const newStrength = calculateStrength()
    setStrength(newStrength)

    switch (newStrength) {
      case 0:
      case 1:
        setLabel("Very Weak")
        break
      case 2:
        setLabel("Weak")
        break
      case 3:
      case 4:
        setLabel("Medium")
        break
      case 5:
        setLabel("Strong")
        break
      case 6:
        setLabel("Very Strong")
        break
      default:
        setLabel("")
    }
  }, [password])

  const getColor = () => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-orange-500"
      case 3:
      case 4:
        return "bg-yellow-500"
      case 5:
        return "bg-green-500"
      case 6:
        return "bg-blue-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-zinc-500">Password Strength</span>
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</span>
      </div>
      <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300 ease-in-out`}
          style={{ width: `${(strength / 6) * 100}%` }}
        />
      </div>
    </div>
  )
}

