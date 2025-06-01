"use client";
import { usePathname, useRouter } from "next/navigation";
import { ExitIcon, HomeIcon, LogoSvg, ProfileIcon } from "./Icons"


const Sidebar = () => {
   const router = useRouter();
   const pathname = usePathname();
   
   const handleLogout = () => {
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
       localStorage.clear()
       router.push("/login");
   };
   
   const onCilckHome = () => {
      router.push("/")
    };

     const onCilckProfile= () => {
      router.push("/profile")
    };

  return (
    <div className="w-24 h-screen rounded-2xl flex flex-col items-center justify-between p-4 pt-4">
         <LogoSvg className="text-white" />

        <div className="flex flex-col items-center gap-10 mt-10">
         <div onClick={onCilckHome}>
            <HomeIcon className={`w-15 p-3 rounded-xl hover:cursor-pointer hover:bg-[#2c29ff] ${
            pathname === "/" ? "bg-[#4b42ff] text-white" : ""
            }`}/>
         </div>

          <div onClick={onCilckProfile}>
             <ProfileIcon className={`w-15 p-3 rounded-xl hover:cursor-pointer hover:bg-[#2c29ff] ${
            pathname === "/profile" ? "bg-[#4b42ff] text-white" : ""
            }`} />
          </div>
          
         </div>

         <div onClick={handleLogout}>
            <ExitIcon className='w-15 p-3 mb-4 rounded-xl text-white hover:bg-[#4b42ff] hover:cursor-pointer ' /> 
         </div>  
          
    </div>
  )
} 

export default Sidebar