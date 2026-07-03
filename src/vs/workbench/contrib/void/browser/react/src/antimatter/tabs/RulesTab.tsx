/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Rules, Skills & Subagents Tab
 *  Mirrors Cursor's Rules tab: domain-specific knowledge and workflows for the agent
 *--------------------------------------------------------------------------------------*/

import React, { useState } from 'react';

interface Rule {
	id: string;
	name: string;
	description: string;
	scope: 'always' | 'file-path' | 'manual';
	enabled: boolean;
}

const RULE_SCOPES = [
	{ value: 'always',    label: 'Always',    description: 'Applied to every agent request' },
	{ value: 'file-path', label: 'File Path', description: 'Applied when matching files are in context' },
	{ value: 'manual',    label: 'Manual',    description: 'Only applied when explicitly invoked' },
] as const;

export const AntimatterRulesTab = () => {
	const [rules, setRules] = useState<Rule[]>([]);
	const [includeThirdParty, setIncludeThirdParty] = useState(true);

	return (
		<div>
			<h1 style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--am-font-sans)', color: 'var(--am-on-surface)', marginBottom: '8px' }}>
				Rules, Skills & Subagents
			</h1>
			<p style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '32px' }}>
				Provide domain-specific knowledge and workflows for the agent
			</p>

			{/* Third-party toggle */}
			<div className='am-settings-card' style={{ marginBottom: '24px' }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>
						<h3 style={{ marginBottom: '4px' }}>Include third-party Plugins, Skills, and other configs</h3>
						<p>Automatically import agent configs from other tools</p>
					</div>
					<button
						onClick={() => setIncludeThirdParty(!includeThirdParty)}
						style={{
							width: '40px', height: '22px',
							borderRadius: '11px',
							backgroundColor: includeThirdParty ? 'var(--am-primary-container)' : 'var(--am-surface-container-high)',
							border: 'none', cursor: 'pointer',
							position: 'relative', flexShrink: 0,
							transition: 'background-color 0.2s',
						}}
					>
						<div style={{
							width: '16px', height: '16px',
							borderRadius: '50%',
							backgroundColor: includeThirdParty ? '#0a0a0a' : 'var(--am-on-surface-variant)',
							position: 'absolute',
							top: '3px',
							left: includeThirdParty ? '21px' : '3px',
							transition: 'left 0.2s',
						}} />
					</button>
				</div>
			</div>

			{/* Rules section */}
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
					<span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)' }}>Rules</span>
					<span className='codicon codicon-question' style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', cursor: 'help' }} />
				</div>
				<button className='am-btn-outline' style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '5px 12px' }}>
					<span className='codicon codicon-add' style={{ fontSize: '12px' }} />
					New
				</button>
			</div>
			<p style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '16px' }}>
				Use Rules to guide agent behavior, like enforcing best practices or coding standards.
				Rules can be applied always, by file path, or manually.
			</p>

			{rules.length === 0 ? (
				<div style={{
					padding: '48px 24px',
					textAlign: 'center',
					backgroundColor: 'var(--am-surface-container-low)',
					borderRadius: '8px',
					border: '1px dashed rgba(70,70,80,0.3)',
				}}>
					<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)', marginBottom: '8px' }}>No Rules Yet</div>
					<p style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '16px' }}>
						Create rules to guide Agent behavior
					</p>
					<button
						className='am-btn-outline'
						onClick={() => setRules([{ id: '1', name: 'New Rule', description: '', scope: 'always', enabled: true }])}
					>
						New User Rule
					</button>
				</div>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
					{rules.map(rule => (
						<div key={rule.id} className='am-settings-card'>
							<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
								<div style={{ flex: 1 }}>
									<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)' }}>{rule.name}</div>
									<div style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginTop: '2px' }}>
										Scope: {rule.scope}
									</div>
								</div>
								<button
									className='am-btn-outline'
									style={{ fontSize: '12px', padding: '4px 10px' }}
									onClick={() => setRules(prev => prev.filter(r => r.id !== rule.id))}
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
