'use client'

import RedPacketCard from './RedPacketCard'

interface RedPacket {
  id: string
  title: string
  subtitle: string
  amount: number
  sender: string
  message: string
  status: 'unopened' | 'opened' | 'expired'
}

interface RedPacketListProps {
  packets: RedPacket[]
  onPacketOpen?: (id: string) => void
}

export default function RedPacketList({ packets, onPacketOpen }: RedPacketListProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        我的紅包
      </h1>
      <div className="space-y-6">
        {packets.map((packet) => (
          <RedPacketCard
            key={packet.id}
            title={packet.title}
            subtitle={packet.subtitle}
            amount={packet.amount}
            sender={packet.sender}
            message={packet.message}
            status={packet.status}
            onOpen={() => onPacketOpen?.(packet.id)}
          />
        ))}
      </div>
    </div>
  )
}

