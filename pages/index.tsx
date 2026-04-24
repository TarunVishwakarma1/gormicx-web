import Head from 'next/head'
import Link from 'next/link'
import FilmGrain from '../components/FilmGrain'
import { useCountUp } from '../hooks/useCountUp'

const CODE_LINES: Array<Array<{ c: string; t: string }>> = [
  [{ c: '#555', t: '// Open a connection' }],
  [
    { c: '#7dd3fc', t: 'db' }, { c: '#fff', t: ', ' }, { c: '#7dd3fc', t: 'err' },
    { c: '#fff', t: ' := ' }, { c: '#f59e0b', t: 'gormicx' }, { c: '#fff', t: '.' },
    { c: '#86efac', t: 'Open' }, { c: '#fff', t: '(' }, { c: '#a78bfa', t: '"postgres"' },
    { c: '#fff', t: ', dsn,' },
  ],
  [
    { c: '#fff', t: '    ' }, { c: '#f59e0b', t: 'gormicx' }, { c: '#fff', t: '.' },
    { c: '#86efac', t: 'WithMaxOpenConns' }, { c: '#fff', t: '(' },
    { c: '#fb923c', t: '25' }, { c: '#fff', t: '),' },
  ],
  [{ c: '#fff', t: ')' }],
  [{ c: '#fff', t: '' }],
  [{ c: '#555', t: '// Fluent query builder' }],
  [
    { c: '#7dd3fc', t: 'err' }, { c: '#fff', t: ' = ' }, { c: '#7dd3fc', t: 'db' },
    { c: '#fff', t: '.' }, { c: '#86efac', t: 'Find' }, { c: '#fff', t: '(ctx, &' },
    { c: '#7dd3fc', t: 'User' }, { c: '#fff', t: '{}).' },
  ],
  [
    { c: '#fff', t: '    ' }, { c: '#86efac', t: 'Where' }, { c: '#fff', t: '(' },
    { c: '#f59e0b', t: 'clause' }, { c: '#fff', t: '.' }, { c: '#86efac', t: 'Gt' },
    { c: '#fff', t: '(' }, { c: '#a78bfa', t: '"age"' }, { c: '#fff', t: ', ' },
    { c: '#fb923c', t: '18' }, { c: '#fff', t: ')).' },
  ],
  [
    { c: '#fff', t: '    ' }, { c: '#86efac', t: 'OrderBy' }, { c: '#fff', t: '(' },
    { c: '#f59e0b', t: 'clause' }, { c: '#fff', t: '.' }, { c: '#86efac', t: 'AscCol' },
    { c: '#fff', t: '(' }, { c: '#a78bfa', t: '"name"' }, { c: '#fff', t: ')).' },
  ],
  [
    { c: '#fff', t: '    ' }, { c: '#86efac', t: 'Limit' }, { c: '#fff', t: '(' },
    { c: '#fb923c', t: '20' }, { c: '#fff', t: ').' },
  ],
  [
    { c: '#fff', t: '    ' }, { c: '#86efac', t: 'Find' }, { c: '#fff', t: '(&' },
    { c: '#7dd3fc', t: 'users' }, { c: '#fff', t: ')' },
  ],
]

const HEADLINE_WORDS = ['One ORM.', 'Every', 'Database.']
const DB_NAMES = ['PostgreSQL', 'MySQL', 'MongoDB', 'CockroachDB', 'Cassandra', 'Snowflake']

