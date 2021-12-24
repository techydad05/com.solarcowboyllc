import { createTheme } from '@mui/material/styles';
import { blue, indigo, red, green } from '@mui/material/colors';
import darkScrollbar from '@mui/material/darkScrollbar';

const defaultTheme = createTheme()

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: defaultTheme.palette.mode === 'dark' ? darkScrollbar() : null,
      },
    },
  },
  palette: {
    primary: {
      main: green.A700,
    },
    secondary: {
      main: blue[500],
    },
    error: {
      main: red[100],
    },
    menuContainer: "#FFFFFF",
  },
  text: {
    primary: {
      dark: '#000000',
      light: '#FFFFFF',
    }
  },
});

export default theme;

