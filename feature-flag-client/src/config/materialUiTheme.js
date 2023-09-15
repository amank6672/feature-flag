import { blue, grey, indigo } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: "ligth",
        primary: {
            main: indigo[900],
        },
        secondary: {
            main: blue[300],
        },
        background: {
            default: grey[50]
        },
        
    },
    typography: {
        fontFamily: 'Roboto',
        fontSize: 15,
    },
});

export default theme;