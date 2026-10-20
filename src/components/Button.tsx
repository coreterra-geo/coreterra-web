import { Button as HeadlessButton } from '@headlessui/react'
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'icon'
}

const variants = {
  primary: 'inline-flex min-h-[54px] items-center justify-between bg-[#8b623d] px-5 text-left text-[12px] font-bold tracking-[.12em] text-white uppercase transition-colors hover:bg-[#684628] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#684628] disabled:cursor-not-allowed disabled:opacity-40',
  icon: 'grid size-11 cursor-pointer place-items-center border border-[#8f8a81] bg-transparent text-[23px] text-[#272927] transition-[background,color,transform] duration-[.25s] hover:-translate-y-0.5 hover:bg-[#343935] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#684628] disabled:cursor-not-allowed disabled:opacity-[.38]',
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <HeadlessButton className={`${variants[variant]} ${className}`} {...props} />
}
