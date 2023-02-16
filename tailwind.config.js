/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#973cc1",
					secondary: "#c4b5fd",
					accent: "#d8b4fe",
					neutral: "#23222A",
					"base-100": "#303640",
					info: "#7183E0",
					success: "#84cc16",
					warning: "#DDBB13",
					error: "#E21D2A",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
