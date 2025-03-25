// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Replace with your primary color
    },
    secondary: {
      main: "#dc004e", // Replace with your secondary color
    },
    background: {
      default: "#f5f5f5", // Optional
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
