# Green Miles

Green Miles is a full-stack web application that allows users to track rides, distance covered, and overall activity in a structured and secure way. The project focuses on implementing user authentication, protected routes, and a clean separation between frontend and backend logic.

This project is built as a **learning and resume-oriented application**, with attention given to backend structure, authentication flow, and security-conscious design decisions.

---

## Project Overview

The application enables users to:
- Create an account and log in securely
- Access protected features after authentication
- Track ride-related data and summaries
- Maintain user-specific data isolation

The backend handles authentication, authorization, and data persistence, while the frontend provides a responsive and interactive user interface.

---

## Technologies Used

### Frontend
- **React** – Used for building a component-based user interface
- **TypeScript** – Adds static typing for better reliability and maintainability
- **Vite** – Fast development server and build tool
- **HTML & CSS** – Structure and styling of the application

### Backend
- **Node.js** – JavaScript runtime for server-side development
- **Express.js** – Web framework for handling routes and middleware
- **MongoDB** – NoSQL database for storing user and ride data
- **Mongoose** – Object Data Modeling (ODM) library for MongoDB

### Authentication & Security
- **JWT (JSON Web Tokens)** – Used for user authentication
- **bcrypt** – Used to securely hash user passwords
- **Middleware-based authorization** – Protects routes and validates user access
- **Environment variables** – Used to manage sensitive configuration values

---

## Tech Stack Summary

- **Frontend:** React, TypeScript, Vite  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JWT, bcrypt  

---

## Notes

This project is intended for demonstration and learning purposes. While it follows good development practices, additional security measures such as CSRF protection, rate limiting, and stricter cookie policies would be required for a full production deployment.

---

## Author

**Kartik Shinde**
