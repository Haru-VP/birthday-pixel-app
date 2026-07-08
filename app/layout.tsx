import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Pixelify_Sans, Press_Start_2P } from 'next/font/google'
import './globals.css'

const pixelSans = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-pixel',
  weight: ['400', '500', '600', '700'],
})

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-pixel-title',
  weight: '400',
})

export const metadata: Metadata = {
  title: '¡Feliz cumpleaños 22 Santi!',
  description: 'Una sorpresa de cumpleaños en pixel art hecha con mucho cariño.',
  generator: 'v0.app',
  icons: {
    icon: '/iconopastelblanco.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#8a3a63',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${pixelSans.variable} ${pressStart.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
