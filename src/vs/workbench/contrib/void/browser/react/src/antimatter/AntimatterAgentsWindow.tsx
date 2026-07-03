/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Agents Window
 *  Standalone window (separate BrowserWindow in Electron) that mirrors Cursor's Agents Window.
 *  Left sidebar: New Agent, Search, Automations, Customize, repo-grouped thread history
 *  Right pane: Centered composer (empty state) or active thread
 *--------------------------------------------------------------------------------------*/

import React, { useState, useRef, useEffect } from 'react';
import '../styles.css';
import ErrorBoundary from '../sidebar-tsx/ErrorBoundary.js';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AgentThread {
	id: string;
	title: string;
	repo: string;
	timestamp: string;
	age: string;
	isCloud?: boolean;
}

interface Repo {
	name: string;
	threads: AgentThread[];
}

// ─── Sample data (replaced by real service calls) ─────────────────────────────

const SAMPLE_REPOS: Repo[] = [
	{
		name: 'antimatter-ide',
		threads: [
			{ id: '1', title: 'Antimatter open agent', repo: 'antimatter-ide', timestamp: '', age: '1d', isCloud: false },
		],
	},
	{
		name: 'antimatterwebnew',
		threads: [
			{ id: '2', title: 'Antimatter open agent', repo: 'antimatterwebnew', timestamp: '', age: '2d', isCloud: false },
			{ id: '3', title: 'Antimatter IDE local ...', repo: 'antimatterwebnew', timestamp: '', age: '2d', isCloud: false },
			{ id: '4', title: 'Window reload requ...', repo: 'antimatterwebnew', timestamp: '', age: '2d', isCloud: false },
			{ id: '5', title: 'Current branch upda...', repo: 'antimatterwebnew', timestamp: '', age: '2d', isCloud: false },
		],
	},
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const AgentsSidebar = ({
	selectedThread,
	onSelectThread,
	onNewAgent,
}: {
	selectedThread: string | null;
	onSelectThread: (id: string) => void;
	onNewAgent: () => void;
}) => {
	const [showReferral, setShowReferral] = useState(false);

	return (
		<div style={{
			width: '240px',
			flexShrink: 0,
			backgroundColor: 'var(--am-surface-container-low)',
			borderRight: '1px solid rgba(70,70,80,0.2)',
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			overflow: 'hidden',
		}}>
			{/* Top nav */}
			<div style={{ padding: '12px 8px 4px' }}>
				{[
					{ icon: 'codicon-add', label: 'New Agent',   action: onNewAgent, primary: true },
					{ icon: 'codicon-search', label: 'Search',   action: () => {} },
					{ icon: 'codicon-run-all', label: 'Automations', action: () => {} },
					{ icon: 'codicon-settings-gear', label: 'Customize', action: () => {} },
				].map(item => (
					<button
						key={item.label}
						onClick={item.action}
						style={{
							display: 'flex', alignItems: 'center', gap: '10px',
							width: '100%', padding: '8px 10px', borderRadius: '6px',
							backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
							color: item.primary ? 'var(--am-on-surface)' : 'var(--am-on-surface-variant)',
							fontSize: '14px',
							fontFamily: 'var(--am-font-sans)',
							fontWeight: item.primary ? 600 : 400,
							transition: 'background-color 0.1s',
							textAlign: 'left',
						}}
						onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--am-surface-container)')}
						onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
					>
						<span className={`codicon ${item.icon}`} style={{ fontSize: '15px', flexShrink: 0 }} />
						{item.label}
					</button>
				))}
			</div>

			<div style={{ height: '1px', backgroundColor: 'rgba(70,70,80,0.2)', margin: '8px 12px' }} />

			{/* Repo thread list */}
			<div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px 8px' }}>
					<span style={{ fontSize: '11px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
						Repositories
					</span>
					<div style={{ display: 'flex', gap: '4px' }}>
						<button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--am-on-surface-variant)', padding: '2px' }}>
							<span className='codicon codicon-filter' style={{ fontSize: '12px' }} />
						</button>
						<button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--am-on-surface-variant)', padding: '2px' }}>
							<span className='codicon codicon-add' style={{ fontSize: '12px' }} />
						</button>
					</div>
				</div>

				{SAMPLE_REPOS.map(repo => (
					<div key={repo.name} style={{ marginBottom: '16px' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', marginBottom: '4px' }}>
							<span className='codicon codicon-repo' style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)' }} />
							<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--am-on-surface)', fontFamily: 'var(--am-font-sans)' }}>
								{repo.name}
							</span>
						</div>
						{repo.threads.map(thread => (
							<button
								key={thread.id}
								onClick={() => onSelectThread(thread.id)}
								style={{
									display: 'flex', alignItems: 'center', justifyContent: 'space-between',
									width: '100%', padding: '6px 8px 6px 28px',
									borderRadius: '4px', border: 'none', cursor: 'pointer',
									backgroundColor: selectedThread === thread.id ? 'var(--am-surface-container-high)' : 'transparent',
									color: 'var(--am-on-surface-variant)',
									textAlign: 'left',
									transition: 'background-color 0.1s',
								}}
								onMouseEnter={e => { if (selectedThread !== thread.id) e.currentTarget.style.backgroundColor = 'var(--am-surface-container)'; }}
								onMouseLeave={e => { if (selectedThread !== thread.id) e.currentTarget.style.backgroundColor = 'transparent'; }}
							>
								<span style={{ fontSize: '13px', fontFamily: 'var(--am-font-sans)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
									{thread.title}
								</span>
								<span style={{ fontSize: '11px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', opacity: 0.6, flexShrink: 0, marginLeft: '8px' }}>
									{thread.age}
								</span>
							</button>
						))}
						{repo.threads.length > 4 && (
							<button style={{ padding: '4px 8px 4px 28px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)' }}>
								More
							</button>
						)}
					</div>
				))}
			</div>

			{/* Referral CTA */}
			<div style={{ padding: '8px' }}>
				<button
					onClick={() => setShowReferral(true)}
					style={{
						display: 'flex', alignItems: 'center', gap: '10px',
						width: '100%', padding: '8px 10px', borderRadius: '6px',
						backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
						color: 'var(--am-on-surface-variant)', fontSize: '13px',
						fontFamily: 'var(--am-font-sans)', textAlign: 'left',
						transition: 'background-color 0.1s',
					}}
					onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--am-surface-container)')}
					onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
				>
					<span className='codicon codicon-gift' style={{ fontSize: '14px', flexShrink: 0 }} />
					<span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
						Refer friends, earn t...
					</span>
				</button>
			</div>

			{/* User profile row */}
			<div style={{
				padding: '10px 12px',
				borderTop: '1px solid rgba(70,70,80,0.2)',
				display: 'flex', alignItems: 'center', justifyContent: 'space-between',
			}}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<div style={{
						width: '28px', height: '28px', borderRadius: '50%',
						backgroundColor: 'var(--am-surface-container-high)',
						display: 'flex', alignItems: 'center', justifyContent: 'center',
						fontSize: '12px', fontWeight: 600, color: 'var(--am-on-surface)',
						fontFamily: 'var(--am-font-sans)',
					}}>
						M
					</div>
					<div>
						<div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--am-on-surface)', fontFamily: 'var(--am-font-sans)' }}>
							Matt Bravo
						</div>
						<div style={{ fontSize: '11px', color: 'var(--am-primary)', fontFamily: 'var(--am-font-mono)' }}>
							Free Plan
						</div>
					</div>
				</div>
				<button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--am-on-surface-variant)', padding: '4px' }}>
					<span className='codicon codicon-settings-gear' style={{ fontSize: '14px' }} />
				</button>
			</div>

			{/* Referral modal */}
			{showReferral && (
				<div style={{
					position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					zIndex: 1000,
				}} onClick={() => setShowReferral(false)}>
					<div
						style={{
							backgroundColor: 'var(--am-surface-container-low)',
							border: '1px solid rgba(70,70,80,0.3)',
							borderRadius: '12px',
							padding: '24px',
							width: '480px',
							maxWidth: '90vw',
							position: 'relative',
						}}
						onClick={e => e.stopPropagation()}
					>
						<button
							onClick={() => setShowReferral(false)}
							style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--am-on-surface-variant)' }}
						>
							<span className='codicon codicon-close' style={{ fontSize: '14px' }} />
						</button>
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
							<span className='codicon codicon-gift' style={{ fontSize: '18px', color: 'var(--am-primary)' }} />
							<span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--am-on-surface)', fontFamily: 'var(--am-font-sans)' }}>
								Refer friends, earn usage credits
							</span>
						</div>
						<p style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '20px', lineHeight: 1.6 }}>
							Earn up to $250 every month by referring friends. They get 50% off their first month; you get $25 in usage credit when they buy a plan. Valid for 10 rewards per month.{' '}
							<a href='https://antimatterai.com/referrals' style={{ color: 'var(--am-primary)' }}>View referral history</a>
						</p>
						<div style={{ marginBottom: '16px' }}>
							<label style={{ fontSize: '13px', color: 'var(--am-on-surface)', display: 'block', marginBottom: '8px' }}>Invite by email</label>
							<div style={{ display: 'flex', gap: '8px' }}>
								<input
									type='email'
									placeholder='Add emails, separated by commas'
									style={{
										flex: 1, backgroundColor: 'var(--am-surface-container)',
										border: '1px solid rgba(70,70,80,0.3)', borderRadius: '6px',
										padding: '8px 12px', fontSize: '13px', fontFamily: 'var(--am-font-mono)',
										color: 'var(--am-on-surface)', outline: 'none',
									}}
								/>
								<button className='am-btn-primary' style={{ whiteSpace: 'nowrap' }}>Send invite</button>
							</div>
						</div>
						<div>
							<label style={{ fontSize: '13px', color: 'var(--am-on-surface)', display: 'block', marginBottom: '8px' }}>Referral link</label>
							<div style={{ display: 'flex', gap: '8px' }}>
								<input
									type='text'
									readOnly
									value='https://antimatterai.com/referral?code=ANTIMATTER'
									style={{
										flex: 1, backgroundColor: 'var(--am-surface-container)',
										border: '1px solid rgba(70,70,80,0.3)', borderRadius: '6px',
										padding: '8px 12px', fontSize: '12px', fontFamily: 'var(--am-font-mono)',
										color: 'var(--am-on-surface-variant)', outline: 'none',
									}}
								/>
								<button className='am-btn-outline'>Copy</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

