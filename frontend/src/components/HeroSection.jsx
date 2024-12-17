import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

  return (
    <div className='text-center py-2'>
        <div className='flex flex-col gap-1 my-5'>
            <h2 className='px-4 py-2 rounded-md bg-gray-200 text-red-800 font-medium'>
                India's leading <span className='text-blue-900'>Job </span>Providing platform
            </h2>
            <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl mt-5'>
                Seamless Job Searching <br /> with quick <span className='text-blue-900'>Interview Calls</span>
            </h1>
            <div className='max-w-full sm:max-w-70 my-5 mx-auto border-gray-500 rounded-full bg-slate-200'>
                <p className='px-5 py-2 text-sm sm:text-base'>
                    Empowering careers with top MNC-endorsed opportunities. Join thousands who've successfully found their path with our trusted job placement platform.
                </p>
            </div>
        </div>

        <div className='flex w-full sm:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input
                type="text"
                placeholder='Search jobs here'
                onChange={(e) => setQuery(e.target.value)}
                className='outline-none border-none w-full py-2 px-3'
            />
            <Button onClick={searchJobHandler} className="rounded-r-full bg-blue-900">
                <Search className='h-5 w-5' />
            </Button>
        </div>
    </div>
  )
}

export default HeroSection;
