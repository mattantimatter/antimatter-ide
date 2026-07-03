/*--------------------------------------------------------------------------------------
 *  Antimatter IDE — Welcome Screen
 *  Shown when no file/folder is open. Clean Cursor-style layout:
 *  Antimatter logo mark centered, keyboard shortcuts listed below.
 *  No model manager, no system specs, no daemon logs.
 *--------------------------------------------------------------------------------------*/

import React from 'react';
import '../styles.css';

interface ShortcutItem {
	label: string;
	keys: string[];
}

const SHORTCUTS: ShortcutItem[] = [
	{ label: 'New Agent',        keys: ['⇧', '⌘', 'L'] },
	{ label: 'Show Terminal',    keys: ['⌘', 'J'] },
	{ label: 'Search Files',     keys: ['⌘', 'P'] },
	{ label: 'Open Browser',     keys: ['⇧', '⌘', 'B'] },
	{ label: 'Maximize Chat',    keys: ['⌥', '⌘', 'E'] },
	{ label: 'Add Repository',   keys: ['⌥', '⌘', 'A'] },
];

export const AntimatterWelcome = () => {
	return (
		<div
			className='@@void-scope'
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'var(--am-background)',
				fontFamily: 'var(--am-font-sans)',
				color: 'var(--am-on-surface)',
				userSelect: 'none',
			}}
		>
			{/* Logo mark */}
			<div style={{
				width: '72px', height: '72px',
				borderRadius: '16px',
				background: 'linear-gradient(135deg, rgba(162,163,233,0.12) 0%, rgba(162,163,233,0.04) 100%)',
				border: '1px solid rgba(162,163,233,0.15)',
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				marginBottom: '48px',
			}}>
				<svg width='36' height='36' viewBox='0 0 36 36' fill='none'>
					<circle cx='18' cy='18' r='13' stroke='rgba(162,163,233,0.5)' strokeWidth='1.5' fill='none' />
					<circle cx='18' cy='18' r='5' fill='rgba(162,163,233,0.7)' />
					<circle cx='18' cy='5'  r='2' fill='rgba(162,163,233,0.3)' />
					<circle cx='18' cy='31' r='2' fill='rgba(162,163,233,0.3)' />
					<circle cx='5'  cy='18' r='2' fill='rgba(162,163,233,0.3)' />
					<circle cx='31' cy='18' r='2' fill='rgba(162,163,233,0.3)' />
				</svg>
			</div>

			{/* Shortcuts */}
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				alignItems: 'flex-start',
			}}>
				{SHORTCUTS.map(shortcut => (
					<div
						key={shortcut.label}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: '48px',
							width: '280px',
						}}
					>
						<span style={{
							fontSize: '13px',
							color: 'var(--am-on-surface-variant)',
							fontFamily: 'var(--am-font-sans)',
						}}>
							{shortcut.label}
						</span>
						<div style={{ display: 'flex', gap: '4px' }}>
							{shortcut.keys.map((key, i) => (
								<kbd
									key={i}
									style={{
										padding: '2px 6px',
										backgroundColor: 'var(--am-surface-container)',
										border: '1px solid rgba(70,70,80,0.3)',
										borderRadius: '3px',
										fontSize: '11px',
										fontFamily: 'var(--am-font-mono)',
										color: 'var(--am-on-surface-variant)',
										lineHeight: '18px',
									}}
								>
									{key}
								</kbd>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
