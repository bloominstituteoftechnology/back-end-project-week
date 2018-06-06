const core = {
    spacing: 8,
    palette: {
        primary: {
            main: 'rgba(0, 175, 73, 1)',
            transparent: 'rgba(0, 175, 73, 0.5)',
            dark: 'rgba(0, 104, 25, 1)'
        },
        secondary: {
            main: 'rgba(174, 174, 174, 1)',
            transparent: 'rgba(174, 174, 174, 0.7)',
            dark: 'rgba(174, 174, 174, 1)'
        },
        orange: {
            main: 'rgba(255,98,0,1)',
            dark: 'rgba(122, 45, 0, 1)'
        },
        yellow: {
            main: 'rgba(255, 254, 219, 1)',
            dark: 'rgba(222, 221, 191, 1)',
        },
        white: 'rgba(250, 250, 250, 1)'
    },
    boxShadow: '1px 1px 1px #009624'
}

const theme = {
    spacing: 8,
    button: {
        primary: {
            backgroundColor: core.palette.primary.main,
            color: core.palette.white,
            borderRadius: '50%',
            height: core.spacing * 6,
            width: core.spacing * 6,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        },
        secondary: {
            color: core.palette.secondary.main,
            borderRadius: '50%',
            height: core.spacing * 4,
            width: core.spacing * 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
                color: core.palette.secondary.main,
            }
        },
    },
    tooltip: {
        backgroundColor: core.palette.secondary.main,
        color: core.palette.white,
        borderRadius: 2,
        fontSize: '0.8em',
        padding: '3px 5px'
    },
    note: {
        backgroundColor: core.palette.yellow.main,
        padding: core.spacing * 2,
        // border: '2px solid black',
        borderRadius: 4,
        boxShadow: `0 0 3px 1px ${core.palette.yellow.dark}`,
        width: '20%',
        marginTop: core.spacing * 2,
        height: core.spacing * 30,
    }
}

export default theme;