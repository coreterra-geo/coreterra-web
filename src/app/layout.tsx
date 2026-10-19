import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://coreterra-geo.com'),
  title: 'PT Coreterra Geo Engineering — Konsultan Geoengineering',
  description: 'Konsultansi geoteknik, hidrologi–hidrogeologi, investigasi fondasi, survei geofisika, dan eksplorasi.',
  openGraph: {
    type: 'website', siteName: 'Coreterra', locale: 'id_ID', url: '/',
    title: 'PT Coreterra Geo Engineering — Konsultan Geoengineering', description: 'Konsultansi geoteknik, hidrologi–hidrogeologi, investigasi fondasi, survei geofisika, dan eksplorasi.',
    images: [{ url: '/logo.png', alt: 'Logo Coreterra Geo Engineering' }],
  },
  twitter: { card: 'summary_large_image', title: 'PT Coreterra Geo Engineering — Konsultan Geoengineering', description: 'Konsultansi geoteknik, hidrologi–hidrogeologi, investigasi fondasi, survei geofisika, dan eksplorasi.', images: ['/logo.png'] },
  icons: { icon: '/favicon-32x32.png', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className="bg-[#e9eaea] font-sans antialiased">{children}</body></html>
}
