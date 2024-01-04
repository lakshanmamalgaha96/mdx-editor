import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const cmlBlue = 'rgba(23, 93, 168, 1)';
const cmlBlue4 = 'rgba(181, 189, 233, 1)';
const cmlAsh = 'rgba(128, 140, 163, 1)';
const cmlLightPurple = 'rgba(156, 161, 210, 1)';
const cmlSideBarActive = '#7ed6df';
const cmlSpinnerColor = 'rgb(0, 191, 255)';
const cmlDataCardShadowColor = 'rgb(20 46 110 / 10%)';
const cmlDataCardHoverShadowColor = 'rgb(20 46 110 / 10%)';
const cmlDataTableHeaderColor = 'rgb(128, 140, 163)';

let muiTheme = createTheme();

const ThemeDefault = createTheme({
    palette: {
        cml: {
            main: '#666666',
        },
        common: {
            blue: `${cmlBlue}`,
        },
        primary: {
            light: `${cmlBlue4}`,
            main: `${cmlBlue}`,
        },
        secondary: {
            main: `${cmlLightPurple}`,
        },
        background: {
            default: '#f3f3f3',
        },
        grey: {
            650: `${cmlAsh}`,
        },
        divider: `${cmlBlue4}`,
    },
    typography: {
        fontFamily: ['Open Sans'].join(','),
    },
    mixins: {
        toolbar: {
            minHeight: 75,
            // "@media (min-width: 600px)": {
            //   minHeight: 135,
            // },
            // "@media (min-width: 600px) and (orientation: landscape)": {
            //   minHeight: 80,
            // },
            // "@media (min-width: 900px)": {
            //   minHeight: 114,
            // },
            // "@media (min-width: 1200px)": {
            //   minHeight: 100,
            // },
            // "@media (min-width: 1920px)": {
            //   minHeight: 120,
            // },
            // "@media (min-width: 2560px)": {
            //   minHeight: 145,
            // },
        },
    },
    layouts: {
        auth: {},
        main: {
            padding: muiTheme.spacing(2),
        },
    },
    cml: {
        appContainer: {
            paddingLeft: '40px',
            paddingRight: '40px',
        },
        sideBar: {
            activeItemColor: '#1979DA',
            inactiveItemColor: '#b9b9b9',
        },
        pageHeading: {
            fontWeight: '600',
            fontStyle: 'normal',
            fontSize: '30px',
            lineHeight: '41px',
        },
        spinner: {
            color: cmlSpinnerColor,
        },
        dataCard: {
            backgroundColor: 'lightgreen',
            bookmarkColor: 'grey',
            innerPadding: '0.3em',
            // boxShadow: `0px 2px 8px ${cmlDataCardShadowColor}`,
            // hoverBoxShadow: `1px 1px 1px 1px ${cmlDataCardHoverShadowColor}`,
            borderRadius: '0.625em',
        },
        dataTable: {
            headerFontColor: cmlDataTableHeaderColor,
        },
    },
});

export default responsiveFontSizes(ThemeDefault);
