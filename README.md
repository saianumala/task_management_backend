# Task Management Application Setup Guide

This guide will help you set up the complete Task Management application locally, which consists of two repositories:

- Frontend: Vite React with Tailwind CSS
- Backend: Node.js with Express.js

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Technical Choices and Architecture

### Frontend

- **React with Vite**: Chosen for its faster development experience and optimized build process compared to Create React App
- **Tailwind CSS**: Used for utility-first styling that speeds up the UI development process
- **Component Architecture**: Organized with a modular component structure to promote reusability
- **Context API**: Implemented for state management across the application
- **React Router**: Used for client-side routing and navigation

### Backend

- **Node.js with Express**: Selected for building a scalable and efficient RESTful API
- **TypeScript**: Implemented for type safety and better developer experience
- **Prisma ORM**: Used for database access with type-safe queries and migrations
- **PostgreSQL**: Chosen as the relational database for its robustness and feature set
- **JWT Authentication**: Implemented for secure user authentication
- **Zod**: Used for request validation
- **CORS and Cookie Parser**: Added for cross-origin requests and cookie management
- **RESTful API Structure**: Follows REST principles with organized controllers and routes

### Architecture Overview

The application follows a client-server architecture:

- **Client**: React SPA that communicates with the backend API
- **Server**: Express.js API that handles business logic and database operations
- **Database**: PostgreSQL database managed through Prisma ORM

## Database Schema Description

The database is designed around the following main entities:

### User

Represents an application user who can create and manage tasks:

- `userId`: Unique identifier (UUID)
- `email`: User's email address (unique)
- `password`: Hashed password
- `fullName`: User's full name
- `createdAt`: Timestamp of account creation
- `updatedAt`: Timestamp of last update
- `tasks`: relation with task model

### Task

Represents a task within the system:

- `id`: Unique identifier (UUID)
- `title`: Task title
- `description`: Detailed description
- `status`: Current status (e.g., incomplete and complete)
- `priority`: Task priority (e.g., LOW, MEDIUM, HIGH)
- `dueDate`: Deadline for the task
- `userId`: ID of the user who created the task
- `createdAt`: Timestamp of task creation
- `updatedAt`: Timestamp of last update

## Setup Process

### Step 1: Create a Project Directory

```bash
mkdir task_management_app
cd task_management_app
```

### Step 2: Clone the Frontend Repository

```bash
git clone https://github.com/saianumala/task_management_frontend.git
cd task_management_frontend
```

### Step 3: Install Frontend Dependencies

```bash
npm install
# or if using Yarn
yarn install
```

### Step 4: Configure Frontend Environment

Create a `.env` file in the frontend directory:

```bash
# Example .env file for frontend
touch .env
cp .env.example .env
```

### Step 5: Clone the Backend Repository

Open a new terminal window, navigate to your project directory, and clone the backend repository:

```bash
# If you created a project directory in Step 1
cd ..
# or go to where you want to clone the backend

git clone https://github.com/saianumala/task_management_backend.git
cd task_management_backend
```

### Step 6: Install Backend Dependencies

```bash
npm install
# or if using Yarn
yarn install
```

### Step 7: Configure Backend Environment

Create a `.env` file in the backend directory:

```bash
# Example .env file for backend
touch .env
cp .env.example .env

# Add any other environment variables required by your backend
```

### Step 8: Set Up the Database

#### Initialize Prisma

```bash
# Generate Prisma client based on your schema
  npx prisma generate
```

#### Run Migrations

```bash
#  Apply migrations to set up your database schema
npx prisma migrate dev
```

### Step 9: Seed the Database with Sample Data

The project includes a seed script that populates your database with sample data:

```bash
  npx prisma db seed
```

This will execute the src/seed.ts file, which creates sample users, tasks, and other necessary data for testing and development.

### Step 10: Start the Backend Server

```bash
npm run dev
# or
yarn dev
# or depending on your package.json scripts
npm start
```

The backend server should now be running on http://localhost:3000 (or the port you specified).

### Step 11: Start the Frontend Development Server

Open a new terminal window, navigate to the frontend directory:

```bash
cd ../task_management_frontend
# or navigate to the frontend directory if your file structure is different

npm run dev
# or
yarn dev
```

The frontend should now be running on http://localhost:5173 (the default Vite port).

## Accessing the Application

Once both servers are running:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

## Additional Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
