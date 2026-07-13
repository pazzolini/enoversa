/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Manrope', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				bg: '#050505',      // Pure black
				surface: '#121212', // Dark grey
				line: '#222222',    // Dividers
				text: {
					main: '#EAEAEA',
					muted: '#888888',
					dim: '#444444'
				},
				accent: '#D66A57'   // Accessible clay/terracotta
			},
			spacing: {
				'128': '32rem',
			}
		},
	},
	plugins: [],
}
