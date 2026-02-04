import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Post from "../models/post.models.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const deletePost = asyncHandler(async(req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
    
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    
    if (post.author !== req.user._id) {
        throw new ApiError(403, "Not authorized to delete this post")
    }
    
    await Post.findByIdAndDelete(id)
    return res.json(new ApiResponse(200, {}, "Post deleted successfully"))
})

const updatePost = asyncHandler(async(req, res) => {
    const { id } = req.params
    const { title, description, categories } = req.body
    
    const post = await Post.findById(id)
    
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to update this post")
    }
    //post.author is a MongoDB ObjectId, so you need to convert it to string before comparing
    
    post.title = title
    post.description = description
    post.categories = categories
    await post.save()
    
    return res.json(new ApiResponse(200, post, "Post updated successfully"))
})

export { deletePost, updatePost }