import React, { useState } from "react";
import { getInitials } from "../../utils/helper";
import { useLocation } from "react-router-dom";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const location = useLocation()
  const pathName = location.pathname
  const isDashboard = pathName.startsWith('/dashboard')
  const [toggle, setToggle] = useState(false);
  return isDashboard && (
    <div className="flex items-center  sm:gap-3">
      <div onMouseEnter={()=>setToggle(true)} onMouseLeave={()=>setToggle(false)} className="relative">
      <div  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-950  font-medium bg-slate-100 cursor-pointer ">
      {getInitials(userInfo?.fullName)}
        <div className={`${toggle ? "w-40 h-20 bg-red-50 absolute  right-[0] top-8 flex flex-col items-center rounded-lg shadow-md  z-50 justify-center gap-1 sm:hidden " : "hidden"}`}>
        <p className=" text-lg font-medium">{userInfo?.fullName}</p>
        <button
          className=" text-md text-slate-700 underline cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
        </div>
      </div>
      </div>
      <div className="">
        <p className="hidden sm:block text-sm font-medium">{userInfo?.fullName}</p>
        <button
          className="hidden sm:block text-sm text-slate-700 underline cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
