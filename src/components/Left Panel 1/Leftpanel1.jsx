import React from 'react'

const Leftpanel1 = ({ username, setUsername, rememberMe, setRememberMe, handleContinue }) => {
  return (
    <div className='md:ml-6'>
      <h1 className="text-[#333333] text-2xl mb-4 relative tracking-wider">Log on to Business Internet Banking</h1>
      <p className="text-sm mb-6">
          First time here?{'  '}
          <a href="https://online-banking.business.hsbc.co.uk/portalserver/hsbc/user-activation-home" className="hover:text-[#db0011] underline tracking-wide">
              {'  '}Activate your account
          </a>
      </p>

      <form onSubmit={handleContinue}>
          <div className="mb-6">
              <label className="block text-sm mb-2">Username</label>
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className=" p-2 border border-gray-300 focus:border-[#1a1f71] outline-none"
              />
          </div>

          <div className="mb-6">
              <label className="block text-sm mb-2">Password</label>
              <input
                  type="password"
                  className="p-2 border border-gray-300 focus:border-[#1a1f71] outline-none"
              />
          </div>

          <div className="mb-6">
              <label className="flex items-center space-x-2">
                  <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="border-gray-300 rounded-sm"
                  />
                  <span className="text-sm">Remember me</span>
              </label>
          </div>

          <div className="border-t-[0.1rem] border-[#333] pt-6  flex justify-end mt-52">
              <button
                  type="submit"
                  className="bg-[#db0011] text-white px-6 py-2 rounded-sm hover:bg-[#b30d1f] transition-colors"
              >
                  Continue
              </button>
          </div>
      </form>
    </div>
  )
}

export default Leftpanel1
