# Kei Luxe Hotel & Resort - Booking System

A modern, responsive, high-performance Hotel Reservation and Management System built with **Laravel**, **Inertia.js**, **React**, and **Tailwind CSS**, configured to run seamlessly on a local **XAMPP MySQL** environment.

---

## 🚀 How to Run the Project (XAMPP Environment)

### Prerequisites
- **XAMPP** (with Apache and MySQL enabled)
- **PHP** >= 8.2
- **Composer**
- **Node.js** & **npm**

### Step-by-Step Setup

1. **Clone / Open Project Directory**
   Ensure the project folder resides in your XAMPP web root or local directory:
   ```bash
   cd c:\xampp\htdocs\booking-system
   ```

2. **Install PHP & Node Dependencies** (if needed)
   ```bash
   composer install
   npm install
   ```

3. **Configure Environment Variables (`.env`)**
   The application is pre-configured to connect to local XAMPP MySQL. Ensure your `.env` contains:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=booking_system
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. **Start XAMPP MySQL & Run Database Migrations**
   - Open **XAMPP Control Panel** and start **Apache** and **MySQL**.
   - Run the migration command to automatically create the database and tables:
     ```bash
     php artisan migrate
     ```

5. **Launch the Development Servers**
   Open two terminal windows/tabs:
   - **Terminal 1 (Laravel Backend):**
     ```bash
     php artisan serve
     ```
   - **Terminal 2 (Vite + React Frontend):**
     ```bash
     npm run dev
     ```

6. **Access the Application**
   Navigate to `http://127.0.0.1:8000` in your web browser.

---

## 💡 Architecture & Design Rationale

### 1. Choice of XAMPP MySQL Database
* **Developer Familiarity & Reliability:** XAMPP MySQL is an established, industry-standard local stack for Laravel development. It provides zero-friction database administration via phpMyAdmin, fast execution speeds, and easy portability to production MySQL/MariaDB deployments.

### 2. Monolithic Single-Page Application (Laravel + Inertia.js + React)
* **Zero-API Overhead with SPA Speed:** Instead of building a decoupled REST/GraphQL API layer, **Inertia.js** bridges Laravel controllers directly with React components. This eliminates client-side routing state sync issues while preserving a fluid, app-like SPA experience.
* **Component-Driven React UI:** React enables clean modularity for complex UI structures like interactive booking forms, real-time availability calendar selectors, and user authentication flows.

### 3. Custom Aesthetic Design System (Tailwind CSS)
* **Dark Luxury Theme:** Styled specifically for high-end hospitality (**Kei Luxe Hotel**) utilizing deep slate backgrounds (`bg-slate-900`/`bg-slate-850`), rich amber/gold accents (`from-amber-400 to-amber-500`), ambient glowing backdrops, and glassmorphism elements (`backdrop-blur-xl`).
* **Pure CSS/SVG UI (No Asset Dependencies):** Built without relying on static bitmap images or external asset pipelines, ensuring lightweight loads and immediate visual appeal.

---

## 🛠 Tech Stack Overview
- **Backend:** Laravel 11.x (PHP 8.2+)
- **Frontend Framework:** React 18 with Inertia.js
- **Styling:** Tailwind CSS
- **Database:** MySQL via XAMPP
- **Build Tool:** Vite
