type Token = { c: string; t: string }
type Line  = Token[]

// Color legend:
// #555    — comment
// #7dd3fc — identifier/variable
// #f59e0b — package name (gormicx, clause)
// #86efac — function/method name
// #a78bfa — string literal
// #fb923c — numeric literal
// #fff    — punctuation / whitespace

const lines: Line[] = [
  [
    { c: '#555', t: '// Open a connection' },
  ],
  [
    { c: '#7dd3fc', t: 'db' },
    { c: '#fff', t: ', ' },
    { c: '#7dd3fc', t: 'err' },
    { c: '#fff', t: ' := ' },
    { c: '#f59e0b', t: 'gormicx' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'Open' },
    { c: '#fff', t: '(' },
    { c: '#a78bfa', t: '"postgres"' },
    { c: '#fff', t: ', dsn,' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#f59e0b', t: 'gormicx' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'WithMaxOpenConns' },
    { c: '#fff', t: '(' },
    { c: '#fb923c', t: '25' },
    { c: '#fff', t: '),' },
  ],
  [{ c: '#fff', t: ')' }],
  [{ c: '#fff', t: '' }],
  [{ c: '#555', t: '// Fluent query builder' }],
  [
    { c: '#7dd3fc', t: 'err' },
    { c: '#fff', t: ' = ' },
    { c: '#7dd3fc', t: 'db' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'Find' },
    { c: '#fff', t: '(ctx, &' },
    { c: '#7dd3fc', t: 'User' },
    { c: '#fff', t: '{}).' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#86efac', t: 'Where' },
    { c: '#fff', t: '(' },
    { c: '#f59e0b', t: 'clause' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'Gt' },
    { c: '#fff', t: '(' },
    { c: '#a78bfa', t: '"age"' },
    { c: '#fff', t: ', ' },
    { c: '#fb923c', t: '18' },
    { c: '#fff', t: ')).' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#86efac', t: 'OrderBy' },
    { c: '#fff', t: '(' },
    { c: '#f59e0b', t: 'clause' },
    { c: '#fff', t: '.' },
    { c: '#86efac', t: 'AscCol' },
    { c: '#fff', t: '(' },
    { c: '#a78bfa', t: '"name"' },
    { c: '#fff', t: ')).' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#86efac', t: 'Limit' },
    { c: '#fff', t: '(' },
    { c: '#fb923c', t: '20' },
    { c: '#fff', t: ').' },
  ],
  [
    { c: '#fff', t: '    ' },
    { c: '#86efac', t: 'Find' },
    { c: '#fff', t: '(&' },
    { c: '#7dd3fc', t: 'users' },
    { c: '#fff', t: ')' },
  ],
]

export default function CodePreview() {
  return (
    <div className="px-6 pb-16">
      <p className="mb-7 text-center text-[11px] uppercase tracking-[3px]" style={{ color: '#444' }}>
        Looks Like This
      </p>
      <div
        className="mx-auto max-w-2xl overflow-hidden rounded-lg border"
        style={{ borderColor: '#1e1e1e' }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 border-b px-4 py-2.5"
          style={{ background: '#111', borderColor: '#1e1e1e' }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff5f57' }} aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ffbd2e' }} aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#28c840' }} aria-hidden="true" />
          <span className="ml-2 text-[11px]" style={{ color: '#444' }}>main.go</span>
        </div>
        {/* Code */}
        <pre
          className="overflow-x-auto p-5 font-mono text-[11px] leading-[1.85]"
          style={{ background: '#0f0f0f' }}
        >
          <code>
            {lines.map((tokens, i) => (
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
  )
}
