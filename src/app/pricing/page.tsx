'use client';

import AuthModal from '@/components/auth/AuthModal';
import Footer from '@/components/layout/Footer';
import Marquee from '@/components/ui/Marquee';
import RazorpayButton from '@/components/ui/RazorpayButton';
import SectionTag from '@/components/ui/SectionTag';
import {useAuth} from '@/context/AuthContext';
import {AnimatePresence, motion} from 'framer-motion';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

// ─── Plan definitions ────────────────────────────────────────────────────────
const PLANS = [
	{
		id: 'monthly',
		name: 'Monthly Grind',
		price: 999,
		period: '/ month',
		badge: null,
		desc: 'Perfect to test the waters. Full access, no commitment.',
		features: [
			'Full gym floor access',
			'AI Coach chatbot',
			'Fitness tracker dashboard',
			'Weight & calorie logs',
			'Workout history',
			'CrossFit & Zumba classes',
		],
		cta: 'Start Monthly',
	},
	{
		id: 'quarterly',
		name: 'Quarterly Beast',
		price: 2499,
		period: '/ 3 months',
		badge: 'MOST POPULAR',
		desc: "The serious member's choice. Save 16% over monthly.",
		features: [
			'Everything in Monthly',
			'Priority class booking',
			'Nutrition guidance sessions',
			"AB's batches access",
			'Dedicated trainer attention',
			'Monthly fitness assessment',
		],
		cta: 'Go Quarterly',
	},
	{
		id: 'annual',
		name: 'Elite Annual',
		price: 7999,
		period: '/ year',
		badge: 'BEST VALUE',
		desc: 'Full commitment. Maximum results. Save 33% over monthly.',
		features: [
			'Everything in Quarterly',
			'Personal training sessions (4/mo)',
			'Custom diet plan from certified coach',
			'Body composition analysis (monthly)',
			'Free URO FITNESS merchandise',
			'Priority support & early access',
		],
		cta: 'Go Elite',
	},
];

