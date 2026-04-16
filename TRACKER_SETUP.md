# 🔥 Firebase Setup Guide — URO FITNESS Tracker

## Step 1 — Create a Firebase Project
1. Go to https://console.firebase.google.com
2. Click **"Add Project"** → name it `uro-fitness`
3. Disable Google Analytics (optional) → Create project

---

## Step 2 — Enable Authentication
1. In the left sidebar: **Build → Authentication**
2. Click **"Get started"**
3. Under **Sign-in method**, enable **Email/Password**
4. Save

---

## Step 3 — Create Firestore Database
1. In the left sidebar: **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** → select your region → Enable

### Firestore Security Rules
Go to **Firestore → Rules** and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Members can read/write their own profile
    match /members/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Tracker entries — only owner can read/write
    match /tracker/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
  }
}
```

Click **Publish**.

---

## Step 4 — Get your Config Keys
1. In Firebase Console: click the ⚙️ gear → **Project settings**
2. Under **"Your apps"**, click **"Add app"** → choose Web (</> icon)
3. Register the app → copy the `firebaseConfig` object values

---

## Step 5 — Add Environment Variables
1. In your project root, copy `.env.local.example` → `.env.local`
2. Fill in each value from the Firebase config

```bash
cp .env.local.example .env.local
# Then edit .env.local with your values
```

---

## Step 6 — Install and Run

```bash
npm install
npm run dev
```

---

## How the Tracker Works

| Who sees it? | What they see |
|---|---|
| **Non-members / guests** | Lock screen with "Join Now" + "Log In" buttons |
| **Logged-in members** | Full Tracker: log form, weight/calorie/workout graphs |

### Data stored per entry (Firestore `tracker` collection):
- `uid` — user ID
- `date` — "YYYY-MM-DD" (one entry per day, updating overwrites)
- `weight` — kg (optional)
- `calories` — kcal (optional)
- `workout` — text description (optional)
- `duration` — minutes (optional)
- `createdAt` / `updatedAt` — server timestamps

### User profiles (Firestore `members` collection):
- `uid`, `displayName`, `email`
- `isMember: true` — set automatically on registration
- `joinedAt` — ISO timestamp

---

## Customization

To make `isMember` controlled by admin (rather than auto-set on register):
1. In Firestore Console, manually set `isMember: false` for test users
2. Build an admin panel or Cloud Function to set it to `true` after payment
