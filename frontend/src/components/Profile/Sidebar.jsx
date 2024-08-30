import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth'

export default function Sidebar({data}) {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector((state)=>state.auth.role);

  return (
    <>
    <div className='bg-zinc-800 p-4 rounded-[8px] flex flex-col items-center justify-between h-[82vh]'>
        <div className='flex items-center flex-col justify-center '>
            <img src={data.avatar} alt="" className='h-[120px] w-[120px] rounded-[50%]'/>
            <p className='mt-3 text-xl font-semibold'>{data.username}</p>
            <p className='mt-1 text-normal text-[11px] text-zinc-300'>{data.email}</p>
            <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
        </div>
        {role==="user" && <div className='w-full flex flex-col items-center justify-center'>
            <Link to="/profile" className='font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all ' >
                Favourites
            </Link>
            <Link to="/profile/orderHistory" className='font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all ' >
                Order History
            </Link>
            <Link to="/profile/settings" className='font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all ' >
                Settings
            </Link>
        </div>}
        {role==="admin" && <div className='w-full flex flex-col items-center justify-center'>
            <Link to="/profile" className='font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all ' >
                All Orders
            </Link>
            <Link to="/profile/add-books" className='font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all ' >
                Add Book
            </Link>
            <Link to="/profile/settings" className='font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all ' >
                Settings
            </Link>
        </div>}
        <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
        onClick={()=>{
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role");
            history("/")
        }}
        >
            Log Out
        </button>
    </div>
    </>
  )
}
