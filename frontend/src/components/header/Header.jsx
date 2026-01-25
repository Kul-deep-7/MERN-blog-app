import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import React from 'react'
import axios from "axios";

const Component=styled(AppBar)`
    background-color: #000;
`
const Container = styled(Toolbar)`
    justify-content: center;
    & > a { 
        padding : 20px;
        color: #ffffff;
        text-decoration: none;
    }
`




export default function Header() {

    const API_URL = "http://localhost:7000"


    const handleLogout = async function () {
        await axios.post(`${API_URL}/logout`,{})
    }

  return (
    <Component>
        <Container>
            <Link>HOME</Link>
            <Link>ABOUT</Link>
            <Link>CONTACT</Link>
            <Link>LOGOUT</Link>
        </Container>
    </Component>
  )
}
