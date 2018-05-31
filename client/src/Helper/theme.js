import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: 'rgba(250, 250, 250, 0.5)',
            main: 'rgba(250, 250, 250, 0.8)',
        },
        secondary: {
            light: '#ffdd4b',
            main: '#ffab00',
        }
    },
    typography: {
        htmlFontSize: '62.5%'
    },
});

export default theme;