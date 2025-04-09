// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A90A4", // Replace with your primary color
    },
    secondary: {
      main: "#D98E04", // Replace with your secondary color
    },
    tertiary: {
      main: "#7B6F8E",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    // Add more custom styles if needed
  },
});

export default theme;
