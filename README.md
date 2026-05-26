# 🚌 BusWhere

> **A one-tap bus status and live location sharing platform built for college students.**

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.0-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.13.0-FFCA28.svg)](https://firebase.google.com/)

---

## 📖 About the Project

**BusWhere** was built to solve a very specific, real-world problem faced by college day scholars every morning: *repetitively messaging friends asking, "Where is the bus?"* 

Instead of relying on heavy, complex, hardware-dependent GPS systems, BusWhere offers an extremely simple **community-driven** approach. Students on the bus can update the location with a single tap (e.g., "Just Left", "Arriving"), instantly notifying everyone else waiting at subsequent stops. For even better accuracy, riders can choose to broadcast their live GPS location directly to a built-in map.

Currently tailored for **CBIT (Chaitanya Bharathi Institute of Technology)** Junior and Senior routes, but scalable to any campus transport network.

---

## ✨ Features

- **🚀 One-Tap Status Updates:** Avoid typing. Tap "At Stop," "Just Left," or "Arriving" to instantly broadcast the bus status to your route group.
- **🗺️ Live GPS Tracking Map:** Built-in `react-leaflet` map integration. Students on the bus can opt-in to share their live device GPS, automatically moving the bus icon on the map as they travel.
- **🔍 Intelligent Autocomplete Search:** Instantly find your bus by searching the Route Number (e.g., "16"), Route Name (e.g., "Tarnaka"), or any specific stop name.
- **👥 Junior vs Senior Segregation:** Clear visual badging ensuring students board the correct buses.
- **🕒 Smart "Stale Data" Prevention:** Automatically recognizes if a status update is from yesterday and grays out the UI, prompting the first rider of the day to update the status.
- **📱 Mobile-First Premium Design:** Features a beautiful, glassmorphic UI with smooth micro-animations tailored specifically for a native-like mobile web experience.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (using the bleeding-edge `@tailwindcss/vite` plugin)
- **Routing:** React Router DOM
- **Maps:** Leaflet & React-Leaflet
- **Backend & Database:** Firebase (Authentication & Firestore for real-time syncing)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/datlavenkatareddy/BusWhere.git
   cd BusWhere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase Environment Variables**
   - Copy the `.env.example` file and rename it to `.env.local`
   - Fill in the file with your actual Firebase Project API keys:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-project-id.firebasestorage.app"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
   ```
   *(Note: `.env.local` is safely ignored by Git as configured in `.gitignore`)*

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the app!

---

## 🏗️ Project Structure

```text
BusWhere/
├── public/                 # Static assets
├── src/
│   ├── data/               # Static JSON/TS data (e.g., all 39+ CBIT bus routes)
│   ├── pages/              # Primary Views (Home, RouteView)
│   ├── firebase.ts         # Secure Firebase initialization block
│   ├── App.tsx             # Main React Router configuration
│   ├── index.css           # Global Tailwind utilities and Leaflet CSS
│   └── main.tsx            # React DOM Entry point
├── .env.example            # Environment variables template
├── .gitignore              # Ignored files (Secures API keys)
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite bundler and Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
