import React from 'react';
import {Link} from "react-router-dom";

export default function BookCard({data}) {
  return (
    <Link to={`/view-book-details/${data._id}`} className=' bg-zinc-800 text-zinc-100 flex flex-col  rounded-[13px] p-5'>
      <div className='bg-zinc-900 rounded flex items-center justify-center'>
        <img src={data.url} alt="" className='h-[40vh]' />
      </div>
      <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
      <p className='mt-2 text-zinc-400 font-semibold'>{data.author}</p>
      <p className='mt-2 text-zinc-400 font-semibold texl-xl'>₹ {data.price}</p>
    </Link>
  )
}
