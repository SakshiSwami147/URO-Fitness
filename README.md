### Screenshots

<img width="1600" height="981" alt="image" src="https://github.com/user-attachments/assets/b95baf7c-297e-4376-ac8b-72d21470ba02" />

<img width="2239" height="1139" alt="Screenshot 2026-04-29 153206" src="https://github.com/user-attachments/assets/5c2df98b-e41b-40be-bb1c-c9011ef7afa0" />

<img width="2239" height="1126" alt="Screenshot 2026-04-29 153233" src="https://github.com/user-attachments/assets/18a0feb3-76e4-4817-999f-fa5c927f0ffc" />

<img width="2239" height="1133" alt="Screenshot 2026-04-29 153305" src="https://github.com/user-attachments/assets/c4dc8f9d-bd1a-4cf7-8027-f0e0a143cbc1" />

<img width="2226" height="1123" alt="Screenshot 2026-04-29 153407" src="https://github.com/user-attachments/assets/ad5d1dfd-1425-4651-9812-b78459491d66" />

<img width="2208" height="1125" alt="Screenshot 2026-04-29 153522" src="https://github.com/user-attachments/assets/0be448ee-6d52-4fd0-a258-ed011274d173" />

<img width="2215" height="1130" alt="Screenshot 2026-04-29 153537" src="https://github.com/user-attachments/assets/fde505f4-7664-4b52-8364-302cab31989b" />

<img width="2167" height="1107" alt="Screenshot 2026-04-29 153606" src="https://github.com/user-attachments/assets/16654c7b-73f6-4888-98b7-0636aba92fcb" />

<img width="2205" height="1109" alt="Screenshot 2026-04-29 153623" src="https://github.com/user-attachments/assets/265a8d51-5f94-40f9-97c0-8e1eec4bcb25" />

<img width="2202" height="1129" alt="Screenshot 2026-04-29 154017" src="https://github.com/user-attachments/assets/d47e9382-e54d-42d2-8b60-b67aa069402a" />

<img width="2239" height="1133" alt="Screenshot 2026-04-29 155539" src="https://github.com/user-attachments/assets/6fee6719-4a07-4e01-b2fd-c27721b044be" />

<img width="2210" height="1126" alt="Screenshot 2026-04-29 155555" src="https://github.com/user-attachments/assets/4228d437-f35b-41a4-b44e-78ac75d40591" />



# 🏋️ URO FITNESS — Premium Gym Web App

Built with **Next.js 14**, **Tailwind CSS**, **Firebase**, and **AI Chatbot (Groq API)**

> Elite training. Premium design. Built Different.

---

## 🚀 Features

### 🔐 Authentication
- User Login / Register (Firebase Auth)
- Session-based login
- Personalized experience

### 📊 Fitness Tracker Dashboard
- Track:
  - Weight
  - Calories
  - Protein intake
  - Workout & duration
- Auto calorie burn calculation
- Visual charts using Recharts
- Workout history stored in Firestore

### 🤖 AI Chatbot Coach
- Smart fitness assistant
- Available only after login
- Works on all pages
- Can answer:
  - Diet plans
  - Workouts
  - Calories & nutrition
- Powered by Groq API

### 🎨 UI / UX
- Premium dark theme
- Custom cursor effects
- Smooth animations (Framer Motion)
- Fully responsive design

---

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/uro-fitness.git
cd uro-fitness
npm install
npm run dev

src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── tracker/
│   ├── about/
│   └── contact/
│
├── components/
│   ├── ChatBot/
│   ├── layout/
│   ├── sections/
│   └── ui/
│
├── context/
│   └── AuthContext.tsx
│
├── lib/
│   └── firebase.ts
