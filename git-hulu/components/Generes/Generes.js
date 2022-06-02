import React,{useEffect} from 'react'
import { useRouter} from 'next/router'
const current_year = new Date().getFullYear();

function Generes({ getgeneres }) {
  const router = useRouter();
  
  let generes =  {
    "Action": 28,
    "Adventure": 12,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Documentary": 99,
    "Drama": 18,
    "Family": 10751,
    "Fantasy": 14,
    "History": 36,
    "Horror": 27,
    "Music": 10402,
    "Mystery": 9648,
    "Romance": 10749,
    "ScienceFiction": 878,
    "TVMovie": 10770,
    "Thriller": 53,
    "War": 10752,
    "Western": 37,
   };

  
    if(router.pathname === '/TvSeries'){
      generes = {
        "Action & Adventure":10759,
        "Animation":16,
        "Comedy":35,
        "Crime":80,
        "Documentary":99,
        "Drama":18,
        "Family":10751,
        "Kids":10762,
        "Mystery":9648,
        "News":10763,
        "Reality":10764,
        "Sci-Fi & Fantasy":10765,
        "Soap":10766,
        "Talk":10767,
        "War & Politics":10768,
        "Western":37
      
      }
      

    }
    else if(router.pathname === '/IndianCinema'){
        generes = {};
        
        for(let i=current_year;i>=2000;i--){
          let year = `${i}`;
          let year_id = year;
          
          generes[year] = year_id;
        }
        
    }
   

  
 
  

  

  
  return (
    <nav className="relative">
      <div className="flex px-10 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
        

        {Object.entries(generes).map((genre) => (
         
          <h2
            onClick={() => getgeneres(genre[1])}
            className="last:pr-20 cursor-pointer transition duration-100 transform hover:scale-125 hover: text-white active:text-red-500"
            key={genre[1]}
          >
            {genre[0]}
          </h2>
        ))}
      </div>

      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12" />
    </nav>
  )
}

export default Generes
