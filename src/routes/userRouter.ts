import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  login,
  loginCheck,
  logout,
  updateUser,
  // getUserAnalytics,
} from "../controllers/userController";
import { userAuthorization } from "../midddleware/userAuth";

const router = Router();

router.get("/", getUser);
router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", userAuthorization, logout);
router.patch("/update", userAuthorization, updateUser);
router.delete("/delete", userAuthorization, deleteUser);
router.get("/isLoggedIn", userAuthorization, loginCheck);

export default router;
