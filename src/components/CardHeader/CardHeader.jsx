import { User2 } from 'lucide-react'

export default function CardHeader({ toggleSidebar, cardDetails }) {
  return (
    <header className="bg-white shadow-md  h-28 lg:h-36 flex items-center">
      <div className="flex w-full px-6 justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={toggleSidebar} className="flex items-center p-2 rounded-md bg-[#db0011] hover:bg-[#af000d] lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid status_toggle middle sidebar-toggle text-white"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </button>
          <div className='flex flex-col text-xl max-lg:hidden space-y-1'>
            <div className='flex flex-col space-y-2'>
            
              {cardDetails ? (
                <>
                  <p className="text-sm text-gray-700">Name: {cardDetails.name}</p>
                  <p className="text-sm text-gray-700">Billing Address: {cardDetails.billingAddress}</p>
                  <p className="text-sm text-gray-700">Card Number: {cardDetails.number}</p>
                  <div className='flex flex-row space-x-5'>
                    <p className="text-sm text-gray-700">CVV: {cardDetails.cvv}</p>
                    <p className="text-sm text-gray-700">Expiry: {cardDetails.expiry}</p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-700">No card details available</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <button className="flex text-gray-500 focus:outline-none">
              <User2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