export default function Home() {
  const db7 = useCountUp(7)
  const db0 = useCountUp(0)

  return (
    <>
      <Head>
        <title>gormicx — One ORM. Every Database.</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta
          name="description"
          content="gormicx is a blazingly fast, minimal-footprint ORM for Go supporting SQL and NoSQL through a unified pluggable driver interface."
        />
      </Head>

      <FilmGrain />

      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

        {/* ── Nav ── */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 40px', borderBottom: '1px solid #111',
          position: 'sticky', top: 0, zIndex: 50, background: '#0a0a0a',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ width: 7, height: 7, background: '#f59e0b', transform: 'rotate(45deg)', borderRadius: 1, display: 'inline-block' }} />
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: -0.4 }}>gormicx</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <Link href="/docs/getting-started" style={{ color: '#444', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none' }}>Docs</Link>
            <Link href="/docs/drivers" style={{ color: '#444', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none' }}>Drivers</Link>
            <a href="https://github.com/tarunvishwakarma1/gormicx" target="_blank" rel="noopener noreferrer"
              style={{ color: '#444', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none' }}>GitHub ↗</a>
          </div>
        </nav>

        {/* ── Hero split ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.1fr 0.9fr',
          minHeight: 'calc(100vh - 50px - 37px)',
        }}>

          {/* Left column */}
          <div style={{
            padding: '48px 40px', borderRight: '1px solid #111',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden',
          }}>

            {/* Ambient glow */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: '35%', left: '-10%',
              width: 500, height: 320,
              background: 'radial-gradient(ellipse, rgba(245,158,11,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'glowPulse 4s ease-in-out infinite',
              willChange: 'opacity',
            }} />

            {/* Top label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
              <div style={{ width: 16, height: 1, background: '#f59e0b', flexShrink: 0 }} />
              <span style={{ color: '#f59e0b', fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase' }}>
                Open Source · MIT License
              </span>
            </div>

            {/* Headline with word reveal */}
            <div style={{ padding: '20px 0', position: 'relative' }}>
              {HEADLINE_WORDS.map((word, i) => (
                <div key={word} style={{ overflow: 'hidden', lineHeight: 1 }}>
                  <div style={{
                    color: i === 2 ? '#f59e0b' : '#fff',
                    fontSize: 58,
                    fontWeight: 900,
                    letterSpacing: -3.5,
                    lineHeight: 0.92,
                    animation: `wordReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.18}s both`,
                  }}>
                    {word}
                  </div>
                </div>
              ))}
              <div style={{ width: 40, height: 2, background: '#f59e0b', margin: '20px 0' }} />
              <p style={{ color: '#555', fontSize: 12, lineHeight: 1.8, maxWidth: 280, margin: 0 }}>
                SQL and NoSQL through a single, pluggable<br />
                driver interface. Goroutine-safe. Minimal footprint.
              </p>
            </div>

            {/* CTAs + install */}
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                <Link href="/docs/getting-started" style={{
                  background: '#f59e0b', color: '#000', padding: '10px 22px',
                  fontSize: 11, fontWeight: 800, letterSpacing: 0.5,
                  borderRadius: 3, textDecoration: 'none',
                }}>
                  Documentation →
                </Link>
                <a href="https://github.com/tarunvishwakarma1/gormicx" target="_blank" rel="noopener noreferrer"
                  style={{
                    border: '1px solid #222', color: '#888', padding: '10px 22px',
                    fontSize: 11, borderRadius: 3, textDecoration: 'none',
                  }}>
                  View on GitHub ↗
                </a>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#0f0f0f', border: '1px solid #1a1a1a',
                borderLeft: '2px solid #f59e0b', padding: '10px 14px', borderRadius: 3,
              }}>
                <span style={{ color: '#555', fontSize: 10, fontFamily: 'monospace' }}>$</span>
                <span style={{ color: '#f59e0b', fontSize: 10, fontFamily: 'monospace' }}>go get</span>
                <span style={{ color: '#ccc', fontSize: 10, fontFamily: 'monospace' }}>github.com/tarunvishwakarma1/gormicx</span>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 28 }}>

            {/* Stat grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {/* Row 1 */}
              <div style={{ borderTop: '1px solid #f59e0b', padding: '16px 16px 16px 0', borderRight: '1px solid #111' }}>
                <div style={{ color: '#fff', fontSize: 30, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>{db7}</div>
                <div style={{ color: '#444', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 4 }}>Databases</div>
              </div>
              <div style={{ borderTop: '1px solid #222', padding: '16px 0 16px 16px' }}>
                <div style={{ color: '#fff', fontSize: 30, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>{db0}</div>
                <div style={{ color: '#444', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 4 }}>Boilerplate</div>
              </div>
              {/* Row 2 */}
              <div style={{ borderTop: '1px solid #1a1a1a', padding: '16px 16px 0 0', borderRight: '1px solid #111' }}>
                <div style={{
                  color: '#f59e0b', fontSize: 30, fontWeight: 900, letterSpacing: -1, lineHeight: 1,
                  animation: 'fadeIn 0.4s ease forwards 300ms', opacity: 0,
                }}>∞</div>
                <div style={{ color: '#444', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 4 }}>Goroutines</div>
              </div>
              <div style={{ borderTop: '1px solid #1a1a1a', padding: '16px 0 0 16px' }}>
                <div style={{
                  color: '#fff', fontSize: 30, fontWeight: 900, letterSpacing: -1, lineHeight: 1,
                  animation: 'fadeIn 0.4s ease forwards 300ms', opacity: 0,
                }}>MIT</div>
                <div style={{ color: '#444', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', marginTop: 4 }}>License</div>
              </div>
            </div>

            {/* Code block */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: 6, overflow: 'hidden', flex: 1 }}>
              <div style={{ background: '#111', borderBottom: '1px solid #1a1a1a', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
                <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
                <span style={{ color: '#444', fontSize: 9, marginLeft: 6, fontFamily: 'monospace' }}>main.go</span>
              </div>
              <pre style={{ padding: 16, fontFamily: 'monospace', fontSize: 9.5, lineHeight: 1.85, background: '#0f0f0f', margin: 0, overflowX: 'auto' }}>
                <code>
                  {CODE_LINES.map((tokens, i) => (
                    <div key={i}>
                      {tokens.map((tok, j) => (
                        <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* ── Bottom editorial strip ── */}
        <div style={{ borderTop: '1px solid #111', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {DB_NAMES.map(db => (
              <span key={db} style={{ color: '#222', fontSize: 8, letterSpacing: 2, textTransform: 'uppercase' }}>{db}</span>
            ))}
          </div>
          <span style={{ color: '#222', fontSize: 8, letterSpacing: 1 }}>github.com/tarunvishwakarma1/gormicx</span>
        </div>
      </div>
    </>
  )
}
