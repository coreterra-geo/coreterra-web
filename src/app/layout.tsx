import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://coreterra-geo.com'),
  title: {
    default: 'Konsultan Geoteknik & Geoengineering di Indonesia',
    template: '%s | Coreterra',
  },
  description: 'PT Coreterra Geo Engineering menyediakan konsultansi geoteknik, investigasi fondasi, hidrologi dan hidrogeologi, survei geofisika, serta eksplorasi untuk pertambangan, infrastruktur, dan energi.',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website', siteName: 'Coreterra', locale: 'id_ID', url: '/',
    title: 'Konsultan Geoteknik & Geoengineering di Indonesia | Coreterra',
    description: 'Konsultansi geoteknik, investigasi fondasi, hidrologi dan hidrogeologi, survei geofisika, serta eksplorasi.',
    images: [{ url: '/hero-drilling-clean.webp', alt: 'Kegiatan pengeboran untuk investigasi geoteknik Coreterra' }],
  },
  twitter: { card: 'summary_large_image', title: 'Konsultan Geoteknik & Geoengineering di Indonesia | Coreterra', description: 'Konsultansi geoteknik, investigasi fondasi, hidrologi dan hidrogeologi, survei geofisika, serta eksplorasi.', images: ['/hero-drilling-clean.webp'] },
  icons: { icon: '/favicon-32x32.png', apple: '/apple-touch-icon.png' },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PT Coreterra Geo Engineering',
  alternateName: 'Coreterra',
  url: 'https://coreterra-geo.com',
  logo: 'https://coreterra-geo.com/logo.png',
  description: 'Konsultansi geoteknik, investigasi fondasi, hidrologi dan hidrogeologi, survei geofisika, serta eksplorasi.',
  email: 'admin.cge@coreterra-geo.com',
  telephone: '+6281214914641',
  areaServed: ['Indonesia', 'Malaysia'],
  knowsAbout: [
    'Geotechnical engineering',
    'Foundation investigation',
    'Mine geotechnics',
    'Hydrology and hydrogeology',
    'Geophysical survey',
    'Geological exploration',
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="m-0 bg-coreterra-paper font-coreterra text-[#f7f7f7] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  )
}
