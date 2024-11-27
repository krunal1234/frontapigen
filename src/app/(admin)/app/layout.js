"use client"
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isShowError, setIsShowError] = useState(false);

  const checkViewport = () => {
    const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
    setIsSidebarOpen(!isMobileOrTablet); // Sidebar is closed on mobile and tablet by default
  };

  const getProfileData = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/socialapi/whatsapp');
    const fbProfile = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + '/fb/getProfile/',
    {
      params : {
        phoneid : response.data.data[0].phone_id,
        accessToken : response.data.data[0].access_token
      }
    });
    if(fbProfile.data.response === "0"){
      setShowError(fbProfile.data.data);
      setIsShowError(true);
    }
  }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarHide = () => {
    setIsSidebarOpen(false);
  };

  const handleShowError = () => {
    setIsShowError(true);
  }

  useEffect(() => {
    checkViewport(); // Initial check

    window.addEventListener('resize', checkViewport); // Update on resize

    return () => {
      window.removeEventListener('resize', checkViewport); // Cleanup
    };
  }, []);

  
  return (
    <div className="h-screen">
      <div className={`fixed bg-white inset-y-0 left-0 z-20 transition-transform duration-300 shadow-xl ease-in-out ${isSidebarOpen ? 'translate-x-0 opacity-100 visible' : '-translate-x-full opacity-0 invisible'}`}>
        <Sidebar/>
      </div>
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 flex flex-col`}>
        <TopBar onSidebarToggle={handleSidebarToggle} isShowError={isShowError} setIsShowError={setIsShowError} getProfileData={getProfileData}/>
        <div className='min-h-screen bg-gray-100'>
        {children}
        </div>
        <Footer/>
      </div>
    </div>
  );
}
