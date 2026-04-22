import {NextRequest, NextResponse} from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
	try {
		const razorpay = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID!,
			key_secret: process.env.RAZORPAY_KEY_SECRET!,
		});

		const {amount, planId, planName} = await req.json();

		const order = await razorpay.orders.create({
			amount: amount * 100,
			currency: 'INR',
			receipt: `uro_${planId}_${Date.now()}`,
			notes: {
				plan_id: planId,
				plan_name: planName,
			},
		});

		return NextResponse.json({orderId: order.id, amount: order.amount});
	} catch (err) {
		console.error('Razorpay create order error:', err);
		return NextResponse.json({error: 'Failed to create order'}, {status: 500});
	}
}
