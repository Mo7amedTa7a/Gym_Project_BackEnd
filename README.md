# 🏋️‍♂️ Gym Management System — Backend RESTful API

A standalone, robust RESTful backend API designed to handle day-to-day operations for a modern Gym Management System. Built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**, featuring **JWT-based authentication**, **Role-Based Access Control (RBAC)**, and centralized error handling.

---

## 🛠️ Tech Stack & Dependencies

- **Runtime Environment:** Node.js (v18+)
- **Framework:** Express.js (`express`)
- **Database & ODM:** MongoDB, Mongoose (`mongoose`)
- **Authentication & Security:** 
  - JSON Web Tokens (`jsonwebtoken`)
  - Password Hashing (`bcryptjs`)
  - HTTP Security Headers (`helmet`)
  - Cross-Origin Resource Sharing (`cors`)
  - Rate Limiting (`express-rate-limit`)
  - Environment Management (`dotenv`)
- **Development Tooling:** Nodemon (`nodemon`)

---

## 📂 Project Structure

```text
Gym_Project_BackEnd/
├── src/
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js        # Authentication & password management handlers
│   │   ├── memberController.js      # Member CRUD and search/filter handlers
│   │   ├── trainerController.js     # Trainer CRUD & coach management handlers
│   │   ├── planController.js        # Gym plan package handlers
│   │   ├── subscriptionController.js  # Member subscription lifecycle handlers
│   │   ├── attendanceController.js  # Check-in / check-out attendance handlers
│   │   └── dashboardController.js   # Analytics & system statistics handlers
│   ├── models/
│   │   ├── User.js                  # System User model (Admin, Staff, Trainer)
│   │   ├── Member.js                # Gym Customer/Member model
│   │   ├── Trainer.js               # Coach profile model
│   │   ├── Plan.js                  # Membership package plan model
│   │   ├── Subscription.js          # Active/Expired subscription model
│   │   ├── Attendance.js            # Member check-in/out records model
│   │   └── Notification.js          # System notifications model (Future expansion)
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth routes
│   │   ├── memberRoutes.js          # /api/members routes
│   │   ├── trainerRoutes.js         # /api/trainers routes
│   │   ├── planRoutes.js            # /api/plans routes
│   │   ├── subscriptionRoutes.js    # /api/subscriptions routes
│   │   ├── attendanceRoutes.js      # /api/attendance routes
│   │   └── dashboardRoutes.js       # /api/dashboard routes
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification middleware
│   │   ├── roleMiddleware.js        # Role-based authorization middleware
│   │   └── errorMiddleware.js       # Global error handler middleware
│   ├── utils/
│   │   ├── AppError.js              # Custom Error handling class
│   │   └── asyncHandler.js          # Async wrapper utility for error catching
│   └── app.js                       # Express app setup & middleware configuration
├── .env                             # Local environment variables (git-ignored)
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── Gym_Management_System_Backend_Documentation.pdf # Full PDF Specification
├── package.json                     # Node.js dependencies & scripts
├── README.md                        # Project documentation & guide
└── server.js                        # Root entry point to start server
```

---

## 👥 System Roles & Permission Matrix

| Feature | Admin | Staff | Trainer |
| :--- | :---: | :---: | :---: |
| **Authentication & Users** | Full Access | - | - |
| **Members Management** | Full Access | Create / Read / Update | Assigned Members Only |
| **Trainers Management** | Full Access | Read | Own Profile Only |
| **Plans Management** | Full Access | Read | - |
| **Subscriptions** | Full Access | Create / Read / Update | Read |
| **Attendance** | Full Access | Full Access | Limited |
| **Dashboard Statistics** | Full Access | Limited | - |

---

## 🔗 Key API Endpoints Summary

### 🔑 Authentication (`/api/auth`)
- `POST /api/auth/register` — Register system user (Admin/Staff/Trainer)
- `POST /api/auth/login` — User login & JWT issuance
- `POST /api/auth/logout` — Logout user
- `GET /api/auth/me` — Get current logged-in user profile
- `PATCH /api/auth/change-password` — Change current user password
- `POST /api/auth/forgot-password` — Request password reset
- `POST /api/auth/reset-password` — Reset password using token

### 👤 Members (`/api/members`)
- `POST /api/members` — Create new gym member
- `GET /api/members` — List members (supports pagination, search, status filter)
- `GET /api/members/:id` — Get single member details
- `PATCH /api/members/:id` — Update member info
- `DELETE /api/members/:id` — Soft-delete / deactivate member

### 🏋️ Trainers (`/api/trainers`)
- `POST /api/trainers` — Add new coach/trainer
- `GET /api/trainers` — List trainers
- `GET /api/trainers/:id` — Get trainer details
- `PATCH /api/trainers/:id` — Update trainer profile
- `DELETE /api/trainers/:id` — Deactivate trainer

### 💳 Plans (`/api/plans`)
- `POST /api/plans` — Create membership plan package
- `GET /api/plans` — List available plans
- `GET /api/plans/:id` — Get plan details
- `PATCH /api/plans/:id` — Update plan
- `DELETE /api/plans/:id` — Deactivate plan

### 📋 Subscriptions (`/api/subscriptions`)
- `POST /api/subscriptions` — Assign plan subscription to member
- `GET /api/subscriptions` — Get subscriptions list
- `GET /api/subscriptions/:id` — Get subscription details
- `PATCH /api/subscriptions/:id` — Update subscription
- `PATCH /api/subscriptions/:id/cancel` — Cancel active subscription

### 🕒 Attendance (`/api/attendance`)
- `POST /api/attendance/check-in` — Record member check-in (requires active subscription)
- `PATCH /api/attendance/:id/check-out` — Record member check-out
- `GET /api/attendance/member/:memberId` — Get attendance history for member
- `GET /api/attendance` — Get overall attendance records

### 📊 Dashboard (`/api/dashboard`)
- `GET /api/dashboard/stats` — Get real-time gym stats (Total Members, Active/Expired Members, Active Subscriptions, Trainers Count, Today's Attendance)

---

## ⚙️ Setup & Installation Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- [Git](https://git-scm.com/)

### 2. Environment Variables Setup
Create a `.env` file in the project root directory (you can copy `.env.example`):

```bash
cp .env.example .env
```

Define your environment variables:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/gym_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Running the Project

**Development Mode (with Nodemon hot-reloading):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

---

## 🚀 GitHub Push Instructions

To push this repository to GitHub:

1. **Initialize Git Repository:**
   ```bash
   git init
   ```

2. **Add Files & Commit:**
   ```bash
   git add .
   git commit -m "Initial commit: Gym Management System Backend project setup & structure"
   ```

3. **Link to GitHub & Push:**
   ```bash
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
   git push -u origin main
   ```

---

## 📄 License
This project is licensed under the ISC License.
