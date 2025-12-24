'use client'

interface PaymentCardProps {
  amount?: number
  merchant?: string
  status?: 'pending' | 'success' | 'failed'
}

export default function PaymentCard({ 
  amount = 0, 
  merchant = '商户名称',
  status = 'pending' 
}: PaymentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm mx-auto border border-gray-100">
      {/* Merchant Info */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{merchant}</h2>
        <p className="text-sm text-gray-500">订单编号: {Date.now().toString().slice(-8)}</p>
      </div>

      {/* Amount */}
      <div className="text-center mb-8 pb-8 border-b border-gray-200">
        <p className="text-sm text-gray-500 mb-2">支付金额</p>
        <div className="text-4xl font-bold text-gray-800">
          ¥{amount.toFixed(2)}
        </div>
      </div>
      
      {/* Payment Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600 text-sm">支付方式</span>
          <span className="font-medium text-gray-800 text-sm">NFC 支付</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600 text-sm">状态</span>
          <span className={`font-medium text-sm ${
            status === 'success' ? 'text-green-600' : 
            status === 'failed' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {status === 'success' ? '✓ 成功' : 
             status === 'failed' ? '✗ 失败' : 
             '⏳ 处理中'}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600 text-sm">时间</span>
          <span className="font-medium text-gray-800 text-sm">
            {new Date().toLocaleTimeString('zh-CN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

