import prisma from "./prismaSingleton";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  // Create Users
  const passwordHash1 = await bcrypt.hash("password123", 10);

  const user1 = await prisma.user.create({
    data: {
      email: "sai@example.com",
      password: passwordHash1,
      fullName: "sai kumar",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "anumala@example.com",
      password: passwordHash1,
      fullName: "Anumala Kumar",
    },
  });

  console.log(`Created users: ${user1.fullName}, ${user2.fullName}`);

  // Create Tasks for User1 (sai kumar)
  const task1 = await prisma.task.create({
    data: {
      title: "Complete Project",
      description: "Finish the project proposal by the end of the week.",
      status: "incomplete",
      priority: "high",
      userId: user1.userId,
      dueDate: new Date("2025-05-01T12:00:00Z"),
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: "Prepare Presentation",
      description: "Prepare the slides for the team meeting.",
      status: "incomplete",
      priority: "medium",
      userId: user1.userId,
      dueDate: new Date("2025-04-28T12:00:00Z"),
    },
  });

  console.log(
    `Created tasks for ${user1.fullName}: ${task1.title}, ${task2.title}`
  );

  // Create Tasks for User2 (anumala kumar)
  const task3 = await prisma.task.create({
    data: {
      title: "Write Blog Post",
      description: "Write a blog post about the new features.",
      status: "incomplete",
      priority: "medium",
      userId: user2.userId,
      dueDate: new Date("2025-04-30T12:00:00Z"),
    },
  });

  const task4 = await prisma.task.create({
    data: {
      title: "Review Code",
      description: "Review the pull requests from the team.",
      status: "incomplete",
      priority: "low",
      userId: user2.userId,
      dueDate: new Date("2025-05-02T12:00:00Z"),
    },
  });

  console.log(
    `Created tasks for ${user2.fullName}: ${task3.title}, ${task4.title}`
  );

  console.log("Database seeding completed!");
}

// Run the seed function
main();
// .catch((e) => {
//   console.error(e);
//   process.exit(1);
// })
// .finally(async () => {
//   await prisma.$disconnect();
// });
