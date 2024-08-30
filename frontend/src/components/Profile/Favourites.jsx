import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import Loading from "../../pages/Loading"
import Alert from '../Alert/Alert';

export default function Favourites() {

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();

  const [data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books",{headers});
      setData(response.data.data);
    }
    fetch();
  },[data])

  return (<>
    {visible && <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>}
    <div className='text-zinc-100 w-full mx-10'>
      {!data && <Loading/>}
      {data=="" && <div className='md:mt-0 mt-10 text-xl font-semibold w-full bg-zinc-800 h-[82vh] flex flex-col items-center justify-center rounded-[8px] text-zinc-400'>
        <img src="./Images/bookmark.png" alt="" className='h-[30vh]'/>
        <p className='mt-3'>No Favourite Book</p>
      </div>}
      {data && data.map((item,index)=>{
        return(
            <Card key={index} item={item} setMessage={setMessage} setVisible={setVisible}/>
        )
      })}
    </div></>
  )
}
