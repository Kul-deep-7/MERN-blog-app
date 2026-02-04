// controller/comment.controller.js
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import Comment from "../models/comment.models.js"

const addComment = asyncHandler(async(req, res) => {
    const { postId, content } = req.body
    const userId = req.user._id

    if (!content || content.trim().length === 0) {
        throw new ApiError(400, "Comment cannot be empty")
    }

    const comment = await Comment.create({
        content,
        author: userId,
        post: postId
    })

    const populatedComment = await comment.populate('author', 'Username Name')

    return res
        .status(201)
        .json(new ApiResponse(201, populatedComment, "Comment added successfully"))
})

const getPostComments = asyncHandler(async(req, res) => {
    const { postId } = req.params

    const comments = await Comment.find({ post: postId })
        .populate('author', 'Username Name _id')
        .sort({ createdAt: -1 })

    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments fetched successfully"))
})

const deleteComment = asyncHandler(async(req, res) => {
    const { commentId } = req.params
    const userId = req.user._id

    const comment = await Comment.findById(commentId)

    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }

    if (comment.author.toString() !== userId.toString()) {
        throw new ApiError(403, "Not authorized to delete this comment")
    }

    await Comment.findByIdAndDelete(commentId)

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Comment deleted successfully"))
})

export { addComment, getPostComments, deleteComment }