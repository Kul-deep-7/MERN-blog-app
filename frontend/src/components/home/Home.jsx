import React from 'react'
import { Grid , Box} from '@mui/material'
//components
import Banner from '../banner/Banner'
import Categories from './Categories'
import Posts from '../../Post.jsx/Posts'

export default function Home() {
  return (
      <>
     

      <Banner />
      
      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        {/* Left Sidebar */}
        <Grid size={{ xs: 0, sm: 3, lg: 2 }}>
          <Box sx={{ borderRight: '1px solid #e0e0e0', height: '100%' }}>
            <Categories />
          </Box>
        </Grid>

        {/* Right Content */}
        <Grid size={{ xs: 12, sm: 9, lg: 10 }}>
          <Posts />
        </Grid>
      </Grid>
    </>
   
  )
}
