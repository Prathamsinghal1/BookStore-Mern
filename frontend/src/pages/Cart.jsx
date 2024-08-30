import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from "../components/Profile/Card";
import Loading from "../pages/Loading"
import Alert from '../components/Alert/Alert';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const navigate = useNavigate();
  
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [total, setTotal] = useState(0);
  const [cost, setCost] = useState(0);

  const [data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-cart",{headers});
      setData(response.data.data);
    }
    fetch();
  },[data])
  
  const handlePlaceOrder = async () => {

    try {
        const response = await axios.post("http://localhost:1000/api/v1/place-order",
          {order:data},{headers});
        setMessage(response.data.message);

        setVisible(true);
        navigate("/profile/orderHistory");
      }
    catch (error) {
      setMessage(error.response.data.message);
      setVisible(true);
    }
  }

  useEffect(()=>{
    if(data && data.length>0){
       let t=0;
       data.map((items)=>{
          t+=items.price;
       })
       setCost(t+0.1*(t));
       setTotal(t);
       t=0;
    }
  },[data])

  return (
    <>
    
    {visible && <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>}
    <div className='bg-zinc-900 px-12 py-7 min-h-screen'>
      {data && data.length>0 && <div className='m-auto p-4 border border-zinc-400 rounded-[15px] w-[70vw] md:flex items-center justify-between'>
        <div className='p-2'>
            <p className='text-zinc-400 md:text-xl font-semibold flex'>Cost:  <p className='ml-6 text-[green]'>₹{Math.round(cost)}</p></p>
            <p className='text-zinc-400 md:text-xl font-semibold flex'>Discount: <p className='ml-2 text-[green]'>-₹{Math.round(cost-total)}</p></p>
            <p className='text-zinc-400 md:text-xl font-semibold flex'>Delivery Charges: <p className='ml-2 text-[green]'>+₹10</p></p>
            <p className='text-zinc-400 md:text-xl font-semibold flex'>Total: <p className='ml-6 text-[green]'>₹{Math.round(cost-Math.round(cost-total)+10)}</p></p>
        </div>
        <div className="px-2">
          <button className='border rounded-[18px] text-zinc-200 py-2 px-8 min-w-[15vw]' onClick={handlePlaceOrder} style={{background:"linear-gradient(135deg, #aa70e0, #7059e2)"}}>Place Order</button>
        </div>
      </div>}
      {data=="" && <div className='md:mt-0 mt-10 text-xl font-semibold w-full bg-zinc-800 h-[82vh] flex flex-col items-center justify-center rounded-[8px] text-zinc-400'>
        <img src="./Images/cart.png" alt="" className='h-[30vh]'/>
        Cart is Empty
      </div>}
      {!data && <Loading/>}
      {data && <div className='  rounded-[8px] w-[70vw] m-auto' >
        {data.map((item,index)=>{
          return (
            <Card key={index} item={item} val={true} setVisible={setVisible} setMessage={setMessage}/>
          )
        })}
      </div>}
      
    </div>
    
    </>
  )
}
