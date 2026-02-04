import {Router} from "express"
import { getMe, loginUser, logoutUser, signupUser, } from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { upload  } from "../middleware/multer.middleware.js"
import { createPost, getAllPosts, getPostById } from "../controller/image.controller.js"
import { deletePost, updatePost } from "../controller/update.controller.js"
import { addComment, getPostComments, deleteComment } from "../controller/comment.controller.js"

const router = Router()

router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)

//protected route
router.route("/me").get(verifyJWT, getMe)
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/create").post(upload.single("picture"),verifyJWT,createPost )
router.route("/posts").get(verifyJWT, getAllPosts)
router.route("/posts/:id").get(verifyJWT, getPostById)
router.route('/posts/:id').delete(verifyJWT, deletePost)
router.route('/posts/:id').put(verifyJWT, updatePost)
router.route('/comments').post(verifyJWT,addComment)
router.route('/comments/:postId').get(verifyJWT, getPostComments)
router.route('/comments/:commentId').put(verifyJWT, deleteComment)


export default router

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