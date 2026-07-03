/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Setup Wizard Tab
 *  Guides users through: API keys, Ollama local inference, HuggingFace CLI
 *  This is the first thing a new user should complete.
 *--------------------------------------------------------------------------------------*/

import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type StepStatus = 'idle' | 'active' | 'complete' | 'error';

interface WizardStep {
	id: string;
	title: string;
	description: string;
	status: StepStatus;
}

// ─── Status dot ───────────────────────────────────────────────────────────────

const StatusDot = ({ status }: { status: StepStatus }) => {
	const colorMap: Record<StepStatus, string> = {
		idle:     'var(--am-outline)',
		active:   'var(--am-primary)',
		complete: '#4ade80',
		error:    'var(--am-error)',
	};
	return (
		<div style={{
			width: '8px', height: '8px',
			borderRadius: '50%',
			backgroundColor: colorMap[status],
			flexShrink: 0,
			marginTop: '2px',
		}} />
	);
};

// ─── Step number badge ────────────────────────────────────────────────────────

const StepBadge = ({ number, status }: { number: number; status: StepStatus }) => (
	<div style={{
		width: '28px', height: '28px',
		borderRadius: '50%',
		backgroundColor: status === 'complete'
			? 'var(--am-primary-container)'
			: status === 'active'
				? 'var(--am-surface-container-high)'
				: 'var(--am-surface-container)',
		color: status === 'complete' ? '#0a0a0a' : 'var(--am-on-surface-variant)',
		display: 'flex', alignItems: 'center', justifyContent: 'center',
		fontSize: '12px', fontWeight: 600,
		fontFamily: 'var(--am-font-mono)',
		flexShrink: 0,
		border: status === 'active' ? '1px solid rgba(162,163,233,0.4)' : '1px solid transparent',
		transition: 'all 0.2s',
	}}>
		{status === 'complete'
			? <span className='codicon codicon-check' style={{ fontSize: '12px' }} />
			: number}
	</div>
);

// ─── API Key Input ────────────────────────────────────────────────────────────

const ApiKeyInput = ({
	label,
	placeholder,
	docsUrl,
	onSave,
}: {
	label: string;
	placeholder: string;
	docsUrl: string;
	onSave: (key: string) => void;
}) => {
	const [value, setValue] = useState('');
	const [saved, setSaved] = useState(false);
	const [visible, setVisible] = useState(false);

	const handleSave = () => {
		if (value.length > 10) {
			onSave(value);
			setSaved(true);
			setTimeout(() => setSaved(false), 2000);
		}
	};

	return (
		<div style={{ marginTop: '16px' }}>
			<div style={{
				display: 'flex', alignItems: 'center', justifyContent: 'space-between',
				marginBottom: '8px',
			}}>
				<label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--am-on-surface)' }}>
					{label}
				</label>
				<a
					href={docsUrl}
					style={{ fontSize: '12px', color: 'var(--am-primary)', textDecoration: 'none', fontFamily: 'var(--am-font-mono)' }}
				>
					Get API key ↗
				</a>
			</div>
			<div style={{ display: 'flex', gap: '8px' }}>
				<div style={{
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					backgroundColor: 'var(--am-surface-container)',
					border: '1px solid rgba(70,70,80,0.3)',
					borderRadius: '4px',
					padding: '0 10px',
					gap: '8px',
				}}>
					<input
						type={visible ? 'text' : 'password'}
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={placeholder}
						style={{
							flex: 1,
							background: 'transparent',
							border: 'none',
							outline: 'none',
							fontSize: '13px',
							fontFamily: 'var(--am-font-mono)',
							color: 'var(--am-on-surface)',
							padding: '8px 0',
						}}
					/>
					<button
						onClick={() => setVisible(!visible)}
						style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--am-on-surface-variant)', padding: '4px' }}
					>
						<span className={`codicon codicon-${visible ? 'eye-closed' : 'eye'}`} style={{ fontSize: '14px' }} />
					</button>
				</div>
				<button
					className={saved ? 'am-btn-primary' : 'am-btn-outline'}
					onClick={handleSave}
					disabled={value.length < 10}
					style={{ whiteSpace: 'nowrap', opacity: value.length < 10 ? 0.5 : 1 }}
				>
					{saved ? '✓ Saved' : 'Save'}
				</button>
			</div>
		</div>
	);
};

// ─── Ollama Status ────────────────────────────────────────────────────────────

