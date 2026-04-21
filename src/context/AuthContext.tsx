'use client';
import {auth, db} from '@/lib/firebase';
import {
	User,
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import {doc, getDoc, serverTimestamp, setDoc} from 'firebase/firestore';
import {ReactNode, createContext, useContext, useEffect, useState} from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────
interface MemberProfile {
	uid: string;
	displayName: string;
	email: string;
	isMember: boolean;
	joinedAt: string;
	planId?: string;
	planName?: string;
	memberSince?: string;
	membershipExpires?: string;
}

interface AuthContextValue {
	user: User | null;
	profile: MemberProfile | null;
	loading: boolean;
	isMember: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	refreshProfile: () => Promise<void>;
}

// ─── Context ───────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
	const [user, setUser] = useState<User | null>(null);
	const [profile, setProfile] = useState<MemberProfile | null>(null);
	const [loading, setLoading] = useState(true);

	// ─── Fetch member profile helper ─────────────────────────────────────────
	async function fetchProfile(firebaseUser: User) {
		try {
			const snap = await getDoc(doc(db, 'members', firebaseUser.uid));
			if (snap.exists()) {
				setProfile(snap.data() as MemberProfile);
			} else {
				setProfile(null);
			}
		} catch (error) {
			console.error('Profile fetch error:', error);
			setProfile(null);
		}
	}

	// ─── Auth listener ────────────────────────────────────────────────────────
	useEffect(() => {
		setPersistence(auth, browserSessionPersistence);

		const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
			if (firebaseUser) {
				setUser(firebaseUser);
				await fetchProfile(firebaseUser);
			} else {
				setUser(null);
				setProfile(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	// ─── Login ────────────────────────────────────────────────────────────────
	async function login(email: string, password: string) {
		await setPersistence(auth, browserSessionPersistence);
		await signInWithEmailAndPassword(auth, email, password);
	}

	// ─── Register ─────────────────────────────────────────────────────────────
	async function register(name: string, email: string, password: string) {
		await setPersistence(auth, browserSessionPersistence);
		const cred = await createUserWithEmailAndPassword(auth, email, password);
		await updateProfile(cred.user, {displayName: name});

		const memberData: MemberProfile = {
			uid: cred.user.uid,
			displayName: name,
			email,
			isMember: false, // free by default — becomes true after payment
			joinedAt: new Date().toISOString(),
		};

		await setDoc(doc(db, 'members', cred.user.uid), {
			...memberData,
			createdAt: serverTimestamp(),
		});

		setProfile(memberData);
	}

	// ─── Logout ───────────────────────────────────────────────────────────────
	async function logout() {
		await signOut(auth);
		setUser(null);
		setProfile(null);
	}

	// ─── Refresh after payment ───────────────────────────────────────────────
	async function refreshProfile() {
		if (user) await fetchProfile(user);
	}

	// Check if membership is still valid (not expired)
	const isMember = (() => {
		if (!profile?.isMember) return false;
		if (!profile.membershipExpires) return true;
		return new Date(profile.membershipExpires) > new Date();
	})();

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
				refreshProfile,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
}

// ─── Hook ─────────────────────────────────────────────────────────────────
export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}
