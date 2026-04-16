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