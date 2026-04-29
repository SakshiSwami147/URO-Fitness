<img width="2195" height="1125" alt="Screenshot 2026-04-29 153431" src="https://github.com/user-attachments/assets/dbc5b32f-ea50-4dd5-819e-ee1b1a431f17" /># screenshots
<img width="1600" height="981" alt="image" src="https://github.com/user-attachments/assets/82c9f021-19b9-4a6a-8078-c2a494f562b3" />
<img width="2239" height="1126" alt="Screenshot 2026-04-29 153233" src="https://github.com/user-attachments/assets/e35a63b3-a415-4c1a-94bc-ee79ce84ef8b" />
<img width="2239" height="1139" alt="Screenshot 2026-04-29 153206" src="https://github.com/user-attachments/assets/7b52993c-2b48-484a-b022-c67249c2a562" />
<img width="2239" height="1133" alt="Screenshot 2026-04-29 153305" src="https://github.com/user-attachments/assets/423a46e5-7f59-434d-a7e2-f85c7d104d25" />
<img width="1600" height="981" alt="image" src="https://github.com/user-attachments/assets/297adfc4-bedf-4a30-b222-c8426f457a63" />
<img width="2208" height="1125" alt="Screenshot 2026-04-29 153522" src="https://github.com/user-attachments/assets/a09fa90e-f906-4242-9056-673de025df10" />
<img width="2215" height="1130" alt="Screenshot 2026-04-29 153537" src="https://github.com/user-attachments/assets/04258191-61da-4d4c-8f83-222dc29e3701" />
<img width="2167" height="1107" alt="Screenshot 2026-04-29 153606" src="https://github.com/user-attachments/assets/5a97f19c-28c8-49a9-b412-f175c44acae9" />
<img width="2205" height="1109" alt="Screenshot 2026-04-29 153623" src="https://github.com/user-attachments/assets/807316db-16ee-41fe-8f9d-2a09fa7c2807" />
<img width="2202" height="1129" alt="Screenshot 2026-04-29 154017" src="https://github.com/user-attachments/assets/bfc681f4-0858-4a4e-b793-0c992535e9b2" />
<img width="1506" height="1128" alt="Screenshot 2026-04-29 154048" src="https://github.com/user-attachments/assets/ba7dd05e-5271-419b-b964-b8e1e3a77926" />
<img width="1459" height="1110" alt="Screenshot 2026-04-29 154101" src="https://github.com/user-attachments/assets/cabc74db-3cc9-4107-b50e-60ca57f5ce7e" />


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
