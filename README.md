# 🏢 Aaponaloi – Building Management System (BMS)

Aaponaloi is a full-stack, role-based Building Management System that simplifies apartment listings, user agreements, payments, and community communication. Built for residents, building managers, and administrators to collaboratively manage residential operations in a modern and secure way.

---

## 🚀 Live Website

🔗 [Visit Aaponaloi](https://aaponaloi.web.app)

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
│   ├── apartments.json        # Static data for apartment listings
│   └── vite.svg               # Vite logo or site SVG
│
├── src/
│   ├── assets/                # Static images, icons, etc.
│
│   ├── contexts/              # Global context providers
│   │   ├── AuthContext.jsx
│   │   └── AuthProvider.jsx
│
│   ├── dashboard/
│   │   ├── AdminDashBoard/
│   │   │   ├── AdminProfile.jsx
│   │   │   ├── AgreementRequests.jsx
│   │   │   ├── MakeAdmin.jsx
│   │   │   ├── MakeAnnouncement.jsx
│   │   │   ├── ManageCoupons.jsx
│   │   │   ├── ManageMembers.jsx
│   │   │   └── AdminDashboardLayout.jsx
│   │   │
│   │   ├── MemberDashBoard/
│   │   │   ├── MakePayment.jsx
│   │   │   ├── MemberProfile.jsx
│   │   │   ├── PaymentHistory.jsx
│   │   │   └── MemberDashboardLayout.jsx
│   │   │
│   │   └── UserDashBoard/
│   │       ├── Announcements.jsx
│   │       ├── DashboardLayout.jsx
│   │       └── Profile.jsx
│
│   ├── firebase/
│   │   └── firebase.init.js   # Firebase configuration
│
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.js
│   │   └── useClickOutside.js
│
│   ├── layouts/               # Page/layout wrappers
│   │   ├── AuthLayout.jsx
│   │   └── RootLayout.jsx
│
│   ├── pages/                 # Main route-based pages
│   │   ├── Apartment/
│   │   │   └── Apartments.jsx
│   │   ├── Authentication/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── SocialLogin.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   ├── Home/
│   │   │   ├── AboutBuilding.jsx
│   │   │   ├── Banner.jsx
│   │   │   ├── CouponsSection.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LocationSection.jsx
│   │   │   └── StatsSection.jsx
│   │   └── routes/
│   │       ├── PrivateRoutes.jsx
│   │       └── routes.jsx
│
│   ├── shared/                # Reusable UI components
│   │   ├── AaponaloiLogo.jsx
│   │   ├── AaponaloiLogo1.jsx
│   │   ├── AaponaloiLogo2.jsx
│   │   ├── AaponaloiLogo3.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   └── ScrollToTop.jsx
│
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env.local                 # Local environment variables
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── eslint.config.js
└── README.md

🌐 Deployment
Frontend: Firebase Hosting
Backend: Vercel
Database: MongoDB Atlas (Cloud)