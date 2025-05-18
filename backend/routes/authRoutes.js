const express = require("express");
const router = express.Router();
const {
  signupController,
  verifyEmailController,
  resendVerificationCodeController,
  logoutController,
  loginController,
  forgotPasswordController,
  setNewPasswordController,
  checkAuthController,
} = require("../controllers/authControllers.js");
const { verifyToken } = require("../middleware/verifyToken.js");

router.get("/checkAuth", verifyToken, checkAuthController);
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/verifyemail", verifyEmailController);
router.post("/resendVerificationCode",verifyToken, resendVerificationCodeController);
router.post("/forgotPassword", forgotPasswordController);
router.post("/resetPassword/:resetToken", setNewPasswordController);

module.exports = router;
