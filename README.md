# LeavePortal | Enterprise Leave Management System

LeavePortal is a high-performance, full-stack enterprise solution designed to streamline employee absence tracking and management. Built with a focus on visual excellence and operational efficiency, it provides a seamless interface for employees to request time off and for managers to oversee team availability.

---

## 🌟 Core Features

### For Employees
*   **Interactive Dashboard**: Instant visibility into leave balances and application status.
*   **Streamlined Requests**: Intelligent form submission with field validation and real-time feedback.
*   **Historical Tracking**: Comprehensive logs of past and current leave applications.
*   **Profile Management**: Personalized account settings and identity verification.

### For Employers & HR
*   **Administrative Oversight**: Global view of all employee requests across the organization.
*   **One-Click Approvals**: Efficient processing of pending requests with immediate notification sync.
*   **Workforce Intelligence**: Detailed employee directory including historical leave performance metrics.
*   **Role-Based Access Control (RBAC)**: Strict security protocols ensuring data is only accessible to authorized personnel.

---

## 🚀 Advanced Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | [Vue.js 3 (Composition API)](https://vuejs.org/), [Tailwind CSS](https://tailwindcss.com/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| **Authentication** | [JSON Web Tokens (JWT)](https://jwt.io/), [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) |
| **UI/UX** | [Lucide Icons](https://lucide.dev/), Jakarta Sans Typography |

---

## 📂 System Architecture

```text
├── client/                     # Client-Side Application (Vue/Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI Architecture
│   │   ├── pages/             # Route-level View Components
│   │   ├── services/          # Abstracted API & State Management
│   │   └── router/            # Secure Navigation Logic
├── server/                     # Server-Side API (Express/Node)
│   ├── config/                # System & Database Configuration
│   ├── models/                # MongoDB Data Models
│   ├── controllers/           # Business Logic Layer
│   ├── routes/                # Modular API Route Definitions
│   └── middleware/            # Security & Authorization Gating
```

---

## 🛠️ Installation & Deployment

### 1. Prerequisites
*   Node.js (LTS Version)
*   MongoDB Instance (Local or Cloud)

### 2. Backend Orchestration
Navigate to the `/server` directory and execute development initialization:
```bash
npm install
npm run dev
```
**Required Environment Variables (`.env`):**
*   `PORT`: System listener port (default: 5000)
*   `MONGODB_URI`: Secure connection string
*   `JWT_SECRET`: High-entropy encryption key
*   `CLIENT_URL`: Trusted origin for CORS security

### 3. Frontend Orchestration
Navigate to the `/client` directory and launch the production-grade development server:
```bash
npm install
npm run dev
```


## 🔐 Security Standards
*   **JWT Encryption**: State-of-the-art stateless authentication.
*   **Password Hashing**: Industry-standard Bcrypt salting for user credentials.
*   **CORS Protection**: Origin-specific resource sharing protocols.
*   **Validated Schema**: Strict MongoDB schema validation to prevent data injection.
