import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Container, CircularProgress } from '@mui/material'

export default function Detail() {
    const { id } = useParams()  
    //useParams is a React Router hook that lets a component read dynamic values from the URL.
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_URL = "http://localhost:7000"

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                console.log("Post detail:", response.data.data)
                setPost(response.data.data)
            } catch (err) {
                console.error("Error:", err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [id])//“Run this effect when the component mounts,and again whenever id changes

    if (loading) return <CircularProgress />
    if (error) return <Typography color="error">Error: {error}</Typography>
    if (!post) return <Typography>Post not found</Typography>

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <img 
                    src={post.picture} 
                    alt={post.title}
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
                />
            </Box>

            <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 1 }}>
                {post.categories}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                {post.title}
            </Typography>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                By {post.author?.Username} • {new Date(post.createdAt).toLocaleDateString()}
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {post.description}
            </Typography>
        </Container>
    )
}

/* 
urpose:
Read the URL so you can decide what to render or fetch
<Route path="/details/:id" element={<Detail />} />

const { id } = useParams();

What you do with it:
call an API
show a specific post
update UI

Frontend params are about navigation + UI


Backend: req.params (Express)

Purpose:
Read the URL so you can decide what data to return or modify

const getPostById = asyncHandler(async(req,res)=>{
    const { id } = req.params
    
    const post = await Post.findById(id).populate('author')
    ...

router.route("/posts/:id").get(verifyJWT, getPostById)

What you do with it:
query MongoDB
update/delete a record
send JSON

Backend params are about data + logic.
*/