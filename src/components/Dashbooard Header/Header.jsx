import { User2 } from 'lucide-react'

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white shadow-md  h-20 lg:h-32 flex items-center">
      <div className="flex w-full px-6 justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={toggleSidebar} className="flex items-center p-2 rounded-md bg-[#db0011] hover:bg-[#af000d] lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid status_toggle middle sidebar-toggle text-white"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </button>
          <div className='flex flex-col text-xl max-lg:hidden space-y-1'>
       
            {/* <ul className='text-gray-800 leading-tight font-normal font-mono'>
                <li>AHMAD ASRAR</li>
                <li>S10 cranley parade, SE94dz</li>
                <li>NI number# TH542549T</li>
            </ul> */}
        <div className='flex flex-col space-y-2'>
          <h1 className="text-2xl lg:text-3xl font-normal text-gray-900">Corporate Banking Portal</h1>
          <p className="text-sm lg:text-base text-gray-600">SMART ENERGY EFFICIENT SOLUTIONS LTD</p>
          <p className="text-sm lg:text-base text-gray-600">Private limited Company - 14826884</p>
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

