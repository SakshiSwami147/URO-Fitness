import {adminDb} from '@/lib/firebaseAdmin';
import crypto from 'crypto';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const {
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
			uid,
			planId,
			planName,
			amount,
		} = await req.json();

		// ── Verify signature ──────────────────────────────────────────────
		const body = razorpay_order_id + '|' + razorpay_payment_id;
		const expected = crypto
			.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
			.update(body)
			.digest('hex');

		if (expected !== razorpay_signature) {
			return NextResponse.json({error: 'Invalid signature'}, {status: 400});
		}

		// ── Update Firestore member document ─────────────────────────────
		const now = new Date();
		const expiresAt = new Date(now);

		// Set expiry based on plan
		if (planId === 'monthly') expiresAt.setMonth(expiresAt.getMonth() + 1);
		if (planId === 'quarterly') expiresAt.setMonth(expiresAt.getMonth() + 3);
		if (planId === 'annual') expiresAt.setFullYear(expiresAt.getFullYear() + 1);

		await adminDb.collection('members').doc(uid).set(
			{
				isMember: true,
				planId,
				planName,
				memberSince: now.toISOString(),
				membershipExpires: expiresAt.toISOString(),
			},
			{merge: true},
		);

		// ── Store payment record ──────────────────────────────────────────
		await adminDb.collection('payments').add({
			uid,
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
			planId,
			planName,
			amount,
			paidAt: now.toISOString(),
		});

		return NextResponse.json({
			success: true,
			expiresAt: expiresAt.toISOString(),
		});
	} catch (err) {
		console.error('Verify payment error:', err);
		return NextResponse.json({error: 'Verification failed'}, {status: 500});
	}
}
