
import { Box, Typography, styled } from '@mui/material'

import React from 'react'

const Image = styled(Box)`
    background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x;   //Use this image as the background, shrink it to 55%, center it vertically, and repeat it only left-to-right
    width: 100vw;
    height:50vh;
    display: flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
`

const Heading = styled(Typography)`
    font-size:70px;
    color: #ffffff;
    Line-height: 1;
`

const SubHeading = styled(Typography)`
    font-size:20px;
    background: #FFFFFF
`


export default function Banner() {
  return (
    <Image>
        <Heading>BLOG</Heading>
        <SubHeading>COOLDEEP</SubHeading>
    </Image>
  )
}
