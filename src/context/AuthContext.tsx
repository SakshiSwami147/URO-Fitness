"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";

import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// ─── Types ─────────────────────────────

interface MemberProfile {
  uid: string;
  displayName: string;
  email: string;
  isMember: boolean;
  joinedAt: string;
}

interface AuthContextValue {
  user: User | null;
  profile: MemberProfile | null;
  loading: boolean;
  isMember: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ─── Context ───────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // ─── Firebase Auth Listener ───────────

  useEffect(() => {

    // 🔥 Set session persistence (no auto login after browser restart)
    setPersistence(auth, browserSessionPersistence);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

      if (firebaseUser) {

        setUser(firebaseUser);

        try {
          const snap = await getDoc(doc(db, "members", firebaseUser.uid));

          if (snap.exists()) {
            setProfile(snap.data() as MemberProfile);
          } else {
            setProfile(null);
          }

        } catch (error) {
          console.error("Profile fetch error:", error);
          setProfile(null);
        }

      } else {

        setUser(null);
        setProfile(null);

      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  // ─── Login ───────────────────────────

  async function login(email: string, password: string) {

    await setPersistence(auth, browserSessionPersistence);

    await signInWithEmailAndPassword(auth, email, password);
  }

  // ─── Register ────────────────────────

  async function register(name: string, email: string, password: string) {

    await setPersistence(auth, browserSessionPersistence);

    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(cred.user, {
      displayName: name,
    });

    const memberData: MemberProfile = {
      uid: cred.user.uid,
      displayName: name,
      email,
      isMember: true,
      joinedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "members", cred.user.uid), {
      ...memberData,
      createdAt: serverTimestamp(),
    });

    setProfile(memberData);
  }

  // ─── Logout ──────────────────────────

  async function logout() {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  }

  const isMember = profile?.isMember === true;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isMember,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}