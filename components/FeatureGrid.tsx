const FEATURES = [
  {
    icon: '⚡',
    title: 'Unified API',
    desc: 'Single interface for SQL and NoSQL. No context switching.',
  },
  {
    icon: '🔒',
    title: 'Goroutine-Safe',
    desc: 'Engine and query builder safe for concurrent use out of the box.',
  },
  {
    icon: '🔌',
    title: 'Pluggable Drivers',
    desc: 'Blank-import a driver. It self-registers. Zero boilerplate.',
  },
  {
    icon: '🔗',
    title: 'Fluent Query Builder',
    desc: 'Immutable chain. No hidden mutation. Safe to share across goroutines.',
  },
  {
    icon: '🪝',
    title: 'Lifecycle Hooks',
    desc: 'BeforeCreate, AfterUpdate, and more — engine or model level.',
  },
  {
    icon: '💾',
    title: 'Schema Caching',
    desc: 'Structs parsed once via reflection. Cached in sync.Map.',
  },
]

export default function FeatureGrid() {
  return (
    <div className="px-6 pb-16">
      <p className="mb-7 text-center text-[11px] uppercase tracking-[3px]" style={{ color: '#444' }}>
        Why gormicx
      </p>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-md border bg-[#0f0f0f] p-5"
            style={{
              borderColor: '#1a1a1a',
              borderTopWidth: 2,
              borderTopColor: '#f59e0b',
            }}
          >
            <div className="mb-2.5 text-xl" aria-hidden="true">{f.icon}</div>
            <h3 className="mb-1.5 text-[13px] font-bold text-white">{f.title}</h3>
            <p className="text-[11px] leading-relaxed" style={{ color: '#555' }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
