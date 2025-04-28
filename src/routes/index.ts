import { Router } from "express";
import taskRouter from "./taskRouter";
import userRouter from "./userRouter";
const router = Router();

router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;
