import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import Alert from '../Alert/Alert';
export default function Card({item , val, setVisible, setMessage}) {

  
    
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    mybook: item._id,
  };
    
  const handleRemove = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/remove-book-from-favourite",{},{headers});
    setMessage(response.data.message);
    setVisible(true);
  }
  
  
  const handleCartDelete = async () => {
    const response = await axios.put(`http://localhost:1000/api/v1//remove-from-cart/${item._id}`,{},{headers});
    setMessage(response.data.message);
    setVisible(true);
  }

  return (<>
    {val !== true && <div className='md:flex my-6 flex flex-col rounded-[8px] border border-zinc-500 p-2 items-center justify-center px-5 w-full'>
      <Link to={`/view-book-details/${item._id}`} className=' bg-zinc-800 text-zinc-100 flex md:flex-row md:px-1 mt-5 w-full px-3 pb-2 rounded-[13px] flex-col max-sm:items-center max-sm:justify-center max-md:items-center max-md:justify-center' >
        <img src={item.url} alt="" className='h-[200px] w-[180px] rounded-[8px]'/>
        <div className='mb-2'>
          <p className='text-xl font-semibold md:mt-3'>{item.title}</p>
          <p className='mt-2 text-zinc-400 font-semibold'>{item.author}</p>
          <p className='mt-2 text-zinc-400 font-semibold'>₹ {item.price}</p>
        </div>
      </Link>
      <button className='flex items-center justify-center border rounded-[8px] p-2 my-2 text-sm bg-red-400 w-[210px]' onClick={handleRemove} >
          <RiDeleteBinLine />
          <span className='ml-2 font-semibold'>
            Remove from favourites
          </span>
      </button>
    </div>}

    {val === true && <div className=' my-6 md:flex flex flex-col md:flex-row rounded-[8px] border border-zinc-500 p-2 items-center justify-center px-5 w-full'>
    <Link to={`/view-book-details/${item._id}`} className='mb-3 bg-zinc-800 text-zinc-100 flex md:flex-row md:px-1 mt-5 w-full px-3 pb-2 rounded-[13px] flex-col max-sm:items-center max-sm:justify-center max-md:items-center max-md:justify-center' >
      <img src={item.url} alt="" className='h-[200px] w-[180px] rounded-[8px]'/>
      <div className='md:my-3'>
        <p className='text-xl font-semibold md:mt-3'>{item.title}</p>
        <p className='mt-2 text-zinc-400 font-semibold'>{item.author}</p>
        <p className='mt-2 text-zinc-400 font-semibold'>₹ {item.price}</p>
      </div>
    </Link>
    <button className='flex items-center justify-center border rounded-[30px] hover: md:p-2 px-4 py-2 ml-6 mx-6 text-sm bg-red-400' onClick={handleCartDelete}>
        <RiDeleteBinLine />
        <span className='ml-2 font-semibold'>
          Delete
        </span>
    </button>
  </div>}
  </>
  )
}
