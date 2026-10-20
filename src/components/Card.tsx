import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLElement>

export default function Card({ className = '', ...props }: CardProps) {
  return <article className={`overflow-hidden border border-[#b8b2a8] bg-[#f5f2eb] ${className}`} {...props} />
}
