'use client'

import { ReactNode } from 'react'

interface RedPacketButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

export default function RedPacketButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary'
}: RedPacketButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 rounded-full font-bold text-lg
        transition-all duration-300 transform
        ${variant === 'primary' 
          ? 'bg-yellow-400 text-red-600 hover:bg-yellow-300 hover:scale-105 active:scale-95' 
          : 'bg-white text-red-600 hover:bg-gray-100 hover:scale-105 active:scale-95'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed hover:scale-100' 
          : 'shadow-lg hover:shadow-xl'
        }
      `}
    >
      {children}
    </button>
  )
}

