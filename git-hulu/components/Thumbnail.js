import React from 'react'
import Image from 'next/image'
import { ThumbUpIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from './Modal'

const noPicture = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
function Thumbnail({ result }) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original/'
  const [fullcontent, setFullcontent] = useState(false)
  const router = useRouter()
  const movie_id = result.id
  const api_key = process.env.NEXT_PUBLIC_API_KEY
  const [videos, setVedios] = useState('')
  const [playTrailer, setPlayTrailer] = useState(false)
  const [is_trailer, setis_trailer] = useState(false)
  const [is_open,setIsopen] = useState(false);
 
 
  
  let media_type = result.media_type;
 

 
  
   
  if(media_type === undefined){
      if(router.pathname === '/Movies' || router.pathname === '/Trending'){
        
         media_type = 'movie';
        
      }
      else if(router.pathname === '/TvSeries'){
        media_type = 'tv';
      }
      else{
        media_type = 'movie';
      }
     
  }
  
  
  
 
  
  
  const fetchmovie = async () => {
    const { results } = await fetch(
      ` https://api.themoviedb.org/3/${media_type}/${movie_id}/videos?api_key=${api_key}&language=en-US`,
    ).then((res) => res.json())
   

    
    if (results !== undefined && results[0] !== undefined) {
     
      setVedios(results[0].key)
      setis_trailer(true)
    }

   
  }
  const modal_close = () =>{
      setPlayTrailer(false);
      setIsopen(false);
   
    
  }
 
  
  
  useEffect(() => {
    fetchmovie()
  }, [])

  return (
    <div >
      <div className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
       
        <Image
          layout="responsive"
          src={
            `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
            `${BASE_URL}${result.poster_path}` || `${noPicture}`
           
          }
          alt=""
          height={1080}
          width={1920}
          opacity="60"
          onClick = {()=>{
           
            setIsopen(!is_open)}}
         
          
        />
        <div className="absolute  top-0 left-0 px-4 py-4 opacity-100">
          {is_trailer ? (
            <button
              className="mb-3 text-md  tracking-tight  bg-[#06202A] text-gray-300 hover:bg-gray-700  font-bold py-2 px-4 rounded"
              onClick={() => {
               
                setPlayTrailer(!playTrailer)
                setIsopen(!is_open)
              }
              }
            >
              Watch Trailer
            </button>
          ) : null}
        </div>
        {/* • */}
        <div className="last:mb-5 p-2">
         
          <Modal
            movie_img={
              `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
              `${BASE_URL}${result.poster_path}`
            }
            movie_name={result.title || result.original_name}
            movie_overview={result.overview}
            is_open = {is_open}
            trailer_id = {videos}
            playTrailer = {playTrailer}
            media_type = {media_type}
            movie_id = {movie_id}
            modal_close = {modal_close}          

            
          />
          <p className="max-w-md">
            {fullcontent
              ? result.overview
              : `${result.overview.slice(0, 60)}....`}{' '}
            {
              result.overview?<strong onClick={() => setFullcontent(!fullcontent)}>
              {fullcontent ? `....Show Less` : `Show More`}
              </strong>:null
            }  
            
          </p>
          <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">
            {result.title || result.original_name}
          </h2>

          <p className="flex items-center opacity-0 group-hover:opacity-100">
            {result.media_type && `${result.media_type} •`}{' '}
            {result.release_date || result.first_air_date} •{' '}
            <ThumbUpIcon className="h-5 mx-2" />
            {result.vote_count}
          </p>
          <div className="mr-10 flex flex-row items-center opacity-0 group-hover:opacity-100">
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thumbnail
