module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brown: {
					light: '#b94517',
					DEFAULT: '#8a2b06'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
