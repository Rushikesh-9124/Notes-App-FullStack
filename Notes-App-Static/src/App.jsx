import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import ProtectedRoute from './utils/ProtectedRoute'


const routes = (
  <Router>
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/dashboard' exact element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<Signup/>} />
    </Routes>
  </Router>
)
const App = () => {


  return (
    <div>
      {routes}
    </div>
  )
}

export default App
