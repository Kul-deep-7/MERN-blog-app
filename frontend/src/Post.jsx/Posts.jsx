import axios from 'axios'
import { useEffect, useState } from 'react'
import {Box} from '@mui/material'

export default function Post() {

    const[posts, setPosts] = useState([])

    const API_URL = "http://localhost:7000"

    useEffect(()=>{
        const fetchData = async() =>{
            let response = await axios.get(`${API_URL}/posts`, {
                headers:{
                'Content-Type': 'application/json'
            },
            withCredentials: true
            })
            
            setPosts(response.data.data)
               
        }
        fetchData()
},[])
  return (
    <>
        { /* In JavaScript: A && B means:
            “If A is truthy, then return B.
            If A is falsy, stop and return A.”
            here  posts are undefined but are [] or [{},{}] it will move to next condition which is posts.length > 0 if greater than 0 then map will run otherwise it wont.
            */
            posts && posts.length > 0 ? posts.map(post => {

            }) : <Box style={{color: '#878787', margin : '30px 80px', fontSize: 18}}>No data available </Box>
        }
    </>
  )
}
