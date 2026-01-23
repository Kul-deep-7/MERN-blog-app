import {Router} from "express"
import { loginUser, logoutUser, signupUser } from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

router.route("/signup").post(signupUser)
router.route("/login").post(loginUser)

//protected route
router.route("/logout").post(verifyJWT , logoutUser)

export default router