import { useEffect, useState } from 'react'

export function useCountUp(target: number, duration = 600): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (target === 0) {
      setValue(0)
      return
    }
    let startTime: number | null = null
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

    let rafId: number
    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(easeOutQuart(progress) * target))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration])

  return value
}
