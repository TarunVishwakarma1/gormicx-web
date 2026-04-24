/** @type {import('nextra-theme-docs').DocsThemeConfig} */
const config = {
  logo: (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ color: '#f59e0b', fontSize: 18, fontWeight: 900, lineHeight: 1 }}>
        ◆
      </span>
      <span style={{ fontWeight: 800, fontSize: 15, color: '#fff', letterSpacing: '-0.3px' }}>
        gormicx
      </span>
    </span>
  ),
  project: {
    link: 'https://github.com/tarunvishwakarma1/gormicx',
  },
  docsRepositoryBase: 'https://github.com/tarunvishwakarma1/gormicx',
  useNextSeoProps() {
    return { titleTemplate: '%s – gormicx' }
  },
  head: (
    <>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta
        name="description"
        content="gormicx — blazingly fast, minimal-footprint ORM for Go"
      />
    </>
  ),
  primaryHue: 38,
  primarySaturation: 96,
  nextThemes: {
    defaultTheme: 'dark',
    forcedTheme: 'dark',
  },
  footer: {
    text: 'MIT License · Tarun Vishwakarma · github.com/tarunvishwakarma1/gormicx',
  },
  editLink: { component: null },
  feedback: { content: null },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: { backToTop: true },
}

export default config
