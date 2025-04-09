# 📞 ZohaCall - Video Calling App

ZohaCall is a real-time video calling web application built with **WebRTC**, **Socket.io**, and the **MERN stack**. It enables peer-to-peer video and audio communication with modern design and smooth performance.

---

## 🚀 Features

- ✅ Real-time one-on-one video calling
- ✅ Peer-to-peer WebRTC connections
- ✅ Socket.io-based signaling server
- ✅ Call accept/reject UI
- ✅ Unique user IDs for direct calling
- ✅ Copy/share call links
- ✅ Responsive and modern UI

---

## 🛠 Tech Stack

| Layer       | Tech Used                         |
|-------------|-----------------------------------|
| Frontend    | React, Tailwind CSS, Socket.io-client |
| Backend     | Node.js, Express, Socket.io       |
| Peer-to-Peer| WebRTC                            |
| Optional DB | MongoDB / Firebase (for auth/logs)|

---

## 📦 Installation

```bash
git clone https://github.com/your-username/zoha-video-call.git
cd zoha-video-call
```

### 🔧 Set up Environment

Create a `.env` file in the root with the following:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
```

> If using Auth or Pusher, include those variables here as well.

---

### ▶️ Start Development Servers

**Backend**
```bash
cd server
npm install
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev
```

---

## 🧪 How It Works

1. A user visits the app and gets a unique **peer ID**
2. They enter or share another peer's ID to start a call
3. The app uses **Socket.io** to exchange offer/answer + ICE candidates
4. **WebRTC** establishes a direct media stream between users

---

## 📁 Folder Structure

```
zoha-video-call/
├── client/          # React frontend
│   ├── src/
│   ├── components/
│   └── App.jsx
├── server/          # Express + Socket.io backend
│   ├── index.js
│   └── socket.js
├── .env
└── README.md
```

---

## 📸 Screenshots

![ZohaCall Screenshot](https://zohajs.vercel.app/images/projects/zohaCall.png)
---

## 🔒 License

MIT License. Free to use and modify.

---

## 👨‍💻 Author

Made with ❤️ by Shamsuzzaha Sumon
📧 `shamsuzzahasumon@gmail.com`

---

## 🌐 Live Demo

 [https://video-call-zohajs.vercel.app](https://video-call-zohajs.vercel.app)

---

## ✨ Future Plans

- ✅ Group video calls
- ✅ Chat during call
- ✅ Firebase login or OTP-based auth
- ✅ Call history log (MongoDB)

---