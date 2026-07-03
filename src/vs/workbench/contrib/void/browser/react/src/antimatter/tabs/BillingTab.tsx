/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Billing & Plan Tab
 *  Free plan active. Premium plan coming soon with included usage.
 *--------------------------------------------------------------------------------------*/

import React from 'react';

export const AntimatterBillingTab = () => {
	return (
		<div>
			<h1 style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--am-font-sans)', color: 'var(--am-on-surface)', marginBottom: '8px' }}>
				Billing & Plan
			</h1>
			<p style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '32px' }}>
				Manage your Antimatter subscription and usage.
			</p>

			{/* Current plan */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>

				{/* Free plan — active */}
				<div className='am-billing-plan-card current'>
					<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
						<div>
							<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
								<span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--am-on-surface)' }}>Free</span>
								<span className='am-plan-badge free'>Current Plan</span>
							</div>
							<div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--am-on-surface)', fontFamily: 'var(--am-font-sans)' }}>
								$0<span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--am-on-surface-variant)' }}>/month</span>
							</div>
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{[
							'Unlimited local model usage (Ollama)',
							'Bring your own API keys (OpenAI, Anthropic, Gemini)',
							'Full agent mode & code editing',
							'HuggingFace Hub model downloads',
							'Community support',
						].map(feature => (
							<div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--am-on-surface-variant)' }}>
								<span className='codicon codicon-check' style={{ fontSize: '13px', color: '#4ade80', flexShrink: 0 }} />
								{feature}
							</div>
						))}
					</div>
				</div>

				{/* Premium plan — coming soon */}
				<div className='am-billing-plan-card coming-soon' style={{ position: 'relative', overflow: 'hidden' }}>
					{/* Coming soon overlay */}
					<div style={{
						position: 'absolute', top: '16px', right: '16px',
						backgroundColor: 'var(--am-primary-container)',
						color: '#0a0a0a',
						fontSize: '11px', fontWeight: 700,
						fontFamily: 'var(--am-font-mono)',
						letterSpacing: '0.06em',
						padding: '3px 10px',
						borderRadius: '4px',
					}}>
						COMING SOON
					</div>

					<div style={{ marginBottom: '16px' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
							<span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--am-on-surface)' }}>Premium</span>
						</div>
						<div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--am-on-surface)', fontFamily: 'var(--am-font-sans)' }}>
							$20<span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--am-on-surface-variant)' }}>/month</span>
						</div>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
						{[
							'Everything in Free',
							'$20/month included AI usage (no API key needed)',
							'Priority access to frontier models (GPT-4o, Claude 3.5)',
							'Cloud agent execution',
							'Priority support',
							'Early access to new features',
						].map(feature => (
							<div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--am-on-surface-variant)' }}>
								<span className='codicon codicon-check' style={{ fontSize: '13px', color: 'var(--am-primary)', flexShrink: 0 }} />
								{feature}
							</div>
						))}
					</div>

					<button
						className='am-btn-outline'
						disabled
						style={{ opacity: 0.5, cursor: 'not-allowed' }}
					>
						Notify me when available
					</button>
				</div>
			</div>

			{/* Usage section */}
			<div style={{ marginBottom: '12px', fontSize: '12px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
				Usage
			</div>
			<div className='am-settings-card'>
				<h3>API Usage</h3>
				<p>Requests made using your own API keys. Antimatter does not charge for BYOK usage.</p>
				<div style={{
					padding: '16px',
					backgroundColor: 'var(--am-surface-container)',
					borderRadius: '6px',
					textAlign: 'center',
					color: 'var(--am-on-surface-variant)',
					fontSize: '13px',
					fontFamily: 'var(--am-font-mono)',
				}}>
					Sign in to view usage history
				</div>
			</div>
		</div>
	);
};