const FAQS = [
	{
		q: 'Can I cancel my membership?',
		a: 'Memberships are non-refundable once activated as per our policy. If you have concerns, please contact us on WhatsApp before purchasing.',
	},
	{
		q: 'Is my payment secure?',
		a: "Yes. All payments are processed through Razorpay — India's most trusted payment gateway — with 256-bit SSL encryption.",
	},
	{
		q: 'What happens after my plan expires?',
		a: "Your tracker and history are preserved. You'll simply lose access to the premium features until you renew.",
	},
	{
		q: 'Can I upgrade mid-plan?',
		a: "Absolutely. Reach out to us on WhatsApp and we'll manually handle the upgrade with a prorated adjustment.",
	},
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function PricingClient() {
	const {user, isMember, profile} = useAuth();
	const router = useRouter();
	const [showAuth, setShowAuth] = useState(false);
	const [openFaq, setOpenFaq] = useState<number | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSuccess = () => {
		setSuccess(true);
		setTimeout(() => router.push('/tracker'), 2000);
	};

	return (
		<>
			{/* ── Page Hero ── */}
			<div
				className="relative flex items-center overflow-hidden mt-[72px]"
				style={{height: '60vh', minHeight: '420px'}}
			>
				<div
					className="absolute inset-0 animate-hero-zoom"
					style={{
						backgroundImage:
							"url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')",
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						filter: 'brightness(0.2) saturate(0.4)',
					}}
				/>
				{/* Yellow glow */}
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							'radial-gradient(ellipse at 60% 40%, rgba(245,197,24,0.1) 0%, transparent 65%)',
					}}
				/>
				<div className="relative z-10 px-[5vw]">
					<p className="font-condensed text-[0.7rem] tracking-[5px] uppercase text-[#666] mb-4">
						URO FITNESS / <span className="text-yellow">Pricing</span>
					</p>
					<h1
						className="font-bebas leading-none text-white"
						style={{fontSize: 'clamp(3rem, 8vw, 8rem)'}}
					>
						INVEST IN YOUR
						<em className="text-yellow not-italic block">BEST SELF</em>
					</h1>
					<p className="text-white/50 max-w-[420px] mt-4 leading-relaxed font-barlow">
						Transparent pricing. No hidden fees. Cancel anytime.
					</p>
				</div>
			</div>

			{/* ── Active membership banner ── */}
			{isMember && profile && (
				<div className="bg-yellow/10 border-b border-yellow/20 px-[5vw] py-4 flex items-center justify-between flex-wrap gap-3">
					<p className="font-condensed text-[0.8rem] tracking-[2px] uppercase text-yellow">
						✓ Active Member — {profile.planName}
					</p>
					<p className="font-barlow text-[0.8rem] text-white/50">
						Expires:{' '}
						{profile.membershipExpires
							? new Date(profile.membershipExpires).toLocaleDateString(
									'en-IN',
									{day: 'numeric', month: 'long', year: 'numeric'},
								)
							: '–'}
					</p>
				</div>
			)}

			{/* ── Success overlay ── */}
			<AnimatePresence>
				{success && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center"
					>
						<motion.div
							initial={{scale: 0.8, opacity: 0}}
							animate={{scale: 1, opacity: 1}}
							transition={{type: 'spring', stiffness: 300, damping: 24}}
							className="text-center px-8"
						>
							<div className="text-7xl mb-6">🏆</div>
							<h2 className="font-bebas text-6xl text-yellow tracking-wide mb-3">
								WELCOME, ELITE!
							</h2>
							<p className="font-barlow text-white/60 mb-2">
								Payment confirmed. Redirecting to your Tracker…
							</p>
							<div className="w-40 h-0.5 bg-yellow/30 mx-auto mt-6 overflow-hidden">
								<div className="h-full bg-yellow animate-load-progress" />
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* ── Plans ── */}
			<section className="py-32 px-[5vw] bg-[#050505]">
				<div className="text-center mb-20">
					<SectionTag>Membership Plans</SectionTag>
					<h2
						className="font-bebas leading-none text-white"
						style={{fontSize: 'clamp(2.5rem, 5vw, 5rem)'}}
					>
						CHOOSE YOUR <em className="text-yellow not-italic">WEAPON</em>
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e] max-w-6xl mx-auto">
					{PLANS.map((plan, i) => {
						const isPopular = plan.id === 'quarterly';
						return (
							<motion.div
								key={plan.id}
								initial={{opacity: 0, y: 30}}
								whileInView={{opacity: 1, y: 0}}
								transition={{delay: i * 0.12}}
								viewport={{once: true}}
								className={`relative flex flex-col bg-[#111] p-10 overflow-hidden
                  ${isPopular ? 'ring-1 ring-yellow/40 bg-[#141414]' : ''}`}
							>
								{/* Popular badge */}
								{plan.badge && (
									<div
										className="absolute top-0 right-0 bg-yellow text-black
                      font-condensed text-[0.6rem] tracking-[3px] font-bold uppercase px-4 py-1.5"
										style={{
											clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8px 100%)',
										}}
									>
										{plan.badge}
									</div>
								)}

								{/* Plan name */}
								<div className="font-condensed text-[0.7rem] tracking-[4px] uppercase text-yellow mb-3">
									{plan.name}
								</div>

								{/* Price */}
								<div className="flex items-end gap-2 mb-2">
									<span className="font-bebas text-[3.5rem] leading-none text-white">
										₹{plan.price.toLocaleString('en-IN')}
									</span>
									<span className="font-barlow text-sm text-[#555] mb-2 pb-1">
										{plan.period}
									</span>
								</div>

								{/* Per-month breakdown for longer plans */}
								{plan.id === 'quarterly' && (
									<p className="font-condensed text-xs tracking-[2px] text-yellow/70 mb-4">
										≈ ₹833 / month — Save ₹498
									</p>
								)}
								{plan.id === 'annual' && (
									<p className="font-condensed text-xs tracking-[2px] text-yellow/70 mb-4">
										≈ ₹667 / month — Save ₹3,989
									</p>
								)}
								{plan.id === 'monthly' && <div className="mb-4" />}

								<p className="font-barlow text-[0.85rem] text-[#666] leading-relaxed mb-8">
									{plan.desc}
								</p>

								{/* Features */}
								<ul className="flex flex-col gap-3 mb-10 flex-1">
									{plan.features.map(f => (
										<li key={f} className="flex items-start gap-3">
											<span className="text-yellow mt-0.5 flex-shrink-0">
												✓
											</span>
											<span className="font-barlow text-[0.85rem] text-white/70">
												{f}
											</span>
										</li>
									))}
								</ul>

								{/* CTA */}
								{!user ? (
									<button
										onClick={() => setShowAuth(true)}
										className="clip-btn w-full bg-yellow text-black font-condensed font-bold
                      text-[0.85rem] tracking-[3px] uppercase py-4
                      transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
									>
										Log In to Join →
									</button>
								) : isMember && profile?.planId === plan.id ? (
									<div
										className="clip-btn w-full bg-yellow/10 border border-yellow/30 text-yellow
                      font-condensed font-bold text-[0.85rem] tracking-[3px] uppercase py-4 text-center"
									>
										✓ Current Plan
									</div>
								) : (
									<RazorpayButton
										planId={plan.id}
										planName={plan.name}
										amount={plan.price}
										onSuccess={handleSuccess}
									/>
								)}
							</motion.div>
						);
					})}
				</div>
			</section>

			<Marquee
				items={[
					'Secure Payments',
					'Razorpay Powered',
					'256-bit SSL',
					'Instant Activation',
					'No Hidden Fees',
					'Pure Value',
				]}
			/>

			{/* ── What's included callout ── */}
			<section className="py-32 px-[5vw] bg-[#0d0d0d]">
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
					<div>
						<SectionTag>Every Plan Includes</SectionTag>
						<h2
							className="font-bebas leading-none text-white mb-8"
							style={{fontSize: 'clamp(2.5rem, 5vw, 4.5rem)'}}
						>
							THE FULL
							<em className="text-yellow not-italic block">URO EXPERIENCE</em>
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e1e1e]">
							{[
								{
									icon: '🤖',
									label: 'AI Coach',
									desc: '24/7 personal fitness AI',
								},
								{
									icon: '📊',
									label: 'Fitness Tracker',
									desc: 'Weight, calories & workouts',
								},
								{
									icon: '🏋️',
									label: 'All Programs',
									desc: 'Strength, CrossFit, Zumba',
								},
								{
									icon: '👥',
									label: 'Community',
									desc: 'Train with like-minded people',
								},
								{
									icon: '🥗',
									label: 'Nutrition Guide',
									desc: 'Certified diet counselling',
								},
								{
									icon: '📱',
									label: 'Mobile Ready',
									desc: 'Access on any device',
								},
							].map(item => (
								<div
									key={item.label}
									className="bg-[#111] p-6 flex gap-4 items-start
                  hover:bg-yellow/[0.04] transition-colors duration-300"
								>
									<span className="text-2xl flex-shrink-0">{item.icon}</span>
									<div>
										<div className="font-condensed text-[0.85rem] tracking-[2px] uppercase text-white font-bold mb-1">
											{item.label}
										</div>
										<div className="font-barlow text-[0.8rem] text-[#555]">
											{item.desc}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Secure payment info */}
					<div className="space-y-6">
						<div className="bg-[#111] border border-[#1e1e1e] p-10">
							<div className="font-condensed text-[0.7rem] tracking-[4px] uppercase text-yellow mb-4">
								Payment Security
							</div>
							<h3 className="font-bebas text-[2rem] text-white leading-tight mb-4">
								POWERED BY RAZORPAY
							</h3>
							<p className="font-barlow text-[0.9rem] text-[#666] leading-relaxed mb-6">
								India's #1 payment gateway. Your card details never touch our
								servers. 256-bit SSL encryption on every transaction.
							</p>
							<div className="flex flex-wrap gap-3">
								{['UPI', 'Cards', 'Net Banking', 'Wallets', 'EMI'].map(m => (
									<span
										key={m}
										className="font-condensed text-[0.7rem] tracking-[2px] uppercase
                      border border-[#2a2a2a] text-[#666] px-3 py-1.5"
									>
										{m}
									</span>
								))}
							</div>
						</div>

						<div className="bg-[#111] border border-[#1e1e1e] p-10">
							<div className="font-condensed text-[0.7rem] tracking-[4px] uppercase text-yellow mb-4">
								Instant Activation
							</div>
							<p className="font-barlow text-[0.9rem] text-[#666] leading-relaxed">
								Your membership activates the moment payment is confirmed — no
								manual approval, no waiting. Get into your Tracker dashboard
								immediately.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ── FAQ ── */}
			<section className="py-32 px-[5vw] bg-[#050505]">
				<div className="max-w-3xl mx-auto">
					<SectionTag>FAQ</SectionTag>
					<h2
						className="font-bebas leading-none text-white mb-16"
						style={{fontSize: 'clamp(2.5rem, 5vw, 4.5rem)'}}
					>
						COMMON <em className="text-yellow not-italic">QUESTIONS</em>
					</h2>
					<div className="flex flex-col gap-px bg-[#1e1e1e]">
						{FAQS.map((faq, i) => (
							<div key={i} className="bg-[#111]">
								<button
									onClick={() => setOpenFaq(openFaq === i ? null : i)}
									className="w-full flex items-center justify-between p-8 text-left
                    hover:bg-yellow/[0.04] transition-colors duration-300"
								>
									<span className="font-condensed text-[1rem] tracking-[1px] uppercase text-white">
										{faq.q}
									</span>
									<span
										className={`text-yellow text-xl flex-shrink-0 ml-4 transition-transform duration-300
                      ${openFaq === i ? 'rotate-45' : ''}`}
									>
										+
									</span>
								</button>
								<AnimatePresence>
									{openFaq === i && (
										<motion.div
											initial={{height: 0, opacity: 0}}
											animate={{height: 'auto', opacity: 1}}
											exit={{height: 0, opacity: 0}}
											transition={{duration: 0.25}}
											className="overflow-hidden"
										>
											<p className="px-8 pb-8 font-barlow text-[0.9rem] text-[#666] leading-relaxed">
												{faq.a}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />

			{showAuth && (
				<AuthModal defaultTab="register" onClose={() => setShowAuth(false)} />
			)}
		</>
	);
}
