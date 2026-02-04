import { Box, Typography, styled } from '@mui/material'
import React from 'react'

const Image = styled(Box)`
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
    center / 55% repeat-x;
  width: 100vw;
  height: 50vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  animation: fadeZoom 1.2s ease-out forwards;

  @keyframes fadeZoom {
    from {
      opacity: 0;
      transform: scale(1.05);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Heading = styled(Typography)`
  font-size: 70px;
  color: #ffffff;
  line-height: 1;
  letter-spacing: 4px;

  animation: slideDown 1s ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #ffffff;
  padding: 4px 12px;
  margin-top: 10px;
  border-radius: 4px;

  animation: fadeUp 1s ease-out forwards;
  animation-delay: 0.7s;
  opacity: 0;

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export default function Banner() {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>by KuLDEEP</SubHeading>
    </Image>
  )
}
