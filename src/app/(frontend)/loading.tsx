'use client'

import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import { cn } from '@/utilities/ui'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const gardeningTips = [
  'Water your plants in the morning to reduce evaporation.',
  'Use compost to enrich your soil with nutrients.',
  'Prune regularly to encourage healthy growth.',
  'Rotate crops each season to prevent soil depletion.',
  'Attract pollinators by planting flowers like lavender and sunflowers.',
  'Mulch around plants to retain moisture and reduce weeds.',
  'Check leaves for pests regularly to prevent infestations.',
  'Use coffee grounds as a natural fertilizer.',
]

export default function Loading() {
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * gardeningTips.length)) // Randomize initial tip
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setTipIndex((prevIndex) => (prevIndex + 1) % gardeningTips.length)
        setFade(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ResponsiveContainer className="flex flex-col items-center h-screen">
      <div className="mt-24 mb-8 gap-4">
        <Loader2 className="size-14 mr-2 animate-spin" />
      </div>
      <div
        className={cn(
          'text-lg text-center w-3/4 transition-opacity duration-500',
          fade ? 'opacity-100' : 'opacity-0',
        )}
      >
        🌱 {gardeningTips[tipIndex]}
      </div>
    </ResponsiveContainer>
  )
}
