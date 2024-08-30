import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard/BookCard';
import axios from "axios";
import Loading from './Loading';
import Alert from '../components/Alert/Alert';

const AllBooks = () => {
  
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [myData,setData] = useState();

  try {
    const apiVal = "http://localhost:1000/api/v1/get-all-books";
    useEffect(()=>{
        const fetch = async ()=>{
            const response = await axios.get(apiVal);
            setData(response.data.data);
        }
        fetch();  
  },[]);
  } catch (error) {
    setMessage(error);
    setVisible(true);
  }
  
    
  return (<>
    <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>
    <div className='p-6 bg-zinc-900'>
      <h1 className=' text-3xl text-yellow-100 px-2'>All Available Books</h1>
      <div className='my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {!myData && <Loading/>}
        {myData && myData.map((item, index)=>{
            return (
                <BookCard key={index} data={item} />
            )
        })}
      </div>
    </div></>
  )
}

export default AllBooks