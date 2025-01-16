import { useState, useEffect } from 'react'
import { Eye, EyeOff, RefreshCcw } from 'lucide-react'

export default function WelcomeBanner() {
  const [greeting, setGreeting] = useState('')
  const [lastLogin, setLastLogin] = useState('')
  const [showBalance, setShowBalance] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const balance = '£2,547.83'

  useEffect(() => {
    // Get current time in UK timezone
    const ukTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
    const hour = new Date(ukTime).getHours()

  
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning')
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good evening')
    }

    // Format last login time in UK format
    const lastLoginDate = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
    setLastLogin(lastLoginDate)
  }, [])

  const handleRefresh = async () => {
    console.log('Sending refresh request to admin...')
    setShowPopup(true)
  }

  return (
    <div className="bg-[#171829] text-white p-6 relative rounded-md">
      <div className="flex justify-between items-start max-sm:flex-col gap-3 ">
        <div>
          <h1 className="text-2xl font-light mb-2">{greeting}</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-200">Current Balance:</span>
            <span className="font-medium">
              {showBalance ? balance : '******'}
            </span>
            <RefreshCcw 
              size={18} 
              className="text-gray-300 ml-2 cursor-pointer hover:text-white transition-colors" 
              onClick={handleRefresh}
            />
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-300">
          Last logged in on {lastLogin}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#333] p-6 rounded-lg shadow-lg text-center w-[40%] max-sm:w-full max-sm:mx-4">
            <p className="text-white mb-4">
              The request has been forwarded to your Business Account Director for review and approval. Kindly await further confirmation.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-[#DB104F] text-white rounded-md hover:bg-[#83000A] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

