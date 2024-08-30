import {FaUser, FaLock} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Alert from "../components/Alert/Alert";

export default function Login() {

  const username = useRef("");
  const password = useRef("");
  
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(username.current.value === "" || password.current.value === ""){
        const errorMessage = document.getElementById("errorFill");
        errorMessage.style.display="block";
      }
      else{
        const newUser = {
          username : username.current.value,
          password : password.current.value
        };
        const response = await axios.post("http://localhost:1000/api/v1/sign-in",newUser);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));

        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        navigate("/profile");
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setVisible(true);
    }
  };

  return (
    <>
    {visible && <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>}
    <div className='bg-zinc-900 flex items-center justify-center p-8 h-[87vh]'>
      <div className='bg-zinc-800 rounded-[12px] p-6 text-center'>
        <h1 className='text-yellow-100 font-semibold text-2xl '>Login</h1>
        <form id="registrationForm">
          <div className='w-[100%] flex flex-col justify-center items-center'>
            <div className="mx-[20px] mt-8 relative w-[100%]">
              <input
                type="text"
                id="UserName"
                className="w-[90%] inline p-[10px] pr-[35px] border border-[#cccccc] rounded-[30px] box-border font-semibold text-[14px] text-zinc-100 bg-zinc-900"
                ref={username}
                placeholder="Username or Email"
                name="UserName"
                autoComplete="off"
              />
              <FaUser className="absolute right-[8%] top-1/2 transform -translate-y-1/2 text-[#888] text-[1.2rem]"/>
            </div>

            <div className="relative mx-[20px] mt-4 w-[100%]">
              <input
                type="password"
                id="password"
                name="password"
                ref={password}
                className="w-[90%] inline p-[10px] pr-[35px] border border-[#cccccc] rounded-[30px] box-border font-semibold text-[14px] bg-zinc-900 text-zinc-100"
                placeholder="Password"
                autoComplete="off"
              />
              <FaLock className="absolute right-[8%] top-1/2 transform -translate-y-1/2 text-[#888] text-[1.2rem] "/>
            </div>
            </div>
            <div className="ml-4 my-2 text-left text-[10px] items-center flex gap-2">
              <input type="checkbox" className="inline cursor-pointer w-4 h-4 " id="terms"/>
              <label htmlFor="terms" className="inline text-[15px] text-zinc-300">
                Remember Me
              </label>
            </div>

            <div id="errorFill" className=" text-[red] hidden mb-1">
              <p>All fields are required.</p>
            </div>

            <button type="submit" className="hover:bg-[#027bfd] w-[90%] p-[10px] bg-[#68b0fd] border-none rounded-[26px] text-[#fff] text-[16px] cursor-pointer" onClick={handleSubmit}>Login</button>
        </form>
        <h1 className='text-zinc-300 font-semibold m-2'>Or</h1>
        <div className='flex items-center justify-center gap-2'>
          <p className='text-zinc-300 text-sm'>Don't have an account?</p>
          <Link to="/signUp" className='text-blue-300 text-sm underline hover:text-blue-500'>Sign Up</Link>
        </div>
      </div>
    </div>
    </>
  )
}
