import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken,changeCurrentPassword, updateAccountDetails,updateUserAvatar,updateUserCoverImage,getCurrentUser} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js"


const router=Router()

router.route("/register").post(
  upload.fields([
{
  name:"avatar",
  maxCount:1
},{
  name:"coverImage",
   maxCount:1

}
  ]),
  registerUser
)

router.route("/login").post(loginUser)
router.route("/get-user").post(getCurrentUser)
// secured routes

router.route("/logout").post(verifyJWT ,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

// update routes
router.route("/change-password").post(changeCurrentPassword)
router.route("/update-details").post(updateAccountDetails)
router.route("/change-avatar").post(updateUserAvatar)
router.route("/change-coverImage").post(updateUserCoverImage)
export { router}