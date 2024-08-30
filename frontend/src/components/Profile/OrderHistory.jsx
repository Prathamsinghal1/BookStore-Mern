import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from '../../pages/Loading';
import { Link } from 'react-router-dom';

export default function OrderHistory() {

  const [data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };


  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get("http://localhost:1000/api/v1/get-order-history", {headers});
      setData(response.data.data);
    }
    fetch();
  },[]);


  return (
    <>
    <div className='text-zinc-100 w-full mx-10'>
      {!data && <Loading/>}
      {data && data == "" && <div className='md:mt-0 mt-10 text-xl font-semibold w-full bg-zinc-800 h-[82vh] flex flex-col items-center justify-center rounded-[8px] text-zinc-400'>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-order-history-11941609-9741047.png?f=webp" alt="Hello" className='h-[30vh]'/>
        <p className='mt-3'>No Order History</p>
      </div>}
      {data && data.length > 0 && <div className='w-full'>
        <h1 className='my-7 mx-2 font-semibold text-4xl text-center'>Order History</h1>
        <div className='mt-4 bg-zinc-800 w-full text-zinc-100 py-2 px-4 rounded-[10px] flex gap-2'>
          <div className='w-[3%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Sr.</p>
          </div>
          <div className='w-[22%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Book</p>
          </div>
          <div className='w-[45%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Description</p>
          </div>
          <div className='w-[9%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Price</p>
          </div>
          <div className='w-[16%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Status</p>
          </div>
          <div className='w-none md:w-[5%] hidden md:block text-center mr-5'>
            <p className='p-3 text-semibold md:text-xl'>Mode</p>
          </div>
        </div>
        {data.map((item,index)=>{
            return (
              <div key={index} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer my-1'>
                <div className='w-[3%]'>
                  <h1 className='text-center'>{index+1}</h1>
                </div>
                <div className='w-[22%] text-center'>
                  <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
                    {item.book.title}
                  </Link>
                </div>
                <div className='w-[45%]'>
                  <h1 className='text-center'>{item.book.desc.slice(0,50)} ...</h1>
                </div>
                <div className='w-[9%]'>
                  <h1 className='text-center'>{item.book.price}</h1>
                </div>
                <div className='w-[16%]'>
                  <h1 className='md:font-semibold text-green-500 text-center'>
                    {item.status==="Order Placed" ? (
                      <div className='text-yellow-500'>
                        {item.status}
                      </div>
                    ) : item.status==="Cancelled" ? (
                      <div className='text-red-500'>
                        {item.status}
                      </div>
                    ) : (item.status) }
                  </h1>
                </div>
                <div className='w-none md:w-[5%] hidden md:block'>
                  <p className='text-sm text-zinc-400 text-center'>COD</p>
                </div>
              </div>
            )
        })}
      </div>}
    </div>
    </>
  )
}
