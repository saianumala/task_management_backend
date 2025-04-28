import { Router } from "express";
import { userAuthorization } from "../midddleware/userAuth";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/taskController";

const router = Router();

router.post("/create", userAuthorization, createTask);
router.patch("/update", userAuthorization, updateTask);
router.delete("/delete/:taskId", userAuthorization, deleteTask);
router.get("/task/:taskid", userAuthorization, getTaskById);
router.get("/allTasks/:filter", userAuthorization, getAllTasks);
export default router;
