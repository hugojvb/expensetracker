import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#010D70",
		},
		secondary: {
			main: "#005cb9",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
	typography: {
		fontFamily: ["Roboto", "sans-serif"].join(","),
	},
});

export default theme;
