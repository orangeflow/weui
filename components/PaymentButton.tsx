'use client'

interface PaymentButtonProps {
  onClick: () => void
  disabled?: boolean
  status?: 'pending' | 'success' | 'failed'
}

export default function PaymentButton({ 
  onClick, 
  disabled = false,
  status = 'pending'
}: PaymentButtonProps) {
  const getButtonText = () => {
    if (status === 'success') return '支付成功'
    if (status === 'failed') return '重试支付'
    return '确认支付'
  }

  const getButtonStyles = () => {
    if (status === 'success') {
      return 'bg-green-500 hover:bg-green-600 text-white'
    }
    if (status === 'failed') {
      return 'bg-red-500 hover:bg-red-600 text-white'
    }
    return 'bg-blue-600 hover:bg-blue-700 text-white'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || status === 'success'}
      className={`
        w-full py-4 px-6 rounded-xl font-semibold text-lg
        transition-all duration-200
        ${getButtonStyles()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${!disabled && status !== 'success' ? 'transform hover:scale-105 active:scale-95' : ''}
        shadow-lg
      `}
    >
      {disabled && status === 'pending' ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          处理中...
        </span>
      ) : (
        getButtonText()
      )}
    </button>
  )
}


