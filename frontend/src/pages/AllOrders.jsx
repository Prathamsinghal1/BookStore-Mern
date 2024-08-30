import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser,  FaLink, FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Alert from '../components/Alert/Alert';
import UserInfo from '../components/Profile/UserInfo';

export default function AllOrders() {
  
  const [visible, setVisible] = useState(false);
  const [userVisible, setUserVisible] = useState(false);
  const [sendData, setSendData] = useState(false);
  const [message, setMessage] = useState();
  const [data, setData] = useState();
  const [Value, setValue] = useState({ status: "" });
  const [option, setOption] = useState(-1);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

    
  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", {headers});
      setData(response.data.data);
    }
    fetch();
  },[data]);

  
  const handleChange = (event) => {
    const { value } = event.target;
    setValue({ status: value });
  };
  

  const handleEdit = async (index) => {
    try {
      const id = data[index]._id;  // Access the correct ID
      const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`, Value, { headers });
      setMessage(response.data.message);
      setVisible(true);
    } catch (error) {
      setMessage("Failed to update the status");
      setVisible(true);
    }
  };

  return (
    <>
    {visible && <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>}


    {userVisible && <UserInfo setUserVisible={setUserVisible} sendData={sendData}/>}


    <div className='text-zinc-100 w-full md:mx-4'>
      {!data && <Loading/>}
      {data && data == "" && <div className='md:mt-0 mt-10 text-xl font-semibold w-full bg-zinc-800 h-[82vh] flex flex-col items-center justify-center rounded-[8px] text-zinc-400'>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-order-history-11941609-9741047.png?f=webp" alt="Hello" className='h-[30vh]'/>
        <p className='mt-3'>No Order History</p>
      </div>}
      {data && data.length > 0 && <div className='w-full p-0 md:p-4 text-zinc-100'>
        <h1 className='my-8 mx-2 text-zinc-500 font-semibold md:text-5xl text-3xl text-center'>All Orders</h1>
        <div className='mt-4 bg-zinc-800 w-full text-zinc-200 py-2 px-4 rounded-[10px] flex gap-2'>
          <div className='w-[3%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Sr.</p>
          </div>
          <div className='w-[40%] md:w-[22%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Book</p>
          </div>
          <div className='w-0 md:w-[45%] hidden md:block'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Description</p>
          </div>
          <div className='w-[17%] md:w-[9%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Price</p>
          </div>
          <div className='w-[30%] md:w-[16%]'>
            <p className='p-3 text-semibold md:text-xl text-center w-full'>Status</p>
          </div>
          <div className='w-[10%] md:w-[5%] flex items-center justify-center'>
            <p className='p-3 text-semibold md:text-xl'><FaUser/></p>
          </div>
        </div>
        
        {data && data.map((item,index)=>
          <div key={index} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300 my-1'>
                  <div className='w-[3%] flex items-center justify-center'>
                    <h1 className='text-center'>{index+1}</h1>
                  </div>
                  <div className='w-[40%] md:w-[22%] text-center'>
                    <Link to={`/view-book-details/${item.book._id}`} className='max-sm:text-sm hover:text-blue-300'>
                      {item.book.title}
                    </Link>
                  </div>
                  <div className='w-0 md:w-[45%] hidden md:block'>
                    <h1 className='text-center'>{item.book.desc.slice(0,50)} ...</h1>
                  </div>
                  <div className='w-[17%] md:w-[9%] flex items-center justify-center'>
                    <h1 className='text-center'>{item.book.price}</h1>
                  </div>
                  <div className='w-[30%] md:w-[16%] relative'>
                    <h1 className='font-semibold text-center'>
                      <button
                        className='hover:scale-105 transition-all duration-300'
                        onClick={() => setOption(index)}
                      >
                        {item.status === "Delivered" ? (
                          <div className='text-green-500'>{item.status}</div>
                        ) : item.status === "Cancelled" ? (
                          <div className='text-red-500'>{item.status}</div>
                        ) : (
                          <div className='text-yellow-500'>{item.status}</div>
                        )}
                      </button>

                      <div className={`${option === index ? "block" : "hidden"} mt-2 flex flex-row items-center justify-center`}>
                        <select
                          name="status"
                          className="bg-gray-800 inline w-[19px] h-[19px] rounded-full border"
                          onChange={(event) => handleChange(event, index)}
                        >
                          {[
                            "Order-placed",
                            "Out for Delivery",
                            "Delivered",
                            "Cancelled",
                          ].map((items, i) => (
                            <option value={items} key={i}>
                              {items}
                            </option>
                          ))}
                        </select>

                        <button
                          className='text-green-500 hover:text-pink-600 mx-2'
                          onClick={() => {
                            handleEdit(index);
                            setOption(-1);
                          }}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    </h1>
                  </div>

                  <div className='w-[10%] md:w-[5%] flex items-center'>
                    <p className='text-xl text-zinc-200 text-center hover:text-orange-500 w-full h-full flex items-center justify-center' onClick={()=>{
                      setUserVisible(true);
                      setSendData(item.user);
                      }} ><FaLink/></p>
                  </div>
          </div>
        )}
      </div>}
    </div>
    </>
  )
}
