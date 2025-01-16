import { React, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Calculator from '../../assets/cal.svg';
import Security from '../../assets/security.svg';

const userDatabase = {
  'user1': '+92 323 6792924',
  'user2': '+91 987 6543210'
};

const LeftPanel2 = ({ username, setStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (username && userDatabase[username]) {
      const phoneNumber = userDatabase[username];
      setPhone(phoneNumber);
      console.log(`Selected user: ${username}, Phone number: ${phoneNumber}`);
      sendOtp(phoneNumber);
    }
  }, [username]);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      'size': 'invisible',
      callback: () => {
        console.log('Recaptcha resolved.');
      }
    });
  };

  const sendOtp = (phoneNumber) => {
    setIsLoading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(`OTP sent to ${phoneNumber}`);
        setIsLoading(false);
      }).catch((error) => {
        console.error(`Failed to send OTP to ${phoneNumber}`, error);
        setIsLoading(false);
      });
  };

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);
    

    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        let user = result.user;
        console.log('OTP verified successfully', user);
       
        navigate('/dashboard');
      }).catch((error) => {
        console.error('Failed to verify OTP', error);
       
      });
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1 className="text-[#1a1f71] text-2xl">Hello {username}</h1>
      <p className="text-sm">
        Not {username}?{' '}
        <button
          onClick={() => setStep(1)}
          className="text-[#db0011] hover:underline"
        >
          Change user
        </button>
      </p>
      <form>
        <div>
          <label className="block text-sm mb-2">6-digit security code</label>
          <input
            type="text"
            maxLength={6}
            className="p-2 mt-2 border border-gray-300 focus:border-[#1a1f71] outline-none"
            value={otp}
            onChange={verifyOtp}
            disabled={isLoading}
            placeholder={isLoading ? "Sending OTP..." : "Enter OTP"}
          />
          {isLoading && (
            <p className="text-sm text-gray-500 mt-2">Please wait while we verify your device...</p>
          )}
          <div className="w-full mt-4">
            <div className="flex justify-start items-start cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}>
              <h2 className="text-xs font-bold">How to generate a security code</h2>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
              >
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className='h-4 w-4' />
                </motion.span>
              </button>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex flex-row gap-4 mt-2 justify-center items-center'
                >
                  <div>
                    <img src={Calculator} alt="12" />
                  </div>
                  <ol className='text-sm text-gray-700 pl-4 space-y-2'>
                    <li type='1'>
                      Press the GREEN button <span><img src={Security} alt="Green button" className='inline-block' /></span> Security step icon in the bottom right corner until the screen turns on
                    </li>
                    <li type='1'>
                      Enter your 4-8 digit PIN and HSBC will appear on your device.
                    </li>
                    <li type='1'>
                      Press the GREEN button <span><img src={Security} alt="" className='inline-block' /></span> Security step icon again to generate a 6 digit security code. Enter the security code as shown on the device.
                    </li>
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-6 flex justify-end mt-64">
          <button
            type="submit"
            onClick={verifyOtp}
            className="bg-[#db0011] text-white px-6 py-2 rounded-sm hover:bg-[#b30d1f] transition-colors"
          >
            Log On
          </button>
        </div>
      </form>
      <div id="recaptcha"></div>
    </div>
  );
};

export default LeftPanel2;
