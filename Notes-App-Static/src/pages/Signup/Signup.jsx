import React, { isValidElement, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { ToastContainer, toast } from 'react-toastify'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstances'

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] =useState(null)
  const navigate = useNavigate()
  const handleSignup = async(e) => {
    e.preventDefault()
    if(!validateEmail(email)){
      setError("Please enter a valid email!")
      toast.error("Please enter a valid email!")
      setEmail("")
      setName("")
      setPassword("")
      return
    }
    if(!name){
      toast.error("Please enter a name!")
      return
    }
    if(!password){
      toast.error("Please enter password!")
      return
    }
    
    setError(null)

    try {
      const res = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password
      })
      if(res.data && res.data.error){
        setError(res.data.message)
        toast.error("Unable to Signup!")
      }

      if(res.data && res.data.accessToken){
        localStorage.setItem("token", res.data.accessToken)
        navigate('/dashboard')
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }
      toast.error("Unable to Singup!")
    }
    
  }
  
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000}  />

      <Navbar />
      <div className="flex items-center justify-center mt-28 ">
        <div className="w-80 sm:w-96 border bg-white rounded  px-7 py-10">
          <form onSubmit={handleSignup}  >
            <h4 className="text-2xl mb-7"> SignUp</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <PasswordInput value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>

            <button type="submit" className='btn-primary'>SignUp</button>
            <p className='text-sm text-center mt-4'>Already have an account? &nbsp; 
              <Link className='font-medium text-[#2b85ff] underline' to='/login'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
