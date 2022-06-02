import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import CustomPagination from "../components/CustomPagination";
import BottomNavigation from "../components/BottomNavigation";
import { useRouter } from 'next/router'

const api_key = process.env.NEXT_PUBLIC_API_KEY;

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [searchmovies, setSearchmovies] = useState();
  const router = useRouter();
  const [numOfPages, setNumOfPages] = useState();
  const[loading,setLodaing] = useState(false);

  

  function getsearchmovies(data) {
    setSearchmovies(data);
  }

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`
    );
   
    setContent(data.results);
    setNumOfPages(data.total_pages);
    setLodaing(true);
   
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
  }, [page]);

  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
      </Head>
      <Header getsearchmovies={getsearchmovies} />
      <Nav />

      {searchmovies ? (
        <Results results={searchmovies} />
      ) : (
        <Results results={content} />
      )}

      {!searchmovies && loading?<CustomPagination setPage={setPage} numOfPages={numOfPages}/>:null}
      <BottomNavigation />
    </div>
  );
};

export default Trending;
