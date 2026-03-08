# LeavePortal - Employee Leave Management System

A clean and efficient web application for managing employee leave requests. Employees can apply for leaves, and employers can review and manage them through a simple dashboard.

## ✨ Features

- **Dashboard**: View summary cards for total, pending, approved, and rejected leaves.
- **Apply for Leave**: Simple form for employees to submit leave requests.
- **My Leaves**: Track the status of all your personal leave applications.
- **Manage Requests**: Employers can approve or reject team leave requests instantly.
- **Team List**: View all employees and their total leave history.
- **Secure Access**: Role-based login for Employees and Employers.

## 🚀 Tech Stack

- **Frontend**: Vue.js, Vue Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)

## �️ Installation

### 1. Prerequisite
- Installed [Node.js](https://nodejs.org/)

### 2. Backend Setup
1. Go to the `server` folder.
2. Install dependencies: `npm install`
3. Create a `.env` file and add your `MONGODB_URI` and `JWT_SECRET`.
4. Start the server: `npm run dev`

### 3. Frontend Setup
1. Go to the `client` folder.
2. Install dependencies: `npm install`
3. Start the application: `npm run dev`

### 4. Direct Access
Access the portal at: `http://localhost:5173`

## 🔐 Security
The application uses secure password hashing and token-based authentication to protect user data and ensure proper role permissions.
