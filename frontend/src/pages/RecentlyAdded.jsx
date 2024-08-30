import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard/BookCard';
import axios from "axios";
import Loading from './Loading';

export default function RecentlyAdded() {
    const [myData,setData] = useState();
    const apiVal = "http://localhost:1000/api/v1/get-recent-books";
    useEffect(()=>{
        const fetch = async ()=>{
            const response = await axios.get(apiVal);
            setData(response.data.data);
        }
        fetch();  
    },[]);

  return (
    <div className='mt-8'>  
      <h1 className=' text-3xl text-yellow-100'>Recently Added Books</h1>
      
      <div className='my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {!myData && <Loading/>}
        {myData && myData.map((item, index)=>{
            return (
                <BookCard key={index} data={item} />
            )
        })}
      </div>
    </div>
  )
}
