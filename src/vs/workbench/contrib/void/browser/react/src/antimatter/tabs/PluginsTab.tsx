/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Plugins & Integrations Tab
 *  Mirrors Cursor's Plugins tab: marketplace browse + suggested integrations
 *--------------------------------------------------------------------------------------*/

import React, { useState } from 'react';

interface Plugin {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: 'deployment' | 'database' | 'vcs' | 'ai' | 'productivity';
	installed: boolean;
	suggested: boolean;
}

const PLUGINS: Plugin[] = [
	{ id: 'vercel',       name: 'Vercel',          description: 'Deploy and manage Vercel projects directly from Antimatter',          icon: '▲', category: 'deployment',  installed: false, suggested: true  },
	{ id: 'supabase',     name: 'Supabase',         description: 'Browse tables, run SQL, and manage your Supabase project',            icon: '⚡', category: 'database',    installed: false, suggested: true  },
	{ id: 'github',       name: 'GitHub',           description: 'Create PRs, review code, and manage issues without leaving the IDE',  icon: '⬡', category: 'vcs',         installed: false, suggested: true  },
	{ id: 'huggingface',  name: 'HuggingFace',      description: 'Browse and download models from HuggingFace Hub',                    icon: '🤗', category: 'ai',          installed: false, suggested: true  },
	{ id: 'linear',       name: 'Linear',           description: 'Link commits to Linear issues and track progress',                    icon: '◈', category: 'productivity', installed: false, suggested: false },
	{ id: 'slack',        name: 'Slack',            description: 'Send notifications and share code snippets to Slack channels',        icon: '#', category: 'productivity', installed: false, suggested: false },
	{ id: 'datadog',      name: 'Datadog',          description: 'View logs and traces from Datadog inside the IDE',                    icon: '🐕', category: 'productivity', installed: false, suggested: false },
	{ id: 'planetscale',  name: 'PlanetScale',      description: 'Connect to PlanetScale databases and run queries',                    icon: '●', category: 'database',    installed: false, suggested: false },
];

const PluginCard = ({ plugin, onToggle }: { plugin: Plugin; onToggle: (id: string) => void }) => (
	<div className='am-plugin-card'>
		<div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
			<div style={{
				width: '40px', height: '40px',
				borderRadius: '8px',
				backgroundColor: 'var(--am-surface-container-high)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				fontSize: '18px', flexShrink: 0,
				border: '1px solid rgba(70,70,80,0.2)',
			}}>
				{plugin.icon}
			</div>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)', marginBottom: '4px' }}>
					{plugin.name}
				</div>
				<div style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', lineHeight: 1.5 }}>
					{plugin.description}
				</div>
			</div>
			<button
				onClick={() => onToggle(plugin.id)}
				className={plugin.installed ? 'am-btn-outline' : 'am-btn-primary'}
				style={{ flexShrink: 0, fontSize: '12px', padding: '6px 14px' }}
			>
				{plugin.installed ? 'Remove' : 'Add'}
			</button>
		</div>
	</div>
);

export const AntimatterPluginsTab = () => {
	const [plugins, setPlugins] = useState(PLUGINS);
	const [searchQuery, setSearchQuery] = useState('');
	const [filter, setFilter] = useState<'all' | 'installed'>('all');

	const togglePlugin = (id: string) => {
		setPlugins(prev => prev.map(p => p.id === id ? { ...p, installed: !p.installed } : p));
	};

	const installedPlugins = plugins.filter(p => p.installed);
	const suggestedPlugins = plugins.filter(p => p.suggested && !p.installed);
	const filteredPlugins = plugins.filter(p => {
		const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFilter = filter === 'all' || (filter === 'installed' && p.installed);
		return matchesSearch && matchesFilter;
	});

	return (
		<div>
			{/* Header */}
			<div style={{ marginBottom: '8px' }}>
				<h1 style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--am-font-sans)', color: 'var(--am-on-surface)', marginBottom: '8px' }}>
					Plugins
				</h1>
				<p style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)' }}>
					Extend Antimatter with integrations, Skills, Rules, Agents, and MCPs
				</p>
			</div>

			{/* Search + filter bar */}
			<div style={{ display: 'flex', gap: '8px', marginBottom: '24px', marginTop: '24px' }}>
				{/* Filter pills */}
				<div style={{ display: 'flex', gap: '4px' }}>
					{(['all', 'installed'] as const).map(f => (
						<button
							key={f}
							onClick={() => setFilter(f)}
							style={{
								padding: '6px 14px',
								borderRadius: '4px',
								border: filter === f ? '1px solid rgba(162,163,233,0.4)' : '1px solid rgba(70,70,80,0.3)',
								backgroundColor: filter === f ? 'var(--am-surface-container-high)' : 'transparent',
								color: filter === f ? 'var(--am-on-surface)' : 'var(--am-on-surface-variant)',
								cursor: 'pointer',
								fontSize: '13px',
								fontFamily: 'var(--am-font-sans)',
								textTransform: 'capitalize',
							}}
						>
							{f} {f === 'installed' && installedPlugins.length > 0 && `(${installedPlugins.length})`}
						</button>
					))}
				</div>

				{/* Search */}
				<div style={{
					flex: 1,
					display: 'flex', alignItems: 'center', gap: '8px',
					backgroundColor: 'var(--am-surface-container)',
					border: '1px solid rgba(70,70,80,0.3)',
					borderRadius: '4px',
					padding: '0 12px',
				}}>
					<span className='codicon codicon-search' style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)' }} />
					<input
						type='text'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						placeholder='Search or Paste Link'
						style={{
							flex: 1, background: 'transparent', border: 'none', outline: 'none',
							fontSize: '13px', fontFamily: 'var(--am-font-mono)',
							color: 'var(--am-on-surface)', padding: '8px 0',
						}}
					/>
				</div>
			</div>

			{/* Installed plugins */}
			{installedPlugins.length > 0 && (
				<div style={{ marginBottom: '32px' }}>
					<div style={{ fontSize: '12px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
						Installed
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{installedPlugins.map(p => <PluginCard key={p.id} plugin={p} onToggle={togglePlugin} />)}
					</div>
				</div>
			)}

			{/* Empty state */}
			{installedPlugins.length === 0 && filter === 'installed' && (
				<div style={{
					padding: '48px 24px',
					textAlign: 'center',
					backgroundColor: 'var(--am-surface-container-low)',
					borderRadius: '8px',
					border: '1px dashed rgba(70,70,80,0.3)',
					marginBottom: '32px',
				}}>
					<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)', marginBottom: '8px' }}>No Plugins Installed</div>
					<p style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '16px' }}>
						Browse the marketplace or add plugins below to extend Antimatter
					</p>
					<button className='am-btn-outline' onClick={() => setFilter('all')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
						<span className='codicon codicon-link-external' style={{ fontSize: '12px' }} />
						Browse Marketplace
					</button>
				</div>
			)}

			{/* Suggested plugins */}
			{filter === 'all' && suggestedPlugins.length > 0 && (
				<div style={{ marginBottom: '32px' }}>
					<div style={{ fontSize: '12px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
						Suggested
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{suggestedPlugins.map(p => <PluginCard key={p.id} plugin={p} onToggle={togglePlugin} />)}
					</div>
				</div>
			)}

			{/* All plugins */}
			{filter === 'all' && searchQuery && (
				<div>
					<div style={{ fontSize: '12px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
						Results
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{filteredPlugins.map(p => <PluginCard key={p.id} plugin={p} onToggle={togglePlugin} />)}
					</div>
				</div>
			)}
		</div>
	);
};
