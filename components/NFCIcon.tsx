'use client'

interface NFCIconProps {
  size?: number
  className?: string
}

export default function NFCIcon({ size = 48, className = '' }: NFCIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M7 10H17M7 14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  )
}