// ─── Empty State Composer ─────────────────────────────────────────────────────

const AgentsEmptyState = ({ onSubmit }: { onSubmit: (prompt: string) => void }) => {
	const [prompt, setPrompt] = useState('');
	const [repo, setRepo] = useState('antimatter-ide');
	const [branch, setBranch] = useState('main');
	const [model, setModel] = useState('Auto');

	const handleSubmit = () => {
		if (prompt.trim()) {
			onSubmit(prompt);
			setPrompt('');
		}
	};

	return (
		<div style={{
			flex: 1, display: 'flex', flexDirection: 'column',
			alignItems: 'center', justifyContent: 'center',
			padding: '40px',
		}}>
			{/* Antimatter logo mark */}
			<div style={{
				width: '56px', height: '56px',
				borderRadius: '12px',
				background: 'linear-gradient(135deg, rgba(162,163,233,0.15) 0%, rgba(162,163,233,0.05) 100%)',
				border: '1px solid rgba(162,163,233,0.2)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				marginBottom: '40px',
			}}>
				<svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
					<circle cx='14' cy='14' r='10' stroke='rgba(162,163,233,0.6)' strokeWidth='1.5' fill='none' />
					<circle cx='14' cy='14' r='4' fill='rgba(162,163,233,0.8)' />
				</svg>
			</div>

			{/* Composer */}
			<div style={{
				width: '100%', maxWidth: '640px',
				backgroundColor: 'var(--am-surface-container)',
				border: '1px solid rgba(70,70,80,0.3)',
				borderRadius: '12px',
				overflow: 'hidden',
				boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
			}}>
				{/* Repo / branch / env selectors */}
				<div style={{
					padding: '10px 16px',
					borderBottom: '1px solid rgba(70,70,80,0.2)',
					display: 'flex', alignItems: 'center', gap: '8px',
				}}>
					<button style={{
						display: 'flex', alignItems: 'center', gap: '6px',
						background: 'none', border: '1px solid rgba(70,70,80,0.3)',
						borderRadius: '4px', padding: '4px 8px', cursor: 'pointer',
						color: 'var(--am-on-surface-variant)', fontSize: '12px', fontFamily: 'var(--am-font-mono)',
					}}>
						<span className='codicon codicon-repo' style={{ fontSize: '12px' }} />
						{repo}
						<span className='codicon codicon-chevron-down' style={{ fontSize: '10px' }} />
					</button>
					<button style={{
						display: 'flex', alignItems: 'center', gap: '6px',
						background: 'none', border: '1px solid rgba(70,70,80,0.3)',
						borderRadius: '4px', padding: '4px 8px', cursor: 'pointer',
						color: 'var(--am-on-surface-variant)', fontSize: '12px', fontFamily: 'var(--am-font-mono)',
					}}>
						{branch}
						<span className='codicon codicon-chevron-down' style={{ fontSize: '10px' }} />
					</button>
					<button style={{
						display: 'flex', alignItems: 'center', gap: '6px',
						background: 'none', border: '1px solid rgba(70,70,80,0.3)',
						borderRadius: '4px', padding: '4px 8px', cursor: 'pointer',
						color: 'var(--am-on-surface-variant)', fontSize: '12px', fontFamily: 'var(--am-font-mono)',
					}}>
						<span className='codicon codicon-vm' style={{ fontSize: '12px' }} />
						Local
						<span className='codicon codicon-chevron-down' style={{ fontSize: '10px' }} />
					</button>
				</div>

				{/* Text area */}
				<textarea
					value={prompt}
					onChange={e => setPrompt(e.target.value)}
					onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(); }}
					placeholder='Plan, Build, / for skills, @ for context'
					style={{
						width: '100%', minHeight: '100px',
						background: 'transparent', border: 'none', outline: 'none',
						padding: '16px', resize: 'none',
						fontSize: '14px', fontFamily: 'var(--am-font-sans)',
						color: 'var(--am-on-surface)', lineHeight: 1.6,
						boxSizing: 'border-box',
					}}
				/>

				{/* Bottom bar */}
				<div style={{
					padding: '10px 16px',
					borderTop: '1px solid rgba(70,70,80,0.2)',
					display: 'flex', alignItems: 'center', justifyContent: 'space-between',
				}}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						<button style={{
							display: 'flex', alignItems: 'center', gap: '6px',
							background: 'none', border: 'none', cursor: 'pointer',
							color: 'var(--am-on-surface-variant)', padding: '4px',
						}}>
							<span className='codicon codicon-add' style={{ fontSize: '14px' }} />
						</button>
						<button style={{
							display: 'flex', alignItems: 'center', gap: '6px',
							background: 'none', border: '1px solid rgba(70,70,80,0.3)',
							borderRadius: '4px', padding: '4px 10px', cursor: 'pointer',
							color: 'var(--am-on-surface-variant)', fontSize: '12px', fontFamily: 'var(--am-font-mono)',
						}}>
							{model}
							<span className='codicon codicon-chevron-down' style={{ fontSize: '10px' }} />
						</button>
					</div>
					<button style={{
						background: 'none', border: 'none', cursor: 'pointer',
						color: 'var(--am-on-surface-variant)', padding: '4px',
					}}>
						<span className='codicon codicon-mic' style={{ fontSize: '16px' }} />
					</button>
				</div>
			</div>

			{/* Quick action pills */}
			<div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
				<button style={{
					display: 'flex', alignItems: 'center', gap: '6px',
					padding: '8px 16px', borderRadius: '20px',
					border: '1px solid rgba(70,70,80,0.3)',
					backgroundColor: 'transparent', cursor: 'pointer',
					color: 'var(--am-on-surface-variant)', fontSize: '13px', fontFamily: 'var(--am-font-sans)',
					transition: 'all 0.15s',
				}}>
					Plan New Idea
					<span style={{ fontSize: '11px', fontFamily: 'var(--am-font-mono)', opacity: 0.6 }}>⇧Tab</span>
				</button>
				<button style={{
					display: 'flex', alignItems: 'center', gap: '6px',
					padding: '8px 16px', borderRadius: '20px',
					border: '1px solid rgba(70,70,80,0.3)',
					backgroundColor: 'transparent', cursor: 'pointer',
					color: 'var(--am-on-surface-variant)', fontSize: '13px', fontFamily: 'var(--am-font-sans)',
					transition: 'all 0.15s',
				}}>
					Multitask
				</button>
			</div>

			{/* Hint */}
			<p style={{ marginTop: '24px', fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', opacity: 0.6 }}>
				Use <code style={{ backgroundColor: 'var(--am-surface-container)', padding: '2px 6px', borderRadius: '3px' }}>/canvas</code> to get interactive visualizations from Antimatter
			</p>
		</div>
	);
};

// ─── Agents Window Root ───────────────────────────────────────────────────────

export const AntimatterAgentsWindow = () => {
	const [selectedThread, setSelectedThread] = useState<string | null>(null);
	const [isNewAgent, setIsNewAgent] = useState(true);

	const handleNewAgent = () => {
		setSelectedThread(null);
		setIsNewAgent(true);
	};

	const handleSelectThread = (id: string) => {
		setSelectedThread(id);
		setIsNewAgent(false);
	};

	const handleSubmit = (prompt: string) => {
		// Real impl: create new thread via IAgentService
		console.log('New agent prompt:', prompt);
	};

	return (
		<div
			className='@@void-scope'
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				backgroundColor: 'var(--am-background)',
				fontFamily: 'var(--am-font-sans)',
				color: 'var(--am-on-surface)',
				overflow: 'hidden',
			}}
		>
			<ErrorBoundary>
				<AgentsSidebar
					selectedThread={selectedThread}
					onSelectThread={handleSelectThread}
					onNewAgent={handleNewAgent}
				/>
				<AgentsEmptyState onSubmit={handleSubmit} />
			</ErrorBoundary>
		</div>
	);
};
