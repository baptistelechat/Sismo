import React from "react";
import { connect } from 'react-redux'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchAppBar from './components/SearchAppBar1'
import CitiesList from './components/CitiesList1'
import ReactMap from './components/Map1';
import CardsContainer from './components/CardsContainer1'
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import Toolbox from './components/Toolbox1'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    background: theme.palette.background.default,
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(2),
    paddingRight:theme.spacing(3),
    paddingLeft:theme.spacing(3),
    [theme.breakpoints.between('xs', 'sm')]: {
      paddingTop: theme.spacing(10),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingTop: theme.spacing(12),
    },
  },
  paperL: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
    height:"84vh",
    [theme.breakpoints.down('sm')]: {
      height: "155vh",
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(22),
    },
  },
  paperR: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
    height:"84vh",
    [theme.breakpoints.down('sm')]: {
      height: "70vh",
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(22),
    },
  },
}));

function App({materialTheme, indexSelected, apiData, geoData}) {
  
  const classes = useStyles();

  const muiTheme = createMuiTheme({
      palette: {
        type : materialTheme.type,
        primary: {
          main: materialTheme.mainPrimaryColor
        },
        secondary: {
          main: materialTheme.mainSecondaryColor
        }
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          tablet:670,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
    }
  );

  return (
      <ThemeProvider theme={muiTheme}>
        <Helmet>
          <title>
            {
              geoData.length !== 0 ? 
              `Sismo | ${geoData.nomCommuneExact}` :
              indexSelected !== -1 ?
              `Sismo | ${apiData[indexSelected].nomCommuneExact} (${apiData[indexSelected].codePostal})` :
              apiData.length === 1 ? `Sismo | ${apiData.length} résultat trouvé` :
              apiData.length > 0 ? `Sismo | ${apiData.length} résultats trouvés` :
              "Sismo"
            }
          </title>
          <meta name="description" content="Un outil pour obtenir les zones de neige, de vent et de sismicité en France (y compris DROM-COM)"/>
          <meta name="google-site-verification" content="dUKJG55WfbB-QT1tXN_oHcktXdsSLnP3lYEI5XKDKOI"/>
        </Helmet>
        <Toaster
          position="bottom-right"
          reverseOrder={true}
        />
        <SearchAppBar/>
        <Grid container spacing={2} className={classes.grid} style={{margin: 0,width: '100%', background: materialTheme.background}}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperL} elevation={3}>
              <CitiesList/>
              <CardsContainer/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperR} elevation={3}>
              <ReactMap/>
            </Paper>
          </Grid>
        </Grid>
        <Toolbox/>
      </ThemeProvider>
);
}

const mapStateToProps = (state) => {
  return {
    materialTheme: state.theme,
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    geoData: state.geoApi.city
  }
}


export default connect(mapStateToProps)(App);