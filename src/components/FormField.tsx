import { Field, Label } from '@headlessui/react'
import type { ReactNode } from 'react'

export default function FormField({ id, label, children, className = '' }: { id: string; label: string; children: ReactNode; className?: string }) {
  return (
    <Field className={`grid gap-[9px] ${className}`}>
      <Label className="text-[11px] font-bold tracking-[.1em] text-[#434640] uppercase" htmlFor={id}>{label}</Label>
      {children}
    </Field>
  )
}
