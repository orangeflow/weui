'use client'

interface NFCIconProps {
  size?: number
  className?: string
}

export default function NFCIcon({ size = 48, className = '' }: NFCIconProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-600"
      >
        {/* NFC Card Outline */}
        <rect x="4" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        
        {/* Signal Waves */}
        <path d="M8 11C8 11 9.5 12.5 12 12.5C14.5 12.5 16 11 16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M8 13C8 13 9.5 14.5 12 14.5C14.5 14.5 16 13 16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        
        {/* NFC Chip */}
        <rect x="10" y="9" width="4" height="3" rx="0.5" fill="currentColor"/>
        
        {/* Connection Lines */}
        <circle cx="12" cy="10.5" r="1" fill="white"/>
      </svg>
    </div>
  )
}

