const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const tokenGenerator = require("../utils/tokenGenerator");
const verifyTokenGenerator = require("../utils/verifyTokenGenerator")
const {
  sendVerificationEmail,
  sendWelcomeEmail,
  passwordResetRequest,
  resetPasswordSuccess,
} = require("../email/emails");
const crypto = require("crypto");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = verifyTokenGenerator();

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hour
    });

    tokenGenerator(res, newUser._id);

    sendVerificationEmail(`vinoddonur6@gmail.com`, verificationToken);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyEmailController = async (req, res) => {
  const { verificationCode } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail("vinoddonur6@gmail.com", user.name);

    res.status(200).json({ message: "WelcomeEmail sent successfully " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send verificationEmail" });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logging out is failed" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    tokenGenerator(res, user._id);
    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User of given email not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    //email sending logic
    await passwordResetRequest(
      "vinoddonur6@gmail.com",
      process.env.CLIENT_URL + `/api/auth/resetPassword/${resetToken}`
    );
    res.status(200).json({ message: "Password reset link sent to your email",user:user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send password reset link" });
  }
};

const setNewPasswordController = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  try {
    const user = await User.findOne({ resetPasswordToken: resetToken });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    //email sending logic
    await resetPasswordSuccess("vinoddonur6@gmail.com");
    res.status(200).json({ message: "Password reset was successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

const checkAuthController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check authentication" });
  }
};

module.exports = {
  signupController,
  verifyEmailController,
  logoutController,
  loginController,
  forgotPasswordController,
  setNewPasswordController,
  checkAuthController,
};
