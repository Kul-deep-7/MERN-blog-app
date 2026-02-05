import axios from 'axios'
import { useEffect, useState } from 'react'
import {Box, Grid, Typography} from '@mui/material'
import { useSearchParams , Link} from 'react-router-dom'

import Post from './Post'

export default function Posts() {

const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchParams] = useSearchParams()
    const urlcategory = searchParams.get('categ')//From the URL, give me the value of categ. 
    // So if the URL is: /?categ=Sports. Then categ === "Sports". If the URL is "/" category === null
    //what get() does is “From the URL, give me the value whose key is category.”

    const API_URL = "https://mern-blog-app-ef2s.onrender.com"

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`${API_URL}/posts`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                //console.log("Posts:", response.data.data)
                
                 let allPosts = response.data.data
                 const filtered = urlcategory
                ? allPosts.filter(cooldeep => cooldeep.categories === urlcategory)
                : allPosts

                /* 
                    let allPosts = response.data.data
                    let filtered

                    if (urlcategory) {
                    filtered = allPosts.filter(post => post.categories === urlcategory)
                    } else {
                    filtered = allPosts
                    } 
                */

                setPosts(filtered)
            } catch (err) {
                console.error("Error:", err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [urlcategory])

    /* 
    Page loads (urlcategory = null)
    useEffect runs → fetches all posts

    User clicks "Music" category (URL changes to /?categ=Music)
    urlcategory becomes "Music"
    React detects change → useEffect runs again
    fetchData() runs → filters to only Music posts

    User clicks "Tech" category (URL changes to /?categ=Tech)
    urlcategory becomes "Tech"
    React detects change → useEffect runs again
    fetchData() runs → filters to only Tech posts

    Without dependency array:
    useEffect(() => {
        fetchData()
    })  // ❌ Runs on EVERY render (infinite loop!)
   
    With empty dependency array:
    useEffect(() => {
        fetchData()
    }, [])  // ✅ Runs only ONCE on mount (never updates when category changes)
    
    With [urlcategory]:
    useEffect(() => {
        fetchData()
    }, [urlcategory])  // ✅ Run when the component loads & Runs when urlcategory changes
    So dependency array = "Watch these variables, and if they change, re-run this effect" 🎯
    */


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
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        component={Link} to={`/details/${post._id}`} // Linking to Detail page of that post & passing post id in URL
                        sx={{ 
                            textDecoration: "none"}}
                        >
                                <Post post={post} />
                    </Grid>
                ))
            ) : (
                <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    No data available. Please select a different category to write a post or check back later.
                </Box>
            )}
        </Grid>
    </>
  )
}
