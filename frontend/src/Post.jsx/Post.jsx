import { Box, Typography, styled } from '@mui/material'
import React from 'react'

const Container = styled(Box)({
    border: '1px solid #d3cede',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'boxShadow 0.3s',
    '&:hover': {
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
    }
})

const Image = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'cover'
})

const TextContainer = styled(Box)({
    padding: '12px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    justifyContent: 'flex-start',
    width: '100%',
    overflow: 'hidden'
})

export default function Post({ post }) {
    return (
        <Container>
            <Image src={post.picture} alt={post.title} />
            <TextContainer>
                <Typography variant="caption" color="textSecondary">
                    {post.categories}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 0.5, mb: 0.5 }}>
                    {post.title}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5 }}>
                    By {post.Username}
                </Typography>
                <Typography 
                    variant="caption" 
                    sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {post.description}
                </Typography>
            </TextContainer>
        </Container>
    )
}