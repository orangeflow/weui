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
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">{merchant}</h2>
        <div className="text-3xl font-bold text-gray-800">
          ¥{amount.toFixed(2)}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b">
          <span className="text-gray-600">状态</span>
          <span className={`font-medium ${
            status === 'success' ? 'text-green-600' : 
            status === 'failed' ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {status === 'success' ? '成功' : 
             status === 'failed' ? '失败' : 
             '处理中'}
          </span>
        </div>
      </div>
    </div>
  )
}

