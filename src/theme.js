import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#757ce8',
      main: '#1db954',
      dark: '#191414',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#ffffff',
      dark: '#191414',
      contrastText: '#000'
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
