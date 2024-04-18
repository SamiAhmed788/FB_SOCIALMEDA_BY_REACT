import express from "express"
import { forgetPasswordController, loginController, logoutController, signupController } from "../conntroller/controller.js"

const authRoute =  express.Router()


authRoute.post("/signup", signupController)
authRoute.post("/login", loginController)
authRoute.post("/logout", logoutController)
authRoute.put("/forgetPassword", forgetPasswordController)
export { authRoute }