

# Authentication-as-a-Service (AAS) Project

This repository contains a **full-stack Authentication-as-a-Service (AAS)** project built with:

- **Backend:** Laravel 12 + JWT authentication
- **Frontend:** React 19 + Tailwind CSS
- **Features:** Role-based access control, interactive dashboard, and API integration

---

## **Project Structure**

my-app/
├─ backend/ # Laravel 12 backend
├─ frontend/ # React 19 frontend
├─ .gitignore
└─ README.md



---

## **Features**

### Backend (Laravel 12)

- JWT Authentication using `tymon/jwt-auth`  
- Multi-role management (admin, user, etc.)  
- API routes for login, registration, logout
- CORS configuration 
- Secure storage of passwords and tokens  
- Middleware for route protection based on JWT and roles  

### Frontend (React 19 + Tailwind CSS)

- Fully responsive **dashboard**  
- **Login** and **Registration** forms  
- **JWT token handling** and local storage management  
- **Protected routes** for authenticated users  
- Interactive **widgets, charts, and tables**  
- Sidebar and Topbar navigation  
- Tailwind CSS UI components for fast styling  
- Axios for API integration with Laravel backend  

---

## **Installation**

### Prerequisites

- Node.js 20+  
- NPM 9+  
- PHP 8.2+  
- Composer  
- Laravel 12 installed globally  
- MySQL or other supported database  

---

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret   # Generate JWT secret
php artisan migrate      # Run database migrations
php artisan serve        # Start backend at http://localhost:8000
