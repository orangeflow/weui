'use client'

import { useState } from 'react'
import NFCIcon from './NFCIcon'
import PaymentCard from './PaymentCard'
import PaymentButton from './PaymentButton'

export default function PaymentInterface() {
  const [amount, setAmount] = useState(0)
  const [merchant, setMerchant] = useState('商户名称')
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    setStatus('pending')
    
    // Simulate payment processing
    setTimeout(() => {
      setStatus('success')
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">NFC 支付</h1>
          <p className="text-gray-600">请将设备靠近 NFC 读卡器</p>
        </div>

        {/* NFC Icon Animation */}
        <div className="flex justify-center mb-8">
          <div className={`relative ${isProcessing ? 'animate-pulse' : ''}`}>
            <NFCIcon size={80} className="text-blue-600" />
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Card */}
        <PaymentCard 
          amount={amount || 100.00}
          merchant={merchant}
          status={status}
        />

        {/* Payment Button */}
        <div className="mt-6">
          <PaymentButton 
            onClick={handlePayment}
            disabled={isProcessing}
            status={status}
          />
        </div>

        {/* Status Message */}
        {status === 'success' && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold">支付成功！</p>
          </div>
        )}
        {status === 'failed' && (
          <div className="mt-4 text-center">
            <p className="text-red-600 font-semibold">支付失败，请重试</p>
          </div>
        )}
      </div>
    </div>
  )
}


