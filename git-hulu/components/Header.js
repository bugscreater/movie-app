import React from 'react'
import Image from 'next/image'
import HeaderItem from './HeaderItem'
import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'


function Header({ getsearchmovies }) {
  const router = useRouter();
  const[type,setType] = useState("movie");
  
  
  useEffect(()=>{
    if(router.pathname === '/TvSeries'){
       setType('tv');
    }
   
  },[router.pathname])
  

  const [timer, setTimer] = useState(null)
  const BASE_URL = `https://api.themoviedb.org/3/search/${type}?`
  const api_key = process.env.NEXT_PUBLIC_API_KEY

  const searchQuery = (e) => {
    const query = e.target.value
    clearTimeout(timer)

    const newTimer = setTimeout(async () => {
      const { results } = await fetch(
        `${BASE_URL}api_key=${api_key}&query=${query}`,
      )
        .then((results) => results.json())
        .catch((err) => {
          alert('Something went wrong')
          return;
        })

      getsearchmovies(results)
    }, 500)

    setTimer(newTimer)
  }

  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
      <div className="flex flex-grow justify-evenly max-w-2xl">
        <HeaderItem title="HOME" Icon={HomeIcon} />
        <HeaderItem title="VERIFIED" Icon={BadgeCheckIcon} />
        <HeaderItem title="COLLECTIONS" Icon={CollectionIcon} />
        <HeaderItem title="ACCOUNT" Icon={UserIcon} />
      </div>
      <div className="max-w-md relative flex items-center text-gray-400 focus-within:text-gray-600 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
        <SearchIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
        <input
          className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          placeholder={`search ${type}`}
          type="text"
          autoComplete="off"
          area-label={`search ${type}`}
          onChange={searchQuery}
          spellCheck={false}
        />
      </div>
      <Image
        className="object-contain"
        src="https://links.papareact.com/ua6"
        width={200}
        height={100}
      />
    </header>
  )
}

export default Header
