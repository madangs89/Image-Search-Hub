# 🖼️ Image Search Hub — MERN + OAuth Project

A full-stack image search application built with **MERN (MongoDB, Express.js, React.js, Node.js)** and **OAuth authentication (Google, Facebook, GitHub)**.  
Authenticated users can search images from **Unsplash**, view their search history, see the top global search trends, and select multiple images from a sleek UI.

---

## 🚀 Tech Stack

### 🔹 Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast
- Framer Motion

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (OAuth)
- Axios (for Unsplash)
- express-session
- dotenv
- cors
- cookie-parser

---

## 📁 Project Structure
Image-Search-Hub/
│
├── 📂 client # React frontend (Vite)
│ ├── 📂 src
│ │ ├── 📂 components # Reusable UI components
│ │ ├── 📂 pages # Application pages
│ │ ├── App.jsx # Main app component
│ │ └── main.jsx # React entry point
│ │
│ ├── vite.config.js # Vite configuration
│ ├── package.json # Frontend dependencies
│ └── .env # Frontend environment variables (VITE_*)
│
└── 📂 server # Node.js backend (Express)
├── 📂 config # Database & environment configuration
│ └── dbConnect.js
│
├── 📂 controllers # Request handler logic
├── 📂 models # Mongoose models
├── 📂 routes # Express route definitions
├── server.js # Entry point of backend server
├── package.json # Backend dependencies
└── .env # Backend environment variables


---

## 🖼️ Screenshots

| Feature         | Screenshot |
|-----------------|-------------|
| **Login Page** | <img width="1919" height="908" alt="Login Page" src="https://github.com/user-attachments/assets/9f9ab937-1bc7-40ac-8176-db9bac700994" /> |
| **Dashboard** | <img width="1918" height="920" alt="Dashboard" src="https://github.com/user-attachments/assets/ee4e71c6-4eab-496a-846a-6d4684e6b8fd" /> |
| **Top Searches** | <img width="1915" height="918" alt="Top Searches" src="https://github.com/user-attachments/assets/1941a736-d99b-4b75-82d4-0281f4a081e3" /> |
| **History Sidebar** | <img width="498" height="929" alt="History Sidebar" src="https://github.com/user-attachments/assets/ac2277e6-b35f-46ed-8230-2ecf86d4124d" /> |
| **Multi-Select** | <img width="1919" height="919" alt="Multi-Select" src="https://github.com/user-attachments/assets/f2f5294e-1fbb-4695-9576-1c4b21bd09f8" /> |
| **Not Found Page** | <img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/4aadb9e4-31e2-4cd6-b59d-2678ca6306c9" />|
| **Auth Failure Page** | <img width="1916" height="916" alt="image" src="https://github.com/user-attachments/assets/2836fba0-a3c3-4685-bff9-b3e2d29143ee" />|
| **Loading Page** | <img width="1919" height="917" alt="image" src="https://github.com/user-attachments/assets/5c14fdbd-8265-477e-b2c7-342b2f2017dc" />
|

---

## 🧩 Backend (Server)

### ⚙️ Setup Instructions

1️⃣ Navigate to the server directory**
cd server
2️⃣ Install dependencies

npm install


3️⃣ Create .env file in /server directory

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


4️⃣ Run the backend

npm run dev


or

node server.js


Server runs on:
👉 http://localhost:3000

📡 API Endpoints Summary
| Method     | Endpoint               | Description                                  |
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

🧠 Backend Features

✅ OAuth login with Google, Facebook, GitHub
✅ Session-based authentication
✅ Unsplash image search integration
✅ Track and show top 5 search terms
✅ User-specific search history (create, fetch, delete)
✅ Protected routes (requires authentication)
✅ Clean modular structure (Controllers, Routes, Models)

🎨 Frontend (Client)
⚙️ Setup Instructions

1️⃣ Navigate to client directory

cd client

2️⃣ Install dependencies

npm install

3️⃣ Create .env file in /client directory

env
Copy code
VITE_BACKEND_URL=http://localhost:3000

4️⃣ Run the frontend

npm run dev


App runs on:
👉 http://localhost:5173

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
| `AuthFailure.jsx`  | Handles failed OAuth logins                             |
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

🔧 Environment Setup for Production

Use real OAuth callback URLs (not localhost)

Ensure CORS origin matches your deployed frontend URL

Set:

cookie: { secure: true, sameSite: "none" }


for HTTPS environments.
