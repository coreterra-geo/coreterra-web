/* eslint-disable react-refresh/only-export-components -- Next.js route files also export metadata. */
import type { Metadata } from 'next'
import AdminShell from './AdminShell'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Admin Coreterra' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  )
}
