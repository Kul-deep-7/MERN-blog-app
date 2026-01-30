import axios from 'axios'
import { useEffect, useState } from 'react'
import {Box, Grid, Typography} from '@mui/material'

import Post from './Post'

export default function Posts() {

const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_URL = "http://localhost:7000"

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`${API_URL}/posts`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                console.log("Posts:", response.data.data)
                setPosts(response.data.data)
            } catch (err) {
                console.error("Error:", err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <Typography>Loading...</Typography>
    if (error) return <Typography color="error">Error: {error}</Typography>
  return (
    <>
        {/* In JavaScript: A && B means:
            “If A is truthy, then return B.
            If A is falsy, stop and return A.”
            here  posts are undefined but are [] or [{},{}] it will move to next condition which is posts.length > 0 if greater than 0 then map will run otherwise it wont.
            */}
            <Grid container spacing={2}>
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <Grid
                        key={post._id || post.id}
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <Post post={post} />
                    </Grid>
                ))
            ) : (
                <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    No data available
                </Box>
            )}
        </Grid>
    </>
  )
}
