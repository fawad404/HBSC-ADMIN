import { CheckSquare, Zap , CircleDollarSign, ArrowUpCircle, Monitor, CreditCard, Users2, UserRoundCheck } from 'lucide-react'
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import { File } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [showPopup, setShowPopup] = useState(false);

  // const UserInfo = () => {
  //   return (
  //     <div className="flex flex-col items-start justify-center space-y-1 text-sm">
  //       <p>Dashboard</p>

  //     </div>
  //   )
  // }
  const menuItems = [
    { icon: UserRoundCheck, text: 'Dashboard' , href: '/dashboard' },
    { icon : File , text: 'Manage Users' , href:'/dashboard/manage-users'},
    { icon: CircleDollarSign, text: 'Delete Transections', href: '/dashboard/delete-transections' },
    { icon: CheckSquare, text: 'Invest Bill pay', href: '/invest-bill-pay' },
    { icon: ArrowUpCircle, text: 'Pay and Transfer', href: '/pay-and-transfer' },
    { icon: Monitor, text: 'Open fixed Deposit', href: '/open-fixed-deposit' },
    { icon: Zap, text: 'Mutual Funds', href: '/mutual-funds' },
    { icon: CreditCard, text: 'Statements and certificates', href: '/statements-certificates' },
    { icon: Users2, text: 'Nomination', href: '/nomination' }
  ]

  const handleLinkClick = (e, href) => {
    if (href === '/dashboard' || href === '/dashboard/manage-users' || href === '/dashboard/delete-transections') {
      setActiveTab(href);
    } else {
      e.preventDefault();
      setShowPopup(true);
    }
  };

  return (
    <div className={`${isOpen ? 'fixed inset-0' : 'hidden'} w-[75%] md:w-[40%] lg:block lg:w-72 bg-[#171829] text-white border-r border-[#ffffff12] z-50`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-32 px-6 border-b border-gray-200">
          <Link to='/'>
          <img 
            src={logo} 
            alt="Favicon" 
            className="h-44 w-44"
          />
         </Link>
          <button onClick={() => setIsOpen(false)} className="ml-4 flex items-center p-2 rounded-md bg-[#4a5055] border border-[#ffffff1a]  backdrop-filter backdrop-blur-sm lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid status_toggle middle sidebar-toggle text-white hover:text-[#5c61f2] transition-colors duration-300"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <li key={index} className='group'>
                <Link 
                  to={item.href} 
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="flex items-center space-x-2 rounded p-2"
                >
                <div className={`${activeTab === item.href ? 'bg-[#db0011] group-hover:bg-[#af000d] shadow-[1.5px_0.33px_16px_0px_rgba(192,192,192,0.3)]' : ''} transition-all duration-200 p-2 rounded-md `}>
                  <item.icon size={20} />
                </div>
                  <span className='group-hover:text-[#db0011] transition-colors duration-300'>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#333] p-6 rounded-lg shadow-lg text-center w-[40%] max-sm:w-full max-sm:mx-4">
            <p className="text-white mb-4">
            Access request has been sent to your Business Account Director. Please wait for approval. 
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-[#db0011] text-white rounded-md hover:bg-[#83000A] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

