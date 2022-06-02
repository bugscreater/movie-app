import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'
import { useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'

export default function Home({ results }) {
  const [searchmovies, setSearchmovies] = useState()

  function getsearchmovies(data) {
    setSearchmovies(data)
  }

  if (results) {
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
          <Results results={results} />
        )}
        <BottomNavigation />
      </div>
    )
  }
}

export async function getServerSideProps(context) {
  const genre = context.query.genre

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`,
  ).then((res) => res.json())

  return {
    props: {
      results: request.results,
    },
  }
}
