/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — General Settings Tab
 *  Mirrors Cursor's General tab: Sign In, Preferences, Layout, Window
 *--------------------------------------------------------------------------------------*/

import React, { useState } from 'react';

// ─── Promo Banner ─────────────────────────────────────────────────────────────

const PromoBanner = () => {
	const [dismissed, setDismissed] = useState(false);
	if (dismissed) return null;
	return (
		<div className='am-promo-banner' style={{ marginBottom: '32px' }}>
			<button
				onClick={() => setDismissed(true)}
				style={{
					position: 'absolute', top: '12px', right: '12px',
					background: 'none', border: 'none', cursor: 'pointer',
					color: 'var(--am-on-surface-variant)', opacity: 0.5,
					padding: '4px',
				}}
			>
				<span className='codicon codicon-close' style={{ fontSize: '14px' }} />
			</button>
			<div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
				<div style={{
					padding: '8px',
					borderRadius: '6px',
					backgroundColor: 'var(--am-surface-variant)',
					color: 'var(--am-primary-container)',
					flexShrink: 0,
				}}>
					<span className='codicon codicon-rocket' style={{ fontSize: '18px' }} />
				</div>
				<div style={{ flex: 1 }}>
					<div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--am-on-surface)', marginBottom: '4px' }}>
						Meet the Agents Window
					</div>
					<p style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', marginBottom: '16px', fontFamily: 'var(--am-font-mono)' }}>
						Run many agents in parallel — across repos, locally, and in the cloud.
					</p>
					<button className='am-btn-outline' style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
						Try it now <span className='codicon codicon-arrow-right' style={{ fontSize: '12px' }} />
					</button>
				</div>
			</div>
		</div>
	);
};

// ─── Settings card ────────────────────────────────────────────────────────────

const SettingsCard = ({
	title,
	description,
	action,
}: {
	title: string;
	description: string;
	action: React.ReactNode;
}) => (
	<div className='am-settings-card'>
		<h3>{title}</h3>
		<p>{description}</p>
		{action}
	</div>
);

// ─── Section header ───────────────────────────────────────────────────────────

const SectionHeader = ({ label }: { label: string }) => (
	<div style={{
		fontSize: '12px',
		fontFamily: 'var(--am-font-mono)',
		color: 'var(--am-on-surface-variant)',
		letterSpacing: '0.06em',
		textTransform: 'uppercase',
		marginBottom: '12px',
		marginTop: '32px',
	}}>
		{label}
	</div>
);

// ─── Window Layout Picker ─────────────────────────────────────────────────────

const WindowLayoutPicker = () => {
	const [layout, setLayout] = useState<'agent' | 'editor'>('editor');
	return (
		<div style={{ display: 'flex', gap: '12px' }}>
			{(['agent', 'editor'] as const).map(l => (
				<button
					key={l}
					onClick={() => setLayout(l)}
					style={{
						padding: '8px 12px',
						borderRadius: '6px',
						border: layout === l
							? '1px solid rgba(162,163,233,0.5)'
							: '1px solid rgba(70,70,80,0.3)',
						backgroundColor: layout === l
							? 'var(--am-surface-container-high)'
							: 'var(--am-surface-container-lowest)',
						color: layout === l ? 'var(--am-primary)' : 'var(--am-on-surface-variant)',
						cursor: 'pointer',
						fontSize: '13px',
						fontFamily: 'var(--am-font-sans)',
						fontWeight: layout === l ? 600 : 400,
						textTransform: 'capitalize',
						transition: 'all 0.15s',
					}}
				>
					{l}
				</button>
			))}
		</div>
	);
};

// ─── General Tab ─────────────────────────────────────────────────────────────

export const AntimatterGeneralTab = () => {
	return (
		<div>
			<PromoBanner />

			<h1 style={{
				fontSize: '24px',
				fontWeight: 600,
				fontFamily: 'var(--am-font-sans)',
				color: 'var(--am-on-surface)',
				marginBottom: '24px',
			}}>
				General
			</h1>

			{/* Sign In */}
			<div className='am-settings-card' style={{ marginBottom: '32px' }}>
				<h3>Sign In</h3>
				<p>Sign in to sync settings, access cloud models, and unlock Antimatter features</p>
				<div style={{ display: 'flex', gap: '8px' }}>
					<button
						className='am-btn-primary'
						onClick={() => {
							// Opens browser window for OAuth — handled by extension host
							// vscode.env.openExternal(Uri.parse('https://antimatterai.com/auth'))
						}}
						style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
					>
						<span className='codicon codicon-github' style={{ fontSize: '14px' }} />
						Continue with GitHub
					</button>
					<button
						className='am-btn-outline'
						style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
					>
						<span className='codicon codicon-account' style={{ fontSize: '14px' }} />
						Continue with Google
					</button>
				</div>
			</div>

			<SectionHeader label='Preferences' />

			<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<SettingsCard
					title='Editor Settings'
					description='Configure font, formatting, minimap and more'
					action={<button className='am-btn-outline'>Open</button>}
				/>
				<SettingsCard
					title='Keyboard Shortcuts'
					description='Configure keyboard shortcuts'
					action={<button className='am-btn-outline'>Open</button>}
				/>
				<SettingsCard
					title='Import Settings from VS Code'
					description='Import settings, extensions, and keybindings from VS Code'
					action={<button className='am-btn-outline'>Import</button>}
				/>
				<SettingsCard
					title='Reset "Don\'t Ask Again" Dialogs'
					description='See warnings and tips that you\'ve hidden'
					action={<button className='am-btn-outline'>Show</button>}
				/>
			</div>

			<SectionHeader label='Layout' />

			<div className='am-settings-card'>
				<h3>Window Layout</h3>
				<p>Switch between Agent and Editor default layouts</p>
				<WindowLayoutPicker />
			</div>

			<SectionHeader label='Connection' />

			<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<SettingsCard
					title='Connection Proxy'
					description='Configure HTTP proxy settings for network requests'
					action={<button className='am-btn-outline'>Configure</button>}
				/>
				<SettingsCard
					title='Privacy & Telemetry'
					description='Control what data is shared to improve Antimatter'
					action={<button className='am-btn-outline'>Manage</button>}
				/>
			</div>
		</div>
	);
};
