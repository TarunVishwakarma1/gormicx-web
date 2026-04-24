const DBS = [
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'CockroachDB',
  'MariaDB',
  'Cassandra',
  'Snowflake',
]

export default function DatabaseBadges() {
  return (
    <div className="px-6 pb-14 text-center">
      <p className="mb-4 text-[11px] uppercase tracking-[3px]" style={{ color: '#444' }}>
        Supported Databases
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {DBS.map((db) => (
          <span
            key={db}
            className="rounded border bg-[#111] px-3 py-1.5 text-[11px] font-semibold"
            style={{ borderColor: '#222', color: '#888' }}
          >
            {db}
          </span>
        ))}
      </div>
    </div>
  )
}
