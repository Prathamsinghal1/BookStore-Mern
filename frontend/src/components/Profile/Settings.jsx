import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../pages/Loading';
import Alert from '../Alert/Alert';

export default function Settings() {
  const [value, setValue] = useState({ address : "" });
  const [data, setData] = useState();
  
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information",{headers});
      setData(response.data);
      setValue({address:response.data.address});
    }
    fetch();
  },[])

  const handleOnChange = (event) => {
    setValue({ address : event.target.value });
  } 
  const handleOnClick = async() => {
    const response = await axios.put("http://localhost:1000/api/v1/update-address",value,{headers});
    setMessage(response.data.message);
    setVisible(true);
  }

  return (
    <>
      {visible && <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>}
      {!data && <Loading/>}
      {data && <div className='h-[100%] w-[90%] m-auto md:mt-2 mt-10 p-0 md:p-4 text-zinc-100'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center'>Settings</h1>
        <div className='md:flex gap-12'>
          <div className='my-5'>
            <label htmlFor="">Username</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{data.username}</p>
          </div>
          <div className='my-5'>
            <label htmlFor="">Email</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{data.email}</p>
          </div>
        </div>
        <div className='mt-4 flex flex-col'>
          <label htmlFor="">Address</label>
          <textarea className='p-2 rounded bg-zinc-800 mt-2 font-semibold' rows="5" placeholder='Address' name="address" value={value.address} onChange={handleOnChange}/>
        </div>
        <div className='mt-4 flex justify-end'>
          <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300' onClick={handleOnClick}>Update</button>
        </div>
      </div>}
    </>
  )
}
