/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Indexing & Docs Tab
 *--------------------------------------------------------------------------------------*/

import React, { useState } from 'react';

export const AntimatterIndexingTab = () => {
	const [indexProgress] = useState(100);
	const [fileCount] = useState(0);
	const [autoIndex, setAutoIndex] = useState(true);

	return (
		<div>
			<h1 style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--am-font-sans)', color: 'var(--am-on-surface)', marginBottom: '8px' }}>
				Indexing & Docs
			</h1>
			<p style={{ fontSize: '14px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)', marginBottom: '32px' }}>
				Embed your codebase for improved contextual understanding and knowledge.
			</p>

			{/* Codebase indexing */}
			<div style={{ marginBottom: '8px', fontSize: '12px', fontFamily: 'var(--am-font-mono)', color: 'var(--am-on-surface-variant)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
				Codebase
			</div>

			<div className='am-settings-card' style={{ marginBottom: '16px' }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
					<h3>Codebase Indexing</h3>
					<span className='codicon codicon-question' style={{ fontSize: '13px', color: 'var(--am-on-surface-variant)', cursor: 'help' }} />
				</div>
				<p>Embed codebase for improved contextual understanding and knowledge. Embeddings and metadata are stored in the cloud, but all code is stored locally.</p>

				{fileCount > 0 ? (
					<>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', marginTop: '16px' }}>
							<span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--am-on-surface)' }}>{indexProgress}%</span>
							<span style={{ fontSize: '12px', color: 'var(--am-on-surface-variant)', fontFamily: 'var(--am-font-mono)' }}>{fileCount} files</span>
						</div>
						<div style={{ height: '4px', backgroundColor: 'var(--am-surface-container-high)', borderRadius: '2px', overflow: 'hidden' }}>
							<div style={{ height: '100%', width: `${indexProgress}%`, backgroundColor: 'var(--am-primary-container)', borderRadius: '2px', transition: 'width 0.3s' }} />
						</div>
						<div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
							<button className='am-btn-outline' style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
								<span className='codicon codicon-refresh' style={{ fontSize: '12px' }} />
								Sync
							</button>
							<button className='am-btn-outline' style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--am-error)' }}>
								<span className='codicon codicon-trash' style={{ fontSize: '12px' }} />
								Delete Index
							</button>
						</div>
					</>
				) : (
					<div style={{
						marginTop: '16px',
						padding: '24px',
						backgroundColor: 'var(--am-surface-container)',
						borderRadius: '6px',
						textAlign: 'center',
						color: 'var(--am-on-surface-variant)',
						fontSize: '13px',
						fontFamily: 'var(--am-font-mono)',
					}}>
						Open a folder to start indexing
					</div>
				)}
			</div>

			<div className='am-settings-card' style={{ marginBottom: '16px' }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div>
						<h3 style={{ marginBottom: '4px' }}>Index New Folders</h3>
						<p>Automatically index any new folders with fewer than 50,000 files</p>
					</div>
					<button
						onClick={() => setAutoIndex(!autoIndex)}
						style={{
							width: '40px', height: '22px', borderRadius: '11px',
							backgroundColor: autoIndex ? 'var(--am-primary-container)' : 'var(--am-surface-container-high)',
							border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background-color 0.2s',
						}}
					>
						<div style={{
							width: '16px', height: '16px', borderRadius: '50%',
							backgroundColor: autoIndex ? '#0a0a0a' : 'var(--am-on-surface-variant)',
							position: 'absolute', top: '3px', left: autoIndex ? '21px' : '3px', transition: 'left 0.2s',
						}} />
					</button>
				</div>
			</div>

			<div className='am-settings-card'>
				<h3>Ignore Files</h3>
				<p>Files to exclude from indexing in addition to .gitignore.</p>
				<button className='am-btn-outline' style={{ marginTop: '4px' }}>Edit</button>
			</div>
		</div>
	);
};
