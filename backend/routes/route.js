import {Router} from "express"
import { getMe, loginUser, logoutUser, signupUser, } from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { createPost } from "../controller/image.controller.js"

const router = Router()

router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)

//protected route
router.route("/me").get(verifyJWT, getMe)
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/file/upload").post(upload, createPost )

export default router