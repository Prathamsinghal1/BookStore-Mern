import React from 'react'
import { RxCrossCircled } from "react-icons/rx";

export default function UserInfo({setUserVisible,sendData}) {
    // console.log(sendData);
  return (
    <>
        {sendData && <div className="fixed inset-0 text-zinc-200 bg-opacity-30 backdrop-blur-sm h-screen z-[9999] flex items-center">
        <div className='bg-zinc-500 rounded-[13px] w-[28%] m-auto p-3 relative font-semibold'>
            <div className='absolute top-3 right-3 text-5xl font-bold text-zinc-200 cursor-pointer' onClick={()=>setUserVisible(false)}>
                <RxCrossCircled />
            </div>
            
            <div className='md:p-10 p-6'>
            <h1 className='text-3xl md:text-5xl text-zinc-700 mb-8 text-center'>User Details</h1>
            
            <div className='my-5'>
                <p className=' '>Username</p>
                <p className='p-2 rounded bg-zinc-800 mt-2'>{sendData.username}</p>
            </div>
            
            <div className='my-5'>
                <p>Email</p>
                <p className='p-2 rounded bg-zinc-800 mt-2'>{sendData.email}</p>
            </div>
            
            <div className='mt-4 flex flex-col'>
                <p>Address</p>
                <p className='p-2 rounded bg-zinc-800 mt-2'>{sendData.address}</p>
            </div>
            </div>
        </div>
        </div>}
    </>
  )
}
