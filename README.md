# 🏢 Aaponaloi – Building Management System (BMS)

Aaponaloi is a full-stack, role-based Building Management System that simplifies apartment listings, user agreements, payments, and community communication. Built for residents, building managers, and administrators to collaboratively manage residential operations in a modern and secure way.

---

## 🚀 Live Website

🔗 [Visit Aaponaloi](https://aaponaloi.web.app/)

---

## 📌 Features

### 👤 User
- Browse available apartments with images, rent info, and search/pagination
- Apply for rental agreements (1 user = 1 apartment policy)
- Make payments with coupon support
- View payment history
- See latest building announcements
- Update personal profile

### 👥 Member (After Agreement Approval)
- Access role-specific dashboard
- View apartment agreement details
- Make monthly payments securely
- Receive and view admin announcements

### 🛠️ Admin
- View and manage all users & members
- Accept or reject apartment agreement requests
- Create and manage announcements
- Generate and manage discount coupons
- Assign or remove admin roles

---


## 🛠️ Technologies & Libraries Used

### 💻 Frontend Stack

| Library / Tool                  | Purpose                                                                 |
|--------------------------------|-------------------------------------------------------------------------|
| **React 19**                   | Core frontend library                                                  |
| **Vite**                       | Fast development build tool                                            |
| **Tailwind CSS**               | Utility-first CSS framework                                            |
| **DaisyUI**                    | Pre-styled Tailwind components                                         |
| **Framer Motion**              | Animations and transitions                                             |
| **React Router v7**            | Routing and navigation                                                 |
| **React Hook Form + Zod**      | Form handling & validation                                             |
| **TanStack React Query v5**    | Server state management                                                |
| **React Toastify**             | Toast notifications                                                    |
| **SweetAlert2**                | Elegant modals and confirmations                                       |
| **Axios**                      | API requests                                                           |
| **Firebase Auth**              | Email & Google authentication                                          |
| **React Firebase Hooks**       | Firebase integration via React                                         |
| **React CountUp**              | Animated counters                                                      |
| **React Slick + Slick Carousel**| Image sliders                                                          |
| **React Scroll**               | Smooth anchor link scroll                                              |
| **React Spinners**             | Loaders and spinners                                                   |
| **AOS**                        | Scroll-triggered animations                                            |
| **React Leaflet + Leaflet**    | Maps integration                                                       |
| **UUID**                       | Unique ID generation                                                   |

### 🔧 Developer Tools

| Tool                    | Purpose                                     |
|-------------------------|---------------------------------------------|
| **ESLint**              | JavaScript code linting                     |
| **Tailwind + DaisyUI**  | Styling                                     |
| **@vitejs/plugin-react**| React fast refresh support in dev mode      |

---

---

## 📁 Folder Structure (Simplified)

AAPONALOI-CLIENT/
├── public/
│   ├── apartments.json           # Static data for apartment listings
│   └── vite.svg                   # Vite logo or site SVG
│
├── src/
│   ├── assets/                    # Static images, icons, etc.
│   ├── contexts/                  # Global context providers
│   │   ├── AuthContext.jsx
│   │   └── AuthProvider.jsx
│   ├── dashboard/
│   │   ├── AdminDashBoard/        # Admin-specific pages & layout
│   │   ├── MemberDashBoard/       # Member-specific pages & layout
│   │   └── UserDashBoard/         # General user dashboard
│   ├── firebase/                  # Firebase config
│   │   └── firebase.init.js
│   ├── hooks/                     # Custom React hooks
│   ├── layouts/                   # Page/layout wrappers
│   ├── pages/                     # Route-based pages
│   │   ├── Apartment/
│   │   ├── Authentication/
│   │   ├── Contact/
│   │   ├── Home/
│   │   └── routes/
│   ├── shared/                    # Reusable UI components
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env.local                     # Local environment variables
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── eslint.config.js
└── README.md

---

## 🛠️ Run Locally
Follow these steps to set up the project on your local machine:

Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/aaponaloi.git
Navigate to the project directory

bash
Copy
Edit
cd aaponaloi
Install dependencies

bash
Copy
Edit
npm install
Set up environment variables
Create a .env.local file in the root directory and add your Firebase & API keys:

env
Copy
Edit
VITE_API_URL=your_api_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
Start the development server

bash
Copy
Edit
npm run dev
Open in browser
Visit http://localhost:5173

---

## 🌐 Deployment
Frontend: Firebase Hosting
Backend: Vercel
Database: MongoDB Atlas (Cloud)