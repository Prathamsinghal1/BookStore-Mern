import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from './Loading';

export default function Profile() {
  // const isLoggedIn = useSelector();

  const [data,setData] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };


  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information", {headers});
      setData(response.data);
    }
    fetch();
  },[]);

  return (
    
    <div className='bg-zinc-900 px-2 flex flex-col md:flex-row py-8 md:px-12 text-zinc-100'>
      {!data && <Loading/>}
      {data && <><div className='w-full md:w-2/6'>
        <Sidebar data={data}/>
      </div>
      <div className='w-full md:w-5/6 flex justify-center'>
        <Outlet/>
      </div></>}
    </div>
  )
}
