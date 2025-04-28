# Task Management Application Setup Guide

This guide will help you set up the complete Task Management application locally, which consists of two repositories:

- Frontend: Vite React with Tailwind CSS
- Backend: Node.js with Express.js

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

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
