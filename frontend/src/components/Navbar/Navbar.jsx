import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { IoIosMenu } from "react-icons/io";
import { useSelector } from 'react-redux';

const Navbar = () => {

    const links = [
        {
            title:"Home",
            link:"/"
        },
        {
            title:"About Us",
            link:"/about-us"
        },
        {
            title:"All Books",
            link:"/all-books"
        },
        {
            title:"Cart",
            link:"/cart"
        },
        {
            title:"Profile",
            link:"/profile"
        },
        {
            title:"Admin Profile",
            link:"/profile"
        }
    ]

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const role = useSelector((state)=>state.auth.role);

    if(!isLoggedIn){
        links.splice(3, 3);
    }
    if(isLoggedIn && role === "user"){
        links.splice(5, 1);
    }
    if(isLoggedIn && role === 'admin'){
        links.splice(3, 2);
    }

    const [open,setOpen] = useState(false);

  return (
    <>
        <nav className='z-[50] relative px-8 py-3 text-white bg-zinc-800 shadow-xl flex items-center justify-between'>
            <div className='flex items-center'>
                <img className='h-10 mx-2' src="./Images/LogoImage.png" alt="Logo" />
                <h1 className='text-2xl font-semibold '>
                BooksCollection
                </h1>
            </div>
            <div className='bookCollection-links block md:flex items-center gap-4'>
                <div className='hidden md:flex gap-4'>
                    {links.map((item,index)=>{
                        return (
                            <>
                            {(item.title === "Profile" || item.title === "Admin Profile") &&  <div key={index} className='border hover:border-blue-500 border-white rounded p-2' >
                            {item==="Admin Profile" && <Link to={item.link} className='cursor-pointer hover:text-blue-500 transition-all duration-300 border border-red'>{item.title}</Link>}
                            {item !== "Admin Profile" && <Link key={index} to={item.link} className='cursor-pointer hover:text-blue-500 transition-all duration-300'>{item.title}</Link>}
                            </div>}
                            {!(item.title === "Profile" || item.title === "Admin Profile") &&  <div key={index} className='flex items-center ' >
                            {item==="Admin Profile" && <Link to={item.link} className='cursor-pointer hover:text-blue-500 transition-all duration-300 border border-red'>{item.title}</Link>}
                            {item !== "Admin Profile" && <Link key={index} to={item.link} className='cursor-pointer hover:text-blue-500 transition-all duration-300'>{item.title}</Link>}
                            </div>}
                            
                            
                            </>
                        )
                    })}
                </div>
                {!isLoggedIn && <div className='hidden md:flex gap-4'>
                    <Link to="/logIn" className='px-2 py-1 border border-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 '>
                        LogIn
                    </Link>
                    <Link to="signUp" className='px-2 py-1 bg-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300  '>
                        SignUp
                    </Link>
                </div>}

                <div className='block md:hidden text-2xl text-white hover:text-zinc-400'>
                <IoIosMenu onClick={()=>setOpen(!open)}/>
                </div>
            </div>
        </nav>
        <div className={`md:hidden backdrop-blur-xl text-white h-screen absolute top-0 left-0 w-full z-[40] flex flex-col items-center justify-center gap-5 ${open?"block":"hidden"} `}>
            {links.map((item,index)=>{
                return (
                    <Link key={index} to={item.link} className='text-4xl font-semibold cursor-pointer hover:text-blue-500 transition-all duration-300' onClick={()=>setOpen(!open)}>{item.title}</Link>
                )
            })}
            {!isLoggedIn && <><Link to="/logIn" className='px-4 py-2 font-semibold border border-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 ' onClick={()=>setOpen(!open)}>
                LogIn
            </Link>
            <Link to="signUp" className='px-4 py-2 font-semibold bg-blue-400 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300  ' onClick={()=>setOpen(!open)}>
                SignUp
            </Link></>}
        </div>
    </>
  )
}

export default Navbar
