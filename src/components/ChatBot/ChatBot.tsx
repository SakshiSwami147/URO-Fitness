'use client';

import {useAuth} from '@/context/AuthContext';
import {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import styles from './ChatBot.module.css';

interface Message {
	role: 'user' | 'assistant';
	content: string;
}

const QUICK_QUESTIONS: string[] = [
	'Create a diet plan for weight loss 🥗',
	'Best beginner workout routine 🏋️',
	'How many calories do I need? 🔢',
	'Protein intake for muscle gain 💪',
];

const INITIAL_MESSAGE: Message = {
	role: 'assistant',
	content:
		"Welcome to URO FITNESS 💪\n\nI'm your personal AI coach. Ask me anything — diet plans, workouts, calories, nutrition, or anything health related. Let's get started!",
};

export default function ChatBot() {
	const {user, loading: authLoading} = useAuth();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
	const [input, setInput] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isOpen) {
			setTimeout(
				() => messagesEndRef.current?.scrollIntoView({behavior: 'smooth'}),
				80,
			);
		}
	}, [messages, isOpen]);

	useEffect(() => {
		const ta = textareaRef.current;
		if (!ta) return;
		ta.style.height = 'auto';
		ta.style.height = Math.min(ta.scrollHeight, 100) + 'px';
	}, [input]);
	if (authLoading || !user) return null;

	const sendMessage = async (text?: string): Promise<void> => {
		const userText = (text ?? input).trim();
		if (!userText || loading) return;

		const newMessages: Message[] = [
			...messages,
			{role: 'user', content: userText},
		];
		setMessages(newMessages);
		setInput('');
		setLoading(true);

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({messages: newMessages}),
			});
			const data = await res.json();
			setMessages([...newMessages, {role: 'assistant', content: data.reply}]);
		} catch {
			setMessages([
				...newMessages,
				{role: 'assistant', content: 'Something went wrong. Please try again!'},
			]);
		} finally {
			setLoading(false);
		}
	};

	const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const resetChat = (): void => {
		setMessages([INITIAL_MESSAGE]);
	};

	const showQuickButtons = messages.length === 1 && !loading;

	return (
		<>
			<button
				className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
				onClick={() => setIsOpen(o => !o)}
				aria-label="Open URO Fitness AI Coach"
			>
				{isOpen ? (
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				) : (
					<div className={styles.fabContent}>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
						</svg>
						<span>AI Coach</span>
					</div>
				)}
				{!isOpen && <span className={styles.liveBadge} />}
			</button>

			<div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>
				<div className={styles.header}>
					<div className={styles.headerBrand}>
						<div className={styles.logoBox}>U</div>
						<div>
							<p className={styles.brandName}>
								<span className={styles.uro}>URO</span> FITNESS
							</p>
							<p className={styles.brandSub}>
								<span className={styles.statusDot} />
								AI Coach · Always Online
							</p>
						</div>
					</div>
					<div className={styles.headerBtns}>
						<button
							className={styles.hBtn}
							onClick={resetChat}
							title="New chat"
						>
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="1 4 1 10 7 10" />
								<path d="M3.51 15a9 9 0 1 0 .49-3.51" />
							</svg>
						</button>
						<button
							className={styles.hBtn}
							onClick={() => setIsOpen(false)}
							title="Close"
						>
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					</div>
				</div>

				<div className={styles.messages}>
					{messages.map((msg, i) => (
						<div
							key={i}
							className={`${styles.msgGroup} ${msg.role === 'user' ? styles.userGroup : styles.botGroup}`}
						>
							{msg.role === 'assistant' && (
								<span className={styles.roleTag}>AI COACH</span>
							)}
							<div
								className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.botBubble}`}
							>
								{msg.content.split('\n').map((line, j, arr) => (
									<span key={j}>
										{line}
										{j < arr.length - 1 && <br />}
									</span>
								))}
							</div>
						</div>
					))}

					{loading && (
						<div className={`${styles.msgGroup} ${styles.botGroup}`}>
							<span className={styles.roleTag}>AI COACH</span>
							<div
								className={`${styles.bubble} ${styles.botBubble} ${styles.typing}`}
							>
								<span className={styles.dot} />
								<span className={styles.dot} />
								<span className={styles.dot} />
							</div>
						</div>
					)}

					{showQuickButtons && (
						<div className={styles.quickGrid}>
							{QUICK_QUESTIONS.map(q => (
								<button
									key={q}
									className={styles.quickBtn}
									onClick={() => sendMessage(q)}
								>
									{q}
								</button>
							))}
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>

				<div className={styles.inputArea}>
					<div className={styles.inputRow}>
						<textarea
							ref={textareaRef}
							className={styles.textarea}
							value={input}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								setInput(e.target.value)
							}
							onKeyDown={handleKey}
							placeholder="Ask about diet, workouts, nutrition..."
							rows={1}
							disabled={loading}
						/>
						<button
							className={styles.sendBtn}
							onClick={() => sendMessage()}
							disabled={!input.trim() || loading}
							aria-label="Send"
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<polygon points="22 2 15 22 11 13 2 9 22 2" />
							</svg>
						</button>
					</div>
					<p className={styles.hint}>
						Enter to send · Shift+Enter for new line
					</p>
				</div>
			</div>
		</>
	);
}
