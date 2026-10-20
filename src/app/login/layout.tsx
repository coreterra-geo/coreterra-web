/* eslint-disable react-refresh/only-export-components -- Next.js route files also export metadata. */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Masuk',
  description: 'Masuk ke Coreterra.',
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
