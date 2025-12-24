'use client'

import { useState } from 'react'
import RedPacketIcon from './RedPacketIcon'
import RedPacketButton from './RedPacketButton'

interface RedPacketCardProps {
  title?: string
  subtitle?: string
  amount?: number
  sender?: string
  message?: string
  status?: 'unopened' | 'opened' | 'expired'
  onOpen?: () => void
}

export default function RedPacketCard({
  title = '恭喜發財',
  subtitle = '大吉大利',
  amount = 0,
  sender = '發送者',
  message = '祝您新年快樂！',
  status = 'unopened',
  onOpen
}: RedPacketCardProps) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    if (status === 'unopened' && !isOpening) {
      setIsOpening(true)
      setTimeout(() => {
        setIsOpening(false)
        onOpen?.()
      }, 1000)
    }
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className={`
        relative overflow-hidden rounded-2xl shadow-2xl
        ${status === 'unopened' ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-red-400 to-red-500'}
        ${isOpening ? 'animate-pulse' : ''}
      `}>
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-yellow-300 rounded-full"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-2 border-yellow-300 rounded-full"></div>
          <div className="absolute bottom-6 left-8 w-10 h-10 border-2 border-yellow-300 rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-14 h-14 border-2 border-yellow-300 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative p-8 text-center text-white">
          {status === 'unopened' ? (
            <>
              <div className="mb-6">
                <RedPacketIcon size={80} className="mx-auto text-yellow-300" />
              </div>
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-xl mb-6 opacity-90">{subtitle}</p>
              <div className="mb-6">
                <p className="text-sm opacity-80 mb-1">來自</p>
                <p className="text-lg font-semibold">{sender}</p>
              </div>
              <RedPacketButton onClick={handleOpen} disabled={isOpening}>
                {isOpening ? '開啟中...' : '開紅包'}
              </RedPacketButton>
            </>
          ) : status === 'opened' ? (
            <>
              <div className="mb-6">
                <RedPacketIcon size={80} className="mx-auto text-yellow-300" />
              </div>
              <div className="mb-4">
                <p className="text-sm opacity-80 mb-2">恭喜您獲得</p>
                <div className="text-5xl font-bold text-yellow-300 mb-2">
                  ¥{amount.toFixed(2)}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm opacity-80 mb-1">來自</p>
                <p className="text-lg font-semibold mb-2">{sender}</p>
                <p className="text-sm opacity-90">{message}</p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <RedPacketIcon size={80} className="mx-auto text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold mb-2">紅包已過期</h2>
              <p className="text-sm opacity-80">此紅包已無法領取</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

