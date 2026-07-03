/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Models Tab
 *  Wraps the existing Void model/provider settings with Antimatter styling
 *--------------------------------------------------------------------------------------*/

import React from 'react';

export const AntimatterModelsTab = () => {
	return (
		<div>
			<h1 style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--am-font-sans)', color: 'var(--am-on-surface)', marginBottom: '8px' }}>
				Models
			</h1>
			<p style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '32px' }}>
				Configure AI providers and models for agent, chat, and autocomplete.
			</p>

			{/* Quick-start tip */}
			<div className='am-settings-card' style={{ marginBottom: '24px', borderColor: 'rgba(162,163,233,0.2)' }}>
				<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
					<span className='codicon codicon-info' style={{ fontSize: '16px', color: 'var(--am-primary)', marginTop: '1px', flexShrink: 0 }} />
					<div>
						<h3 style={{ marginBottom: '4px' }}>New to Antimatter?</h3>
						<p>Use the <strong>Setup Wizard</strong> to connect your first AI provider — it walks you through API keys, Ollama, and HuggingFace in a few steps.</p>
						<button className='am-btn-outline' style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
							<span className='codicon codicon-rocket' style={{ fontSize: '12px' }} />
							Open Setup Wizard
						</button>
					</div>
				</div>
			</div>

			{/* Provider sections */}
			<div style={{ marginBottom: '8px', fontSize: '12px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
				Cloud Providers
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
				{[
					{ name: 'OpenAI',    models: ['gpt-4o', 'gpt-4o-mini', 'o1', 'o3-mini'],                  connected: false },
					{ name: 'Anthropic', models: ['claude-opus-4-5', 'claude-sonnet-4-5', 'claude-haiku-3-5'], connected: false },
					{ name: 'Gemini',    models: ['gemini-2.5-pro', 'gemini-2.5-flash'],                       connected: false },
					{ name: 'DeepSeek',  models: ['deepseek-chat', 'deepseek-reasoner'],                       connected: false },
				].map(provider => (
					<div key={provider.name} className='am-settings-card'>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<div>
								<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)', marginBottom: '4px' }}>{provider.name}</div>
								<div style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)' }}>
									{provider.models.join(' · ')}
								</div>
							</div>
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<div style={{
									width: '8px', height: '8px', borderRadius: '50%',
									backgroundColor: provider.connected ? '#4ade80' : 'var(--am-outline)',
								}} />
								<span style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)' }}>
									{provider.connected ? 'Connected' : 'Not configured'}
								</span>
								<button className='am-btn-outline' style={{ fontSize: '12px', padding: '4px 12px' }}>
									Configure
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<div style={{ marginBottom: '8px', fontSize: '12px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
				Local Providers
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				{[
					{ name: 'Ollama',       description: 'Local inference via Ollama daemon',        status: 'running' },
					{ name: 'HuggingFace',  description: 'Models downloaded from HuggingFace Hub',  status: 'not-configured' },
					{ name: 'LM Studio',    description: 'Local inference via LM Studio server',     status: 'not-configured' },
				].map(provider => (
					<div key={provider.name} className='am-settings-card'>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<div>
								<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)', marginBottom: '4px' }}>{provider.name}</div>
								<div style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)' }}>{provider.description}</div>
							</div>
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<div style={{
									width: '8px', height: '8px', borderRadius: '50%',
									backgroundColor: provider.status === 'running' ? '#4ade80' : 'var(--am-outline)',
									boxShadow: provider.status === 'running' ? '0 0 6px rgba(74,222,128,0.5)' : 'none',
								}} />
								<span style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)' }}>
									{provider.status === 'running' ? 'Running' : 'Not configured'}
								</span>
								<button className='am-btn-outline' style={{ fontSize: '12px', padding: '4px 12px' }}>
									{provider.status === 'running' ? 'Manage' : 'Setup'}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
