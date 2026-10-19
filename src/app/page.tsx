/* eslint-disable react-refresh/only-export-components -- Next.js route files also export metadata. */
import type { Metadata } from 'next'
import HomeInteractive from '@/components/HomeInteractive'

export const metadata: Metadata = {
  title: 'Konsultan Geoteknik & Geoengineering di Indonesia',
  description: 'Konsultansi geoteknik, investigasi fondasi, hidrologi dan hidrogeologi, survei geofisika, serta eksplorasi untuk pertambangan, infrastruktur, dan energi.',
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeInteractive />
}
