import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstances";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      setEmail("");
      setPassword("");
      setError(null);
      return;
    }
    if(!password){
      setError("Please enter the password!")
      toast.error("Please enter the password!")
      return
    }
    setEmail("");
    setPassword("");
    setError(null);

    try {
      const res = await axiosInstance.post('/login', {
        email: email,
        password: password
      })
      if(res.data && res.data.accessToken){
        localStorage.setItem("token", res.data.accessToken)
        navigate('/dashboard')
        
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError("Invalid Credentials!");
      }
      toast.error("Invalid Credentials!");
    }
  };

  

  return (
    <>
      <ToastContainer progressClassName="custom-toast" position="bottom-right" autoClose={3000}  />

      <Navbar />
      <div className="flex items-center justify-center mt-28 ">
        <div className="w-80 sm:w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7"> Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              value={password}
            />

            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#2b85ff] underline"
              >
                Create an Account!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
