import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link , useNavigate} from "react-router-dom";
import React from 'react'
import axios from "axios";
import API_BASE_URL from '../../config'



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
    const navigate = useNavigate()
    const API_URL = API_BASE_URL


const handleLogout = async function (e) {
    e.preventDefault()

/* // WITHOUT e.preventDefault() <a href="#" onClick={handleLogout}>LOGOUT</a>
// What happens:
// 1. onClick fires → handleLogout() starts (async)
// 2. Browser doesn't wait → immediately navigates to href="#"
// 3. Logout request might not complete before page changes
// 4. User sees broken behavior

// WITH e.preventDefault() <a href="#" onClick={handleLogout}>LOGOUT</a>
// What happens:
// 1. onClick fires → handleLogout() starts
// 2. e.preventDefault() stops the default link behavior
// 3. Logout completes → THEN navigate('/login')
// 4. Clean logout flow

 */   
    try {
        // console.log("Attempting logout...")
         //console.log("Current cookies:", document.cookie) to check if cookies are visible in console log which they should not be
            
        const response = await axios.post(`${API_URL}/logout`, {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("Logout response:", response.data)
        navigate("/login")
    } catch (error) {
        console.error('Logout error:', error.response?.data || error.message)
        
    }
}


  return (
    <Component>
        <Container>
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/login" onClick={handleLogout}>LOGOUT</Link>
        </Container>
    </Component>
  )
}
