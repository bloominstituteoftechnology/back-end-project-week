const core = {
    spacing: 8,
    palette: {
        primary: {
            main: 'rgba(0, 175, 73, 1)',
            transparent: 'rgba(0, 175, 73, 0.5)',
            dark: 'rgba(0, 104, 25, 1)'
        },
        secondary: {
            main: 'rgba(224, 224, 224, 1)',
            transparent: 'rgba(224, 224, 224, 0.7)',
            dark: 'rgba(174, 174, 174, 1)'
        },
        white: 'rgba(250, 250, 250, 1)'
    },
    boxShadow: '1px 1px 1px #009624'
}

const theme = {
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
            boxShadow: core.boxShadow,
            cursor: 'pointer',
        },
        secondary: {
            color: core.palette.secondary.transparent,
            borderRadius: '50%',
            height: core.spacing * 4,
            width: core.spacing * 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        }
    },
    tooltip: {
        backgroundColor: core.palette.secondary.transparent,
        color: core.palette.white,
        borderRadius: 2,
        fontSize: '0.8em',
        padding: '3px 5px'
    }
}

export default theme;