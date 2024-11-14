import express from "express";
import {
  authMiddleware,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();

// Whenever it will call this route from frontend it Will call the userRegister Controller
router.post("/signup", registerUser);

// Whenever it will call this route from frontend it Will call the userLogin Controller
router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

export default router; // Use export default
