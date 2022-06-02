import React from "react";
import Carousel from "react-elastic-carousel";
import Card from "./Card";
import {useEffect,useState} from "react"
const api_key = process.env.NEXT_PUBLIC_API_KEY;

const img_300 = "https://image.tmdb.org/t/p/w300";
const img_500 = "https://image.tmdb.org/t/p/w500";
const noPicture = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

function CarouselComponent({ media_type,movie_id}) {
 
  const [credits, setCredits] = useState([]);
  
  
  


  const fetchcredit = async() =>{
    const {cast}  = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${movie_id}/credits?api_key=${api_key}&language=en-US`,
    ).then((res) => res.json())
    
    

    setCredits(cast);
    
  }

  
  useEffect(()=>{
    fetchcredit();
  },[])
  
  return (
    <div>
      
      {
       credits? 
       
      <Carousel>
         {
             credits.map((c)=>(
               
               <Card img = {c.profile_path ? `${img_300}/${c.profile_path}` : noPicture} name = {c?.name} key = {c.id}/>
             ))
         }

      </Carousel>
      :null}
    </div>
  );
}

export default CarouselComponent;