const OllamaStatus = () => {
	const [status, setStatus] = useState<'checking' | 'running' | 'missing'>('checking');

	React.useEffect(() => {
		// In real implementation, check via ITerminalService or HTTP ping to localhost:11434
		const timer = setTimeout(() => {
			// Simulate check — real impl would ping http://localhost:11434/api/tags
			setStatus('running');
		}, 1200);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div style={{
			display: 'flex', alignItems: 'center', gap: '10px',
			padding: '12px 16px',
			backgroundColor: 'var(--am-surface-container)',
			borderRadius: '6px',
			border: '1px solid rgba(70,70,80,0.2)',
			marginTop: '16px',
		}}>
			<div style={{
				width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
				backgroundColor: status === 'running' ? '#4ade80' : status === 'missing' ? 'var(--am-error)' : 'var(--am-outline)',
				boxShadow: status === 'running' ? '0 0 6px rgba(74,222,128,0.5)' : 'none',
			}} />
			<span style={{ fontSize: '13px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)' }}>
				{status === 'running'  && 'Ollama running · localhost:11434'}
				{status === 'missing'  && 'Ollama not found'}
				{status === 'checking' && 'Checking for Ollama...'}
			</span>
			{status === 'missing' && (
				<a
					href='https://ollama.com'
					style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--am-primary)', fontFamily: 'var(--am-font-mono)', textDecoration: 'none' }}
				>
					Install ↗
				</a>
			)}
		</div>
	);
};

// ─── HuggingFace CLI Status ───────────────────────────────────────────────────

