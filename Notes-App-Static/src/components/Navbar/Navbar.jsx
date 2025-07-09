import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useLocation, useNavigate } from 'react-router-dom'
import Searchbar from '../SearchBar/Searchbar'
import { toast } from 'react-toastify'

const Navbar = ({userInfo, onSearchNote}) => {

  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.removeItem("token")
    navigate('/login')
    toast.success("Logged out successfully");
  }
  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  }
  const onClearSearch = () => {
    setSearchQuery("")
  }


  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className="text-xl font-medium text-black py-2 ">Notes</h2>
      {
        isDashboard &&
        <Searchbar
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      }
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar
