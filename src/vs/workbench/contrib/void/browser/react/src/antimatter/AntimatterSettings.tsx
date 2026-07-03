/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Settings Panel
 *  Cursor-style settings panel with vertical text-label navigation.
 *  Opens as an editor tab (not a sidebar panel).
 *  antimatterai.com
 *--------------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import '../styles.css';
import { AntimatterGeneralTab } from './tabs/GeneralTab.js';
import { AntimatterSetupWizardTab } from './tabs/SetupWizardTab.js';
import { AntimatterBillingTab } from './tabs/BillingTab.js';
import { AntimatterPluginsTab } from './tabs/PluginsTab.js';
import { AntimatterRulesTab } from './tabs/RulesTab.js';
import { AntimatterIndexingTab } from './tabs/IndexingTab.js';
import { AntimatterModelsTab } from './tabs/ModelsTab.js';
import ErrorBoundary from '../sidebar-tsx/ErrorBoundary.js';

// ─── Types ────────────────────────────────────────────────────────────────────

type SettingsTab =
	| 'general'
	| 'setup'
	| 'models'
	| 'rules'
	| 'plugins'
	| 'indexing'
	| 'billing';

interface NavItem {
	id: SettingsTab;
	label: string;
	icon: string; // codicon name
	description?: string;
}

// ─── Nav definition ───────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
	{ id: 'general',  label: 'General',        icon: 'settings-gear',   description: 'Account, preferences, layout' },
	{ id: 'setup',    label: 'Setup Wizard',    icon: 'rocket',          description: 'API keys, local models, HuggingFace CLI' },
	{ id: 'models',   label: 'Models',          icon: 'hubot',           description: 'Configure AI providers and models' },
	{ id: 'rules',    label: 'Rules & Skills',  icon: 'book',            description: 'Guide agent behavior' },
	{ id: 'plugins',  label: 'Plugins',         icon: 'extensions',      description: 'Vercel, Supabase, GitHub, HuggingFace' },
	{ id: 'indexing', label: 'Indexing & Docs', icon: 'database',        description: 'Codebase indexing and docs' },
	{ id: 'billing',  label: 'Billing & Plan',  icon: 'credit-card',     description: 'Free plan · Premium coming soon' },
];

// ─── Settings Panel Shell ─────────────────────────────────────────────────────

export const AntimatterSettingsPanel = () => {
	const [activeTab, setActiveTab] = useState<SettingsTab>('general');

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
			{/* ── Left nav column ── */}
			<div style={{
				width: '220px',
				flexShrink: 0,
				backgroundColor: 'var(--am-surface-container-low)',
				borderRight: '1px solid rgba(70,70,80,0.3)',
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				overflowY: 'auto',
			}}>
				{/* Search box */}
				<div style={{ padding: '12px 12px 8px' }}>
					<div style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						backgroundColor: 'var(--am-surface-container)',
						border: '1px solid rgba(70,70,80,0.3)',
						borderRadius: '4px',
						padding: '6px 10px',
					}}>
						<span className='codicon codicon-search' style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', flexShrink: 0 }} />
						<input
							type='text'
							placeholder='Search settings ⌘F'
							style={{
								background: 'transparent',
								border: 'none',
								outline: 'none',
								fontSize: '12px',
								fontFamily: 'var(--am-font-mono)',
								color: 'var(--am-on-surface)',
								width: '100%',
							}}
						/>
					</div>
				</div>

				{/* Nav items */}
				<nav style={{ flex: 1, paddingTop: '4px' }}>
					{NAV_ITEMS.map(item => (
						<button
							key={item.id}
							onClick={() => setActiveTab(item.id)}
							className={`am-settings-nav-item${activeTab === item.id ? ' active' : ''}`}
						>
							<span className={`codicon codicon-${item.icon}`} style={{ fontSize: '14px', flexShrink: 0 }} />
							<span>{item.label}</span>
						</button>
					))}

					{/* Divider */}
					<div style={{ height: '1px', backgroundColor: 'rgba(70,70,80,0.3)', margin: '8px 16px' }} />

					{/* VS Code Settings link */}
					<button
						className='am-settings-nav-item'
						onClick={() => {
							// Trigger VS Code native settings command
							// This is handled by the extension host
						}}
					>
						<span className='codicon codicon-settings-gear' style={{ fontSize: '14px', flexShrink: 0 }} />
						<span style={{ flex: 1 }}>VS Code Settings</span>
						<span className='codicon codicon-link-external' style={{ fontSize: '11px', opacity: 0.5 }} />
					</button>

					{/* Docs link */}
					<button
						className='am-settings-nav-item'
						onClick={() => {
							// Open docs in browser
						}}
					>
						<span className='codicon codicon-book' style={{ fontSize: '14px', flexShrink: 0 }} />
						<span style={{ flex: 1 }}>Docs</span>
						<span className='codicon codicon-link-external' style={{ fontSize: '11px', opacity: 0.5 }} />
					</button>
				</nav>
			</div>

			{/* ── Content area ── */}
			<div style={{
				flex: 1,
				height: '100%',
				overflowY: 'auto',
				padding: '40px 48px',
				maxWidth: '860px',
			}}>
				<ErrorBoundary>
					{activeTab === 'general'  && <AntimatterGeneralTab />}
					{activeTab === 'setup'    && <AntimatterSetupWizardTab />}
					{activeTab === 'models'   && <AntimatterModelsTab />}
					{activeTab === 'rules'    && <AntimatterRulesTab />}
					{activeTab === 'plugins'  && <AntimatterPluginsTab />}
					{activeTab === 'indexing' && <AntimatterIndexingTab />}
					{activeTab === 'billing'  && <AntimatterBillingTab />}
				</ErrorBoundary>
			</div>
		</div>
	);
};
