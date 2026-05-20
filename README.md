# 🚌 BusWhere (CBIT Bus Route Tracker)

BusWhere is a modern, responsive web application designed to help students and staff track and navigate CBIT college bus routes. Built with speed and type safety in mind, it provides an intuitive interface to search, filter, and view bus routes instantly.

---

## 🚀 Tech Stack

* **Frontend Framework:** React 19 (TypeScript)
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **Styling:** Modern CSS / Tailwind CSS
* **Database & Backend:** Firebase v12 (Firestore)

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/datlavenkatareddy/BusWhere.git](https://github.com/datlavenkatareddy/BusWhere.git)
    cd BusWhere
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a local `.env` file in the root directory of the project and paste your actual keys into it (see the Security section below).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser to view the app.

---

## 🔒 Security & Environment Variables

To protect project credentials, **never hardcode Firebase API keys** inside the source files. This repository uses Vite environment variables which are automatically blocked from GitHub via the updated `.gitignore` rules.

### Local Config Template (`.env`)

Create a local `.env` file in your root folder and structure it exactly like this:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_actual_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_actual_app_id_here
Secure Firebase Initialization (src/firebase.ts)
The application loads these variables safely using Vite's environment management system:

TypeScript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use across pages
export const db = getFirestore(app);
export default app;
📁 Project Structure
Plaintext
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, icons, and fonts
│   ├── components/  # Reusable UI elements (Navbar, Footer, etc.)
│   ├── data/        # Local fallback data (e.g., bus routes mapping)
│   ├── pages/       # Page components (Home, RouteView)
│   ├── firebase.ts  # Secure Firebase initialization and exports
│   ├── App.tsx      # Application routing layout
│   └── main.tsx     # Application entry point
├── .env.example     # Public template for environment setups
├── .gitignore       # Prevents pushing sensitive files (.env)
├── package.json     # Project dependencies and scripts
└── vite.config.ts   # Vite compiler configuration
📜 Available Scripts
npm run dev - Starts the local development server with Hot Module Replacement (HMR).

npm run build - Compiles and optimizes the TypeScript application into a production-ready dist bundle.

npm run lint - Runs ESLint checks to enforce clean code and formatting rules.

npm run preview - Locally previews the compiled production build.
