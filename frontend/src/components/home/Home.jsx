import React from 'react'
import { Grid, Box } from '@mui/material'
import { styled } from '@mui/system'

// components
import Banner from '../banner/Banner'
import Categories from './Categories'
import Posts from '../Post.jsx/Posts'

// Left sidebar animation
const Sidebar = styled(Box)`
  height: 100%;
  border-right: 1px solid #e0e0e0;

  animation: slideInLeft 0.8s ease-out forwards;

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

// Right content animation
const Content = styled(Box)`
  animation: fadeUp 0.9s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(25px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export default function Home() {
  return (
    <>
      <Banner />

      <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
        
        {/* Left Sidebar */}
        <Grid size={{ xs: 3, sm: 3, lg: 2 }}>
          <Sidebar>
            <Categories />
          </Sidebar>
        </Grid>

        {/* Right Content */}
        <Grid size={{ xs: 9, sm: 9, lg: 10 }}>
          <Content>
            <Posts />
          </Content>
        </Grid>

      </Grid>
    </>
  )
}