const HuggingFaceCLIStatus = () => {
	const [status, setStatus] = useState<'checking' | 'installed' | 'missing'>('checking');
	const [token, setToken] = useState('');
	const [tokenSaved, setTokenSaved] = useState(false);

	React.useEffect(() => {
		// Real impl: spawn `huggingface-cli whoami` via ITerminalService
		const timer = setTimeout(() => setStatus('missing'), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div style={{ marginTop: '16px' }}>
			<div style={{
				display: 'flex', alignItems: 'center', gap: '10px',
				padding: '12px 16px',
				backgroundColor: 'var(--am-surface-container)',
				borderRadius: '6px',
				border: '1px solid rgba(70,70,80,0.2)',
				marginBottom: '12px',
			}}>
				<div style={{
					width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
					backgroundColor: status === 'installed' ? '#4ade80' : status === 'missing' ? 'var(--am-error)' : 'var(--am-outline)',
				}} />
				<span style={{ fontSize: '13px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)' }}>
					{status === 'installed'  && 'HuggingFace CLI installed'}
					{status === 'missing'    && 'HF CLI missing'}
					{status === 'checking'   && 'Checking for HF CLI...'}
				</span>
				{status === 'missing' && (
					<button
						className='am-btn-outline'
						style={{ marginLeft: 'auto', fontSize: '12px', padding: '4px 12px' }}
						onClick={() => {
							// Real impl: run `pip install huggingface_hub` in terminal
						}}
					>
						Install
					</button>
				)}
			</div>

			{status !== 'checking' && (
				<div>
					<label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--am-on-surface)', display: 'block', marginBottom: '8px' }}>
						HuggingFace Token
					</label>
					<div style={{ display: 'flex', gap: '8px' }}>
						<input
							type='password'
							value={token}
							onChange={e => setToken(e.target.value)}
							placeholder='hf_...'
							style={{
								flex: 1,
								backgroundColor: 'var(--am-surface-container)',
								border: '1px solid rgba(70,70,80,0.3)',
								borderRadius: '4px',
								padding: '8px 12px',
								fontSize: '13px',
								fontFamily: 'var(--am-font-mono)',
								color: 'var(--am-on-surface)',
								outline: 'none',
							}}
						/>
						<button
							className={tokenSaved ? 'am-btn-primary' : 'am-btn-outline'}
							onClick={() => { setTokenSaved(true); setTimeout(() => setTokenSaved(false), 2000); }}
							disabled={token.length < 8}
							style={{ opacity: token.length < 8 ? 0.5 : 1 }}
						>
							{tokenSaved ? '✓ Saved' : 'Save'}
						</button>
					</div>
					<p style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', marginTop: '6px', fontFamily: 'var(--am-font-mono)' }}>
						Required to download gated models from HuggingFace Hub.{' '}
						<a href='https://huggingface.co/settings/tokens' style={{ color: 'var(--am-primary)' }}>Get token ↗</a>
					</p>
				</div>
			)}
		</div>
	);
};

// ─── Setup Wizard Tab ─────────────────────────────────────────────────────────

export const AntimatterSetupWizardTab = () => {
	const [expandedStep, setExpandedStep] = useState<string | null>('cloud-api');

	const steps = [
		{ id: 'cloud-api',    number: 1, title: 'Connect Cloud AI',         description: 'Add API keys for OpenAI, Anthropic, Gemini, or DeepSeek' },
		{ id: 'local-ollama', number: 2, title: 'Set Up Local Inference',   description: 'Run models locally with Ollama — no API key needed' },
		{ id: 'hf-cli',       number: 3, title: 'HuggingFace CLI',          description: 'Download and run open-weight models from HuggingFace Hub' },
		{ id: 'choose-model', number: 4, title: 'Choose Your Default Model', description: 'Pick the model Antimatter uses by default for all tasks' },
	];

	return (
		<div>
			<h1 style={{
				fontSize: '24px', fontWeight: 600,
				fontFamily: 'var(--am-font-sans)',
				color: 'var(--am-on-surface)',
				marginBottom: '8px',
			}}>
				Setup Wizard
			</h1>
			<p style={{
				fontSize: '14px', color: 'var(--am-on-surface-variant)',
				fontFamily: 'var(--am-font-mono)',
				marginBottom: '32px',
			}}>
				Get Antimatter running with your preferred AI backend. Complete any step — you don't need all of them.
			</p>

			{/* Progress bar */}
			<div style={{
				height: '4px',
				backgroundColor: 'var(--am-surface-container-high)',
				borderRadius: '2px',
				marginBottom: '32px',
				overflow: 'hidden',
			}}>
				<div style={{
					height: '100%',
					width: '25%',
					backgroundColor: 'var(--am-primary-container)',
					borderRadius: '2px',
					transition: 'width 0.3s',
				}} />
			</div>

			{/* Steps */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

				{/* Step 1: Cloud API Keys */}
				<div className='am-wizard-step' style={{
					flexDirection: 'column',
					cursor: 'pointer',
					borderColor: expandedStep === 'cloud-api' ? 'rgba(162,163,233,0.3)' : 'rgba(70,70,80,0.2)',
				}}>
					<div
						style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}
						onClick={() => setExpandedStep(expandedStep === 'cloud-api' ? null : 'cloud-api')}
					>
						<StepBadge number={1} status='active' />
						<div style={{ flex: 1 }}>
							<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)' }}>Connect Cloud AI</div>
							<div style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginTop: '2px' }}>
								Add API keys for OpenAI, Anthropic, Gemini, or DeepSeek
							</div>
						</div>
						<span
							className={`codicon codicon-chevron-${expandedStep === 'cloud-api' ? 'up' : 'down'}`}
							style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)' }}
						/>
					</div>

					{expandedStep === 'cloud-api' && (
						<div style={{ paddingLeft: '44px', paddingTop: '8px', width: '100%' }}>
							<ApiKeyInput
								label='OpenAI'
								placeholder='sk-...'
								docsUrl='https://platform.openai.com/api-keys'
								onSave={key => console.log('OpenAI key saved')}
							/>
							<ApiKeyInput
								label='Anthropic'
								placeholder='sk-ant-...'
								docsUrl='https://console.anthropic.com/settings/keys'
								onSave={key => console.log('Anthropic key saved')}
							/>
							<ApiKeyInput
								label='Google Gemini'
								placeholder='AIza...'
								docsUrl='https://aistudio.google.com/app/apikey'
								onSave={key => console.log('Gemini key saved')}
							/>
							<ApiKeyInput
								label='DeepSeek'
								placeholder='sk-...'
								docsUrl='https://platform.deepseek.com/api_keys'
								onSave={key => console.log('DeepSeek key saved')}
							/>
						</div>
					)}
				</div>

				{/* Step 2: Ollama */}
				<div className='am-wizard-step' style={{
					flexDirection: 'column',
					cursor: 'pointer',
					borderColor: expandedStep === 'local-ollama' ? 'rgba(162,163,233,0.3)' : 'rgba(70,70,80,0.2)',
				}}>
					<div
						style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}
						onClick={() => setExpandedStep(expandedStep === 'local-ollama' ? null : 'local-ollama')}
					>
						<StepBadge number={2} status='idle' />
						<div style={{ flex: 1 }}>
							<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)' }}>Set Up Local Inference</div>
							<div style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginTop: '2px' }}>
								Run models locally with Ollama — no API key needed, full privacy
							</div>
						</div>
						<span
							className={`codicon codicon-chevron-${expandedStep === 'local-ollama' ? 'up' : 'down'}`}
							style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)' }}
						/>
					</div>

					{expandedStep === 'local-ollama' && (
						<div style={{ paddingLeft: '44px', paddingTop: '8px', width: '100%' }}>
							<OllamaStatus />
							<div style={{ marginTop: '16px' }}>
								<p style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '12px' }}>
									Ollama runs AI models locally on your machine. Once installed, Antimatter auto-detects available models.
								</p>
								<div style={{ display: 'flex', gap: '8px' }}>
									<button className='am-btn-outline' style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
										<span className='codicon codicon-link-external' style={{ fontSize: '12px' }} />
										Install Ollama
									</button>
									<button className='am-btn-outline' style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
										<span className='codicon codicon-refresh' style={{ fontSize: '12px' }} />
										Re-check
									</button>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Step 3: HuggingFace CLI */}
				<div className='am-wizard-step' style={{
					flexDirection: 'column',
					cursor: 'pointer',
					borderColor: expandedStep === 'hf-cli' ? 'rgba(162,163,233,0.3)' : 'rgba(70,70,80,0.2)',
				}}>
					<div
						style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}
						onClick={() => setExpandedStep(expandedStep === 'hf-cli' ? null : 'hf-cli')}
					>
						<StepBadge number={3} status='idle' />
						<div style={{ flex: 1 }}>
							<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)' }}>HuggingFace CLI</div>
							<div style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginTop: '2px' }}>
								Download and run open-weight models from HuggingFace Hub
							</div>
						</div>
						<span
							className={`codicon codicon-chevron-${expandedStep === 'hf-cli' ? 'up' : 'down'}`}
							style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)' }}
						/>
					</div>

					{expandedStep === 'hf-cli' && (
						<div style={{ paddingLeft: '44px', paddingTop: '8px', width: '100%' }}>
							<HuggingFaceCLIStatus />
						</div>
					)}
				</div>

				{/* Step 4: Choose default model */}
				<div className='am-wizard-step' style={{
					flexDirection: 'column',
					cursor: 'pointer',
					borderColor: expandedStep === 'choose-model' ? 'rgba(162,163,233,0.3)' : 'rgba(70,70,80,0.2)',
				}}>
					<div
						style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}
						onClick={() => setExpandedStep(expandedStep === 'choose-model' ? null : 'choose-model')}
					>
						<StepBadge number={4} status='idle' />
						<div style={{ flex: 1 }}>
							<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)' }}>Choose Your Default Model</div>
							<div style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginTop: '2px' }}>
								Pick the model Antimatter uses by default for all tasks
							</div>
						</div>
						<span
							className={`codicon codicon-chevron-${expandedStep === 'choose-model' ? 'up' : 'down'}`}
							style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)' }}
						/>
					</div>

					{expandedStep === 'choose-model' && (
						<div style={{ paddingLeft: '44px', paddingTop: '16px', width: '100%' }}>
							<p style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '16px' }}>
								Complete at least one of the steps above to see available models.
							</p>
							<div style={{
								padding: '16px',
								backgroundColor: 'var(--am-surface-container)',
								borderRadius: '6px',
								border: '1px dashed rgba(70,70,80,0.3)',
								textAlign: 'center',
								color: 'var(--am-on-surface-variant)',
								fontSize: '13px',
								fontFamily: 'var(--am-font-mono)',
							}}>
								No models configured yet
							</div>
						</div>
					)}
				</div>

			</div>

			{/* Footer CTA */}
			<div style={{
				marginTop: '32px',
				padding: '20px',
				backgroundColor: 'var(--am-surface-container-low)',
				borderRadius: '8px',
				border: '1px solid rgba(70,70,80,0.2)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
				<div>
					<div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)' }}>Ready to start?</div>
					<div style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginTop: '4px' }}>
						Complete setup to unlock the full Antimatter experience
					</div>
				</div>
				<button className='am-btn-primary' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
					Open Model Manager
					<span className='codicon codicon-arrow-right' style={{ fontSize: '12px' }} />
				</button>
			</div>
		</div>
	);
};
