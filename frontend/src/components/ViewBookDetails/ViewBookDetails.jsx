import React,{useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Loading from './Loading';
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Alert from '../Alert/Alert';
import DeleteBtn from '../../pages/DeleteBtn';

export default function ViewBookDetails() {

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const role = useSelector((state)=>state.auth.role);
    const { id } = useParams();
    const [myData,setData] = useState();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        mybook : id
    };
    const handleFavourite = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite",{},{headers});
        setMessage(response.data.message);
        setVisible(true);
    }
    const handleCart = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{headers});
        setMessage(response.data.message);
        setVisible(true);
    }

    const apiVal = `http://localhost:1000/api/v1/get-book-by-id/${id}`;
    useEffect(()=>{
        const fetch = async ()=>{
            const response = await axios.get(apiVal);
            setData(response.data.data);
        }
        fetch();  
    },[]);
  return (
    <>
        {visible && <Alert message={message} type={"success"} visible={visible} setVisible={setVisible}/>}
        { !myData && <div className='h-screen bg-zinc-900 py-8'><Loading/></div>}
        { myData && <div className='bg-zinc-900 px-12 py-8 flex flex-col md:flex-row  gap-8 '>
                <div className='bg-zinc-600 rounded-[15px] p-6 md:w-2/6 h-[88vh] flex items-center justify-center p-4 w-[100%] md:flex-row md:flex-row flex-col' > 
                    <img src={myData.url} alt="Image" className='h-[80vh] md:w-[35vw] w-[70vw] border-none'/> 

                    {isLoggedIn && role==="user" && 
                    <div className='text-2xl md:mr-2 md:gap-10 flex flex-row md:flex-col mb-7 md:mb-0'>

                        <button className='mr-2 bg-zinc-100 text-red-500 hover:bg-red-500 hover:text-zinc-100 p-2 rounded-[10px] flex items-center justify-center' onClick={handleFavourite}>
                            <FaHeart/>
                            <span className='block md:hidden text-sm font-semibold ms-2'>Favourites</span>
                        </button>

                        <button className='mr-2 bg-zinc-100 text-pink-400 hover:bg-pink-400 hover:text-zinc-100 p-2 rounded-[10px] flex items-center justify-center' onClick={handleCart}>
                            <FaShoppingCart/>
                            <span className='block md:hidden text-sm font-semibold ms-2'>Add to cart</span>
                        </button>
                    </div>}
                    {isLoggedIn && role==="admin" && 
                    <div className='text-2xl md:mr-2 md:gap-10 flex flex-row md:flex-col mb-7 md:mb-0'>
                        <Link to={`/update-books/${id}`} className='mr-2 bg-zinc-100 text-red-500 hover:bg-red-500 hover:text-zinc-100 p-2 rounded-[10px] flex items-center justify-center'><FaEdit/><span className='block md:hidden text-sm font-semibold ms-2'>Edit</span></Link>
                        <DeleteBtn/>
                    </div>}

                </div>
                <div className='rounded-[15px] p-4 md:w-4/6 w-[80vw]'>
                    <h1 className='text-4xl text-zinc-300 font-semibold'>{myData.title}</h1>
                    <p className='text-xl text-zinc-400 mt-1'>{myData.author}</p>
                    <p className='mt-4 text-xl text-zinc-500 font-semibold'>{myData.desc}</p>
                    <p className='mt-4 text-xl text-zinc-400 flex items-center gap-3'>
                        <GrLanguage />
                        {myData.language}
                    </p>
                    <p className='mt-4 text-3xl text-zinc-100 font-semibold'>
                        Price : ₹ {myData.price}
                    </p>

                </div>
        </div>}
    </>
  )
}
