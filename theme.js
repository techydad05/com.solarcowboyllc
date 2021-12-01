import { createTheme } from '@mui/material/styles';
import { blue, indigo, red } from '@mui/material/colors';
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
      main: indigo.A200,
    },
    secondary: {
      main: blue[500],
    },
    error: {
      main: red[100],
    },
  },
});

export default theme;

