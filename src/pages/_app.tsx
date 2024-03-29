import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='min-h-screen w-full bg-gray-100 mx-auto lg:container'>
      <Component {...pageProps} />
    </div>
  )
  
}
