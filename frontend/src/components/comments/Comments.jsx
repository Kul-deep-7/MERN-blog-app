import { useState, useEffect, useContext } from 'react'
import { Box, TextField, Button, Typography, CircularProgress, IconButton } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Comments({ postId }) {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([]) //all comments of this post live here
    const [loading, setLoading] = useState(false)
    const [newComment, setNewComment] = useState('') //what user is typing in textbox
    const API_URL = "http://localhost:7000"

    // Fetch comments: When this page opens OR when postId changes, go get comments.
    useEffect(() => {
        fetchComments()
    }, [postId])

    const fetchComments = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${API_URL}/comments/${postId}`, {
                withCredentials: true
            })
            setComments(res.data.data)
        } catch (err) {
            console.error("Error fetching comments:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert('Comment cannot be empty')
            return
        }

        try {
            const res = await axios.post(`${API_URL}/comments`, 
                {
                    postId,
                    content: newComment
                },
                { withCredentials: true }
            )
            setComments([res.data.data, ...comments])
            setNewComment('')
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add comment')
        }
    }

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Delete this comment?')) return

        try {
            await axios.delete(`${API_URL}/comments/${commentId}`, {
                withCredentials: true
            })
            setComments(comments.filter(c => c._id !== commentId)) //Keep comment if its ID is NOT equal to the deleted comment ID
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete comment')
        }
    }

    return (
        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Comments ({comments.length})
            </Typography>

            {/* Add Comment Form */}
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mb: 1 }}
                />
                <Button
                    variant="contained"
                    onClick={handleAddComment}
                    sx={{ backgroundColor: '#FD6415' }}
                >
                    Post Comment
                </Button>
            </Box>

            {/* Comments List */}
            {loading ? (
                <CircularProgress />
            ) : comments.length > 0 ? (
                comments.map((comment) => (
                    <Box key={comment._id} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                    {comment.author?.Username}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                    {comment.content}
                                </Typography>
                            </Box>

                            {/* Delete button - only show if user is comment author */}
                            {user?._id === comment.author?._id && (
                                <IconButton
                                    size="small"
                                    onClick={() => handleDeleteComment(comment._id)}
                                    sx={{ color: 'red' }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography color="textSecondary">No comments yet. Be the first to comment!</Typography>
            )}
        </Box>
    )
}

/* 
Tt like todo app.. but we pass postID props so we know which comment belong to which post

Comments component receives postId, fetches related comments on mount, manages comment state locally, 
allows authenticated users to add comments, and conditionally allows deletion based on ownership while 
keeping UI in sync without refetching.



Scene 1: User opens a post (Detail page)

You are on:
/posts/65fd91c9...

Inside Detail.jsx you render:
<Comments postId={post._id} />

So Comments.jsx wakes up with:
postId = "65fd91c9..."


Scene 2: Component initializes
React runs the function once.

State is born:
comments = []
loading = false
newComment = ""
user = logged-in user (from AuthContext)

Nothing on screen yet.


Scene 3: useEffect runs (IMPORTANT)
useEffect(() => {
    fetchComments()
}, [postId])

This runs because:
component mounted
postId exists


Scene 4: fetchComments() hits backend
GET /comments/:postId

Timeline:
loading = true → spinner ON
backend finds comments for this post
backend sends array of comments
setComments(data)
loading = false
React re-renders.


Scene 5: UI shows comments
Now React renders:
Comment count
Add comment box
List of comments
For EACH comment:
author name
date
content
delete button ONLY if user is owner


Scene 6: User types a comment
onChange → setNewComment(e.target.value)
TextField is controlled:
value lives in React state
input and state always match


Scene 7: User clicks “Post Comment”
handleAddComment()
Flow:
Check empty → block if empty
POST to backend
backend saves comment
backend returns saved comment
frontend adds it to TOP of comments array
input clears
UI updates instantly. No refresh. No refetch.


Scene 8: User deletes a comment
User clicks delete icon (only visible on own comment).
handleDeleteComment(commentId)

Flow:
confirm dialog
DELETE request to backend
backend checks ownership
backend deletes comment
frontend removes it from state
comment disappears from UI
Again: no refetch.


Scene 9: Conditional rendering logic
At any time, UI shows one of these:
loading → spinner
comments exist → list
empty → “be first to comment”
This keeps UI clean and predictable.


Scene 10: Security layers
Frontend
delete icon only for owner
Backend (important)
real authorization check
frontend alone is NOT trusted


Big-picture mental model (remember this)
Detail page
   ↓
Comments gets postId
   ↓
Fetch comments (GET)
   ↓
Store in state
   ↓
Render UI
   ↓
Add comment (POST) → update state
   ↓
Delete comment (DELETE) → update state


*/