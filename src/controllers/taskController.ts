import { Request, Response } from "express";
import { taskSchema } from "../types/taskTypes";
import { z } from "zod";
import prisma from "../prismaSingleton";

// Update the task schema to include the id field
// and make all other fields optional
export const updateTaskSchema = taskSchema.partial().extend({
  id: z.string(),
});

// Task creation
export async function createTask(req: Request, res: Response) {
  try {
    console.log("result", req.body);
    const result = taskSchema.parse(req.body);
    if (!result) {
      res.status(400).json({
        message: "all fields are required",
        error: result,
        status: 400,
      });
      return;
    }
    console.log("result", result);
    const { title, description, priority, dueDate } = result;
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.userId,
        priority,
        dueDate,
      },
    });
    res.status(200).json(newTask);
    return;
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Failed to create task" });
    return;
  }
}

// Get all tasks with filter
export async function getAllTasks(req: Request, res: Response) {
  try {
    console.log("reaching get all tasks", req.query);
    const { filter } = req.params;

    let tasks;
    if (filter === "all") {
      tasks = await prisma.task.findMany({
        where: {
          userId: req.user.userId,
        },
      });
    } else {
      tasks = await prisma.task.findMany({
        where: {
          userId: req.user.userId,
          status: filter === "active" ? "incomplete" : "complete",
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }
    res.status(200).json(tasks);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
    return;
  }
}
// Get task by ID
export async function getTaskById(req: Request, res: Response) {
  try {
    const taskId = req.params.taskId;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(task);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
    return;
  }
}
// Update task
export async function updateTask(req: Request, res: Response) {
  try {
    const result = updateTaskSchema.parse(req.body);
    if (!result) {
      res.status(400).json({
        message: "all fields are required",
        error: result,
        status: 400,
      });
      return;
    }
    const { id, title, description, priority, status, dueDate } = result;
    console.log("result", result);
    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        priority: priority,
        status: status,
        dueDate: dueDate,
      },
    });
    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
    return;
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Failed to update task" });
    return;
  }
}
// Delete task
export async function deleteTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      res.status(400).json({ message: "Task ID is required" });
      return;
    }
    // Check if the task exists
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    res.status(200).json({ message: "Task deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
    return;
  }
}
