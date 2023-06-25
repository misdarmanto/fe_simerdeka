import { createTheme } from "@mui/material/styles";

export const themeConfig = createTheme({
	palette: {
		primary: {
			main: "#DAA520",
		},
		secondary: {
			main: "#fefcbf",
		},
	},

	typography: {
		h1: {
			color: "#25265e",
		},
		h2: {
			color: "#25265e",
		},
		h3: {
			color: "#25265e",
		},
		h4: {
			color: "#25265e",
		},
		h5: {
			color: "#25265e",
		},
		h6: {
			color: "#25265e",
		},
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});
