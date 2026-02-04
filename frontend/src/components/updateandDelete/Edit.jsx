import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Container, TextField, TextareaAutosize, Button } from '@mui/material'

const initialValue = {
    title: "",
    description: ""
}

export default function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(initialValue)  // ✅ Now it exists
    const API_URL = "https://mern-blog-app-ef2s.onrender.com"

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts/${id}`, {
                    withCredentials: true
                })
                setPost(response.data.data)
            } catch (err) {
                console.error("Error:", err)
            }
        }
        fetchPost()
    }, [id])

    const onChangeValue = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        if (!post.title || !post.description) {
            alert('All fields required')
            return
        }

        try {
            await axios.put(`${API_URL}/posts/${id}`, post, {
                withCredentials: true
            })
            alert('Post updated!')
            navigate(`/details/${id}`)
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update')
        }
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <TextField 
                value={post.title} 
                name='title' 
                onChange={onChangeValue}
                fullWidth
                label="Title"
            />
            <TextareaAutosize 
                value={post.description} 
                name='description'
                onChange={onChangeValue}
                minRows={6}
                style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            />
            <Button onClick={handleSave} variant="contained">
                Save
            </Button>
        </Container>
    )
}