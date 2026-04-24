import type { AppProps } from 'next/app'
import '../styles/globals.css'
import CursorGlow from '../components/CursorGlow'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CursorGlow />
      <Component {...pageProps} />
    </>
  )
}
