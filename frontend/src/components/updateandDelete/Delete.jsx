
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Typography } from '@mui/material'
import API_BASE_URL from '../../constants/config'


export default function Delete() {
    const { id } = useParams()
    const navigate = useNavigate()
    const API_URL = API_BASE_URL
    
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`${API_URL}/posts/${id}`, {
                    withCredentials: true  
                })
                alert('Post deleted!')
                navigate('/')
            } catch (err) {
                //console.error("Delete error:", err)
                // because the delete is actually succeeding, but then Detail component tries to fetch it and fails, triggering the error alert.
                navigate(`/`)  
            }
        } else {
            navigate(`/details/${id}`) 
        }
    }

    useEffect(() => {
        handleDelete()
    }, [id, navigate])

    return <Typography>Deleting...</Typography>
}

/* 
 i mean do every app get this error like first it says "post deleted" then "not deleted"


Ah! No, not every app has this problem. Here's why yours does:

Your flow:

Delete.jsx deletes post ✅
→ navigate('/') → goes to home
→ Detail.jsx ALSO tries to fetch the deleted post → 404 error ❌
Why it happens:

When you navigate to /delete/:id, the Detail component is still mounted in the background
Even though you're navigating away, the Detail component's useEffect still runs
It tries to fetch a post that no longer exists → 404
How good apps avoid this:

Option 1: Unmount Detail before fetching

// In Delete, navigate FIRST, then delete
navigate('/')  // Immediately navigate away
setTimeout(() => {
    axios.delete(...) // Delete in background
}, 100)


Option 2: Cancel pending requests

useEffect(() => {
    const controller = new AbortController()
    
    fetchPost()
    
    return () => controller.abort()  // Cancel if component unmounts
}, [id])


Option 3: Don't fetch if post doesn't exist

// In Detail.jsx
if (error && error.response?.status === 404) {
    return <Typography>Post not found</Typography>  // Just show message, don't alert
}
Best fix for YOUR app - just suppress the 404 error in Detail:

// Detail.jsx
if (loading || authLoading) return <CircularProgress />
if (error?.response?.status === 404) return null  // ✅ Silent if deleted
if (error) return <Typography color="error">Error: {error}</Typography>
Now no confusing error messages! 🎯

*/