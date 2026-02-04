
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Typography } from '@mui/material'

export default function Delete() {
    const { id } = useParams()
    const navigate = useNavigate()
    const API_URL = "http://localhost:7000"
    
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`${API_URL}/posts/${id}`, {
                    withCredentials: true  
                })
                alert('Post deleted!')
                navigate('/')
            } catch (err) {
                console.error("Delete error:", err)
                alert(err.response?.data?.message || 'Failed to delete')
                navigate(`/details/${id}`)  
            }
        } else {
            navigate(`/detail/${id}`) 
        }
    }

    useEffect(() => {
        handleDelete()
    }, [id])

    return <Typography>Deleting...</Typography>
}