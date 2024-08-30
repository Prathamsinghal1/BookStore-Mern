import React from 'react'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='h-screen md:h-[85vh] flex flex-col md:flex-row items-center justify-center'>
      <div className='mb-12 md:mb-0 w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center '>
        <h1 className='mt-12 text-3xl lg:mt-0 lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
            Find New Book To Change The Future
        </h1>
        <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
            Read uncover books, enrich your knowledge, and find endless inspiration with our finest collection of books 
        </p>
        <div className='mt-3 md:mt-8'>
            <Link to="/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-2 rounded-full hover:bg-zinc-800'>
                Get Books
            </Link>
        </div>
      </div>
      <div className='w-3/6'>
        <img className="h-full w-full" src="./Images/book4.png" alt="Book Image" />
      </div>
    </div>
  )
}

export default Hero
