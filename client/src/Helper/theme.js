const core = {
    spacing: 8,
    palette: {
        primary: {
            main: 'rgba(0, 175, 73, 1)',
            transparent: 'rgba(0, 175, 73, 0.5)',
            dark: 'rgba(0, 104, 25, 1)'
        },
        secondary: {
            light: 'rgba(190, 190, 190, 1)',
            main: 'rgba(174, 174, 174, 1)',
            transparent: 'rgba(174, 174, 174, 0.7)',
            dark: 'rgba(132,132,132, 1)'
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
    palette: core.palette,
    noteInput: {
        border: 'none',
        background: 'none',
        width: '100%',
        paddingBottom: '0.9em'
    },
    formInput: {
        borderRadius: core.spacing / 2,
        boxShadow: `0 0 3px 1px ${core.palette.yellow.dark}`,
        border: 'none',
        width: '100%',
        padding: core.spacing,
        marginBottom: core.spacing
    },
    textarea: {
        border: 'none',
        background: 'none',
        width: '100%',
        paddingBottom: '0.9em',
        resize: 'none'
    },
    typography: {
        h4: {
            fontSize: '1.2em',
            fontWeight: 'bold'
        }
    },
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
        third: {
            color: core.palette.secondary.main,
            borderRadius: '50%',
            height: core.spacing * 6,
            width: core.spacing * 6,
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
        borderRadius: core.spacing / 2,
        boxShadow: `0 0 3px 1px ${core.palette.yellow.dark}`,
        margin: core.spacing * 2,
        height: core.spacing * 30,
        textAlign: 'left',
    },
    selectedNoteWrapper: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    selectedNote: {
        backgroundColor: core.palette.yellow.main,
        padding: core.spacing * 2,
        borderRadius: 4,
        boxShadow: `0 0 3px 1px ${core.palette.yellow.dark}`,
        height: '50vh',
        width: '50vw',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column'
    },
    sideBar: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        padding: core.spacing * 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: core.palette.secondary.light,
        boxShadow: `inset 3px -3px 10px 0 ${core.palette.secondary.main}`,
    },
    tag: {
        backgroundColor: core.palette.yellow.main,
        padding: core.spacing,
        // border: '2px solid black',
        borderRadius: 4,
        boxShadow: `0 0 3px 1px ${core.palette.secondary.dark}`,
        margin: core.spacing,
        height: core.spacing * 5,
        textAlign: 'left',
    },
    inputTag: {
        width: '100%',
        border: 'none'
    }

}

export default theme;