import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import CustomPagination from "../components/CustomPagination";
import BottomNavigation from "../components/BottomNavigation";
import Generes from "../components/Generes/Generes";

const api_key = process.env.NEXT_PUBLIC_API_KEY;

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [searchmovies, setSearchmovies] = useState();
  const [generes, setGeneres] = useState("Action");
  const[loading,setLodaing] = useState(false);

  function getsearchmovies(data) {
    setSearchmovies(data);
  }

  function getgeneres(genres_id) {
    setGeneres(genres_id);
  }

  const fetchMovies = async () => {
    const { data } = await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${generes}`
      )
      .catch((err) => console.log(err));
    setContent(data.results);
    setNumOfPages(data.total_pages);
    setLodaing(true);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
  }, [page, generes]);

  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
      </Head>
      <Header getsearchmovies={getsearchmovies} />
      <Generes getgeneres={getgeneres} />

      {searchmovies ? (
        <Results results={searchmovies} />
      ) : (
        <Results results={content} />
      )}
      
      
       {!searchmovies &&  loading && numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
       )}
      

      <BottomNavigation />
    </div>
  );
};

export default Movies;
