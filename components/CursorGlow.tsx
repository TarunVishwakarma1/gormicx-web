import { useEffect, useRef } from 'react'

const SIZE = 14 // orb diameter in px

export default function CursorGlow() {
  const elRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const scale = useRef(1)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const LERP = 0.12
    if (!elRef.current) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    // Event delegation — catches all a/button including dynamically added ones
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        scale.current = 0.4
        if (elRef.current) elRef.current.style.background = '#f59e0b'
      }
    }
    const onOut = (e: MouseEvent) => {
      const from = (e.target as Element).closest('a, button')
      if (!from) return
      const to = e.relatedTarget ? (e.relatedTarget as Element).closest('a, button') : null
      if (to === from) return // still within the same interactive element
      scale.current = 1
      if (elRef.current) elRef.current.style.background = 'rgba(245,158,11,0.25)'
    }

    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * LERP
      current.current.y += (mouse.current.y - current.current.y) * LERP
      if (elRef.current) {
        elRef.current.style.transform =
          `translate(${current.current.x - SIZE / 2}px, ${current.current.y - SIZE / 2}px) scale(${scale.current})`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        background: 'rgba(245,158,11,0.25)',
        border: '1px solid rgba(245,158,11,0.6)',
        boxShadow: '0 0 12px rgba(245,158,11,0.3)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        transition: 'background 0.15s',
      }}
    />
  )
}
