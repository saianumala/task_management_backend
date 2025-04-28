import { z } from "zod";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export const taskSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  status: z.enum(["complete", "incomplete"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
});

export const userSchema = z.object({
  fullName: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
