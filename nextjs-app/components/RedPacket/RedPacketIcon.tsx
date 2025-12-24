'use client'

interface RedPacketIconProps {
  size?: number
  className?: string
}

export default function RedPacketIcon({ size = 48, className = '' }: RedPacketIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red Packet Envelope */}
      <rect x="4" y="6" width="16" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <path
        d="M4 8C4 7.44772 4.44772 7 5 7H19C19.5523 7 20 7.44772 20 8V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V8Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Decorative Lines */}
      <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="4" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5"/>
      {/* Chinese Character 福 (Fortune) */}
      <text
        x="12"
        y="16"
        fontSize="8"
        fill="currentColor"
        textAnchor="middle"
        fontWeight="bold"
      >
        福
      </text>
    </svg>
  )
}

