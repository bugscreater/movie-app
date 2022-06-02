import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import TvIcon from '@material-ui/icons/Tv'
import MovieIcon from '@material-ui/icons/Movie'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0)
  const router = useRouter()

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className="w-full fixed inset-x-0  bottom-0 z-10 bg-[#06202A]"
    > 
      
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Trending"
        icon={<WhatshotIcon />}
        onClick={() => router.push('/Trending')}
      />
      
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Movies"
        icon={<MovieIcon />}
        onClick={() => router.push('/Movies')}
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="TV Series"
        icon={<TvIcon />}
        onClick={() => router.push('/TvSeries')}
      />
      
      <BottomNavigationAction
        style={{ color: 'white' }}
        label="Inidan"
        icon={<MovieIcon />}
        onClick={() => router.push('/IndianCinema')}
      />
      

    </BottomNavigation>
  )
}
