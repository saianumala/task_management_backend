import { Router } from "express";
import taskRouter from "./taskRouter";
import userRouter from "./userRouter";
const router = Router();

// Routes the requests to the appropriate router
// This is the main router that will be used in the app.ts file
router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;
