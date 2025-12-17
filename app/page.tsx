'use client'

import { useState } from 'react'
import { RedPacketCard, RedPacketList } from '@/components/RedPacket'

export default function Home() {
  const [packetStatus, setPacketStatus] = useState<'unopened' | 'opened' | 'expired'>('unopened')
  const [packetAmount, setPacketAmount] = useState(88.88)

  const handleOpenPacket = () => {
    setPacketStatus('opened')
  }

  // Example red packets data
  const examplePackets = [
    {
      id: '1',
      title: '恭喜發財',
      subtitle: '大吉大利',
      amount: 88.88,
      sender: '張三',
      message: '祝您新年快樂，萬事如意！',
      status: 'unopened' as const
    },
    {
      id: '2',
      title: '新年快樂',
      subtitle: '財源廣進',
      amount: 66.66,
      sender: '李四',
      message: '願您在新的一年裡心想事成！',
      status: 'opened' as const
    },
    {
      id: '3',
      title: '萬事如意',
      subtitle: '身體健康',
      amount: 0,
      sender: '王五',
      message: '祝您身體健康，工作順利！',
      status: 'expired' as const
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        {/* Single Red Packet View */}
        <div className="mb-12">
          <RedPacketCard
            title="恭喜發財"
            subtitle="大吉大利"
            amount={packetAmount}
            sender="發送者"
            message="祝您新年快樂，萬事如意！"
            status={packetStatus}
            onOpen={handleOpenPacket}
          />
        </div>

        {/* Red Packet List View */}
        <div className="mt-16">
          <RedPacketList
            packets={examplePackets}
            onPacketOpen={(id) => {
              console.log('Opening packet:', id)
            }}
          />
        </div>
      </div>
    </main>
  )
}

