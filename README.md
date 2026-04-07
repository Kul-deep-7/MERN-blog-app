# Blog Application

## Overview
A full stack MERN application where users can write, 
read and comment on blogs without admin permission.

## Tech Stack
- Frontend: React.js
- Backend: Node.js + Express.js  
- Database: MongoDB + Mongoose
- Authentication: JWT (Access + Refresh tokens)
- Media Storage: Cloudinary
- Deployment: Render

## Features
- JWT authentication with protected routes
- Image upload via Cloudinary
- Comment system
- Author profiles
- Responsive design

## Challenges & Solutions
- **JWT on frontend** — Had to learn how to store tokens 
  securely and send them with every protected request
  via Authorization headers

## What I learned
- How JWT auth flow works end to end
- Integrating third party APIs (Cloudinary)
- Protected route middleware in Express
