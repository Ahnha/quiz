import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: purple[500], // mov modern
        },
        secondary: {
            main: purple[300],
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
    },
});

export default theme;
