Image Search Hub — MERN + OAuth Project

A full-stack image search application built with MERN (MongoDB, Express.js, React.js, Node.js) and OAuth authentication (Google, Facebook, GitHub).
Authenticated users can search images from Unsplash, view their search history, see the top global search trends, and select multiple images from a sleek UI.

🚀 Tech Stack
🔹 Frontend:
React.js (Vite)
Tailwind CSS
Axios
React Router DOM
React Hot Toast
Framer Motion

🔹 Backend:
Node.js
Express.js
MongoDB + Mongoose
Passport.js (OAuth)
Axios (for Unsplash)
express-session
dotenv
cors
cookie-parser

📁 Project Structure
Image-Search-Hub/
│
├── /client            # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
│
└── /server            # Node.js backend
    ├── config/
    │   └── dbConnect.js
    ├── controllers/
    ├── models/
    ├── routes/
    ├── server.js
    └── .env

🧩 Backend (Server)
⚙️ Setup Instructions

Navigate to the server directory:

cd server

Install dependencies:

npm install


Create .env file in /server directory:

# -------------------------------
# SERVER CONFIGURATION
# -------------------------------
PORT=3000
MONGO_URI=mongodb+srv://<your_mongodb_connection_string>
CLIENT_URL=http://localhost:5173

# -------------------------------
# UNSPLASH API KEYS
# -------------------------------
UNSPLASH_ACCESS_KEY=<your_unsplash_access_key>
UNSPLASH_SECRET_KEY=<your_unsplash_secret_key>
UNSPLASH_APPLICATION_ID=<your_unsplash_application_id>

# -------------------------------
# GOOGLE OAUTH CONFIGURATION
# -------------------------------
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# -------------------------------
# FACEBOOK OAUTH CONFIGURATION
# -------------------------------
FACEBOOK_APP_ID=<your_facebook_app_id>
FACEBOOK_APP_SECRET=<your_facebook_app_secret>
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback

# -------------------------------
# GITHUB OAUTH CONFIGURATION
# -------------------------------
GITHUB_CLIENT_ID=<your_github_client_id>
GITHUB_CLIENT_SECRET=<your_github_client_secret>
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback


Run the backend:

npm run dev

(or)

node server.js


Server runs on:
http://localhost:3000


📡 API Endpoints Summary

|   Method   | Endpoint               |  Description                                 |
| ---------- | ---------------------- | -------------------------------------------- |
| **GET**    | `/`                    | Test route (Server is running)               |
| **GET**    | `/auth/google`         | Google login                                 |
| **GET**    | `/auth/facebook`       | Facebook login                               |
| **GET**    | `/auth/github`         | GitHub login                                 |
| **GET**    | `/auth/status`         | Check authentication status                  |
| **POST**   | `/auth/logout`         | Logout and destroy session                   |
| **GET**    | `/search?input={term}` | Search images via Unsplash                   |
| **GET**    | `/top`                 | Get top 5 searched terms and trending images |
| **POST**   | `/top/create`          | Add or update search term count              |
| **POST**   | `/history/create`      | Add user’s search query to history           |
| **GET**    | `/history`             | Get user’s search history                    |
| **DELETE** | `/history/delete/:id`  | Delete a search from user history            |

🧠 Features Implemented

✅ OAuth login with Google, Facebook, GitHub
✅ Session-based authentication
✅ Unsplash image search integration
✅ Track and show top 5 search terms
✅ User-specific search history (create, fetch, delete)
✅ Protected routes (requires authentication)
✅ Clean modular structure (Controllers, Routes, Models)

🎨 Frontend (Client)
⚙️ Setup Instructions

Navigate to client directory:

cd client


Install dependencies:

npm install


Create .env file in /client directory:

VITE_BACKEND_URL=http://localhost:3000


Run the frontend:

npm run dev


App runs on:
http://localhost:5173

🧱 Main Components
| Component          | Role                                                    |
| ------------------ | ------------------------------------------------------- |
| `Navbar.jsx`       | Handles logout & displays user avatar                   |
| `Dashboard.jsx`    | Core UI for search, filters, history, and image results |
| `Login.jsx`        | OAuth login buttons with styled UI                      |
| `ImageCard.jsx`    | Individual image with multi-select checkbox             |
| `SkeletonCard.jsx` | Loading placeholder                                     |
| `PageLoader.jsx`   | Global loader for transitions                           |
| `SearchBar.jsx`    | Input component for search term                         |
| `AuthFailure.jsx`  | Handles failed OAuth                                    |
| `NotFound.jsx`     | Fallback for undefined routes                           |

🧠 Frontend Features

✅ OAuth-based authentication (via backend session cookies)
✅ Dynamic “Top Searches” banner
✅ Image grid (4 columns, responsive)
✅ Client-side image selection counter
✅ Search history sidebar with delete option
✅ Real-time pagination (scroll loading)
✅ Toast notifications (success/error)
✅ Page loader & fallback handling
✅ Fully responsive and mobile-friendly


🛠️ Deployment Guide

Frontend: Deploy to Vercel, Netlify, or Hostinger.

Backend: Deploy to Render, Railway, or Hostinger (Node.js service).

Set environment variables for production:

Use real OAuth callback URLs (not localhost).

Ensure CORS origin matches frontend URL.
Use cookie: { secure: true, sameSite: "none" } for HTTPS.
