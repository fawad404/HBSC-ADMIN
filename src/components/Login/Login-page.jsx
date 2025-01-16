import React, { useState, useEffect } from 'react';
import login from '../../assets/login.jpg';
import Footer from '../Footer/Footer';
import Otpwarn from '../Otp/Otp-warn';
import Leftpanel1 from '../Left Panel 1/Leftpanel1';
import Leftpanel2 from '../Left Panel 2/leftpanel2';
import Rightpanel1 from '../Right panel 1/rightpanel1';
import Rightpanel2 from '../Right Panel 2/Rightpanel2';
import Fscs from '../FSCS/Fscs';
import Header from '../Header/Header';
import Sorry from '../Sorry/Sorry';

export default function LoginPage() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleContinue = (e) => {
        e.preventDefault();
        if (username) {
            setStep(2);
            setUsername(username); // Update the parent state
        }
    };

    if (loading) {
        return (
            <div className="bg-[#f3f3f3] h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="loader border-t-4 border-black rounded-full w-12 h-12 animate-spin"></div>
                        <p className="text-gray-700 mt-4">Loading</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#3e505d] h-screen overflow-y-auto">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="relative min-h-[calc(100vh-80px)]">
                {/* Background img */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={login}
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Login Container */}
                <div className="relative z-10 px-4 pt-8">
                    <div className='flex justify-center flex-col items-center gap-3'>
                        <div className="w-full max-w-[1050px] grid grid-cols-1 md:grid-cols-[2.7fr_1.6fr] mt-10">
                            {/* Left Panel */}
                            <div className="bg-white p-8 flex flex-col justify-between">
                                {step === 1 ? (
                                    <>
                                     <Leftpanel1 
                                        username={username}
                                        setUsername={setUsername}
                                        rememberMe={rememberMe}
                                        setRememberMe={setRememberMe}
                                        handleContinue={handleContinue}
                                     />
                                    </>
                                ) : (
                                    <>
                                       <Leftpanel2 username={username} setStep={setStep} />
                                    </>
                                )}
                            </div>
                            {/* Right Panel */}
                            <div className="bg-[#f3f3f3] p-8 rounded-sm">
                                <h2 className="text-[#333333] text-xl mb-6">Help and support</h2>
                                {step === 1 ? (
                                    <>
                                       <Rightpanel1 />
                                    </>
                                ) : (
                                    <>
                                        <Rightpanel2 />
                                    </>
                                )}

                                {/* FSCS Information */}
                                <Fscs />
                            </div>
                        </div>
                        {/* OTP Warning */}
                        <div className='flex justify-center  max-w-[1050px] w-full  rounded-sm'>
                            {step === 1 && (
                             <div className='flex justify-center flex-col bg-gray-50/15  max-w-[1050px] w-full  rounded-sm mb-8 space-y-[1px]'>
                             <Sorry />
                             <Otpwarn />
                             </div>
                            )}
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

