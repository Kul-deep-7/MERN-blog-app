import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Container, CircularProgress } from '@mui/material'
import {Edit, Delete } from '@mui/icons-material';

import {AuthContext} from '../../context/AuthContext'
import Comments from '../comments/Comments';

export default function Detail() {
    const { id } = useParams()  
    //useParams is a React Router hook that lets a component read dynamic values from the URL.
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {user , loading: authLoading} = useContext(AuthContext)
    const [isAuthor, setIsAuthor] = useState(false)  

    const API_URL = "https://mern-blog-app-ef2s.onrender.com"

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                //console.log("Post detail:", response.data.data)
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


    useEffect(() => {
        if (user && post) {
            const isAuthorCheck = user._id === post.author?._id
            setIsAuthor(isAuthorCheck)
            console.log("User:", user._id)
            console.log("Author:", post.author?._id)
            console.log("Is Author:", isAuthorCheck)
        }
    }, [user, post])  

    if (loading) return <CircularProgress />
    if (error) return <Typography color="error">Error: {error}</Typography>
    if (!post) return <Typography>Post not found</Typography>
    if (loading || authLoading) return <CircularProgress />

    // Check if logged-in user is the post author. (got user from AuthContext)
    //const isAuthor = user?._id === post.author?._id
    // console.log("Author check:", isAuthor)
    // console.log("User:", user)
    // console.log("Post author:", post.author)
    // console.log("User ID:", user?._id)
    // console.log("Author ID:", post.author?._id)
    // console.log("Are they equal?:", user?._id === post.author?._id)


    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
                <img 
                    src={post.picture} 
                    alt={post.title}
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
                />
            </Box>
            
{/* if it is Author then true & move forward. If not an Author dont move forward */}
           {isAuthor && ( 
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Link to={`/edit/${id}`} style={{ textDecoration: 'none' }}>
                    <Edit sx={{
                        padding: '8px',
                        border: '1px solid #878787',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: 'blue',
                        '&:hover': { backgroundColor: '#e3f2fd' }
                    }}/>
                </Link>
                <Link to={`/delete/${id}`} style={{ textDecoration: 'none' }}>
                    <Delete sx={{
                        padding: '8px',
                        border: '1px solid #878787',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: 'red',
                        '&:hover': { backgroundColor: '#ffebee' }
                    }}/>
                </Link>
            </Box>
        )}

        
        <Box sx={{ maxWidth: '100%' }}>
            <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 1 }}>
                {post.categories}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, wordWrap: 'break-word', overflowWrap: 'break-word'}}>
                {post.title}
            </Typography>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                By {post.author?.Username} • {new Date(post.createdAt).toLocaleString()}
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.8 ,wordWrap: 'break-word', overflowWrap: 'break-word'}}>
                {post.description}
            </Typography>
        </Box>

        <Comments postId={id} /> {/*postId is passed as a prop because the Comments component needs to know which post's comments to fetch.
        We pass postID props so we know which comment belong to which post
*/}
        </Container>
    )
}

/* 

Purpose:
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