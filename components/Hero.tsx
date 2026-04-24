import { useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [copied, setCopied] = useState(false)

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText('go get github.com/tarunvishwakarma1/gormicx')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 text-center">
      {/* Amber radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3"
        style={{
          width: 700,
          height: 350,
          background:
            'radial-gradient(ellipse, rgba(245,158,11,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Badge */}
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
        style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        <span className="text-[11px] font-semibold tracking-widest text-amber-500">
          OPEN SOURCE · MIT LICENSE
        </span>
      </div>

      {/* Headline */}
      <h1 className="mb-4 text-5xl font-black leading-[1.05] tracking-[-2px] text-white md:text-6xl">
        One ORM.<br />Every Database.
      </h1>

      {/* Sub-headlines */}
      <p className="mb-2 text-lg font-semibold text-amber-500">
        SQL and NoSQL, unified.
      </p>
      <p className="mb-9 text-sm" style={{ color: '#555' }}>
        Blazingly fast. Minimal footprint.
      </p>

      {/* CTAs */}
      <div className="mb-10 flex justify-center gap-3">
        <Link
          href="/docs/getting-started"
          className="rounded-md bg-amber-500 px-7 py-3 text-[13px] font-extrabold tracking-wide text-black transition hover:bg-amber-400"
        >
          Documentation →
        </Link>
        <a
          href="https://github.com/tarunvishwakarma1/gormicx"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border px-7 py-3 text-[13px] transition hover:text-white"
          style={{ borderColor: '#2a2a2a', color: '#aaa' }}
        >
          View on GitHub ↗
        </a>
      </div>

      {/* Install command */}
      <div
        className="inline-flex items-center gap-3 rounded-md border bg-[#111] px-5 py-3 font-mono text-[12px]"
        style={{ borderColor: '#222', borderLeftColor: '#f59e0b', borderLeftWidth: 3 }}
      >
        <span style={{ color: '#555' }}>$</span>
        <span className="text-amber-500">go get</span>
        <span style={{ color: '#e2e8f0' }}>github.com/tarunvishwakarma1/gormicx</span>
        <button
          onClick={copyInstall}
          title="Copy"
          aria-label="Copy install command"
          style={{ color: copied ? '#f59e0b' : '#444' }}
          className="ml-1 transition"
        >
          {copied ? '✓' : '⎘'}
        </button>
      </div>
    </section>
  )
}
