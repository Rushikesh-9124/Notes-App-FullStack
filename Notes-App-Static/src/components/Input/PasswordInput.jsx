import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setIsShowPassword(prev => !prev)
    }
  return (
    <div className=' flex items-center bg-transparent rounded border-[1.5px] px-5 mb-3'>
      <input className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'  type={isShowPassword ? "text" : "password"} placeholder={placeholder || "Password"} onChange={onChange} value={value} />
      <span
      className='text-[#2b85ff]  cursor-pointer ' 
      onClick={toggleShowPassword}
      >
        {
            isShowPassword ? 
            <FaRegEyeSlash size={22}  /> : 
            <FaRegEye size={22}  />
        }
      </span>
      
    </div>
  )
}

export default PasswordInput
