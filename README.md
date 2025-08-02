
# aDapt – Collaborative Platform

## 📌 Overview
**aDapt** is a full-stack collaborative platform designed for students to enhance campus communication and engagement.  
It provides modules for **Q&A discussions**, **Lost & Found**, **Course Rooms**, and **Secure File Storage**, all with real-time interactions.

🔗 **Live Demo:** [aDapt on Render](https://adapt-nhtr.onrender.com/)  
💻 **Source Code:** [GitHub Repository](https://github.com/202201255/WoC7.0-aDapt)

---

## 🚀 Features
- **Q&A Module** – Ask and answer academic questions in real-time.
- **Lost & Found** – Post and search for lost or found items within the campus.
- **Course Rooms** – Join or create study rooms for collaborative learning.
- **File Storage** – Save and manage important files securely.
- **Real-Time Collaboration** – Instant updates for chats and discussions using Socket.IO.
- **Authentication & Security** – JWT-based authentication with password hashing via Bcrypt.
- **Responsive UI** – Optimized for desktop and mobile using Material UI.
- **Deployment** – Hosted on Render for public access.

---

## 🛠️ Tech Stack
**Frontend:** React.js, Material UI (`/client`)  
**Backend:** Node.js, Express.js (`/server`)  
**Database:** MongoDB, Mongoose (`/models`)  
**Real-Time:** Socket.IO (`/socket`)  
**Authentication:** JWT, Bcrypt  
**Hosting:** Render

---

## 📂 Folder Structure
```

aDapt/
├── client/         # React.js frontend
├── server/         # Express.js backend
├── models/         # Mongoose schemas
├── routes/         # API endpoints
├── socket/         # Socket.IO event handlers
├── utils/          # Helper utilities
├── public/         # Static files
└── README.md       # Project documentation

````

---

## ⚙️ Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/202201255/WoC7.0-aDapt.git
   cd WoC7.0-aDapt
   ```

2. **Install dependencies for both client and server**

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file inside the `/server` folder based on `.env.example`:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_URL=your_cloudinary_url   # if using image uploads
   ```

4. **Run the application**
   In two separate terminals:

   ```bash
   # Terminal 1 - Start backend
   cd server
   npm start

   # Terminal 2 - Start frontend
   cd client
   npm start
   ```

---

## 📊 Project Highlights

* Supports **30–40 concurrent users** with instant updates.
* Secure API design ensuring data privacy.
* Modular architecture for scalability and maintainability.
* Intuitive and responsive design for ease of use.

---
