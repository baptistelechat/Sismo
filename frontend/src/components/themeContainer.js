import React from "react";
import { connect } from 'react-redux'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchAppBar from './searchAppBar'
import CitiesList from './citiesList'
import ReactMap from './map';
import DataPaper from './dataPaper'

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
      paddingTop: theme.spacing(18),
    },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingTop: theme.spacing(12),
    },
  },
  paperL: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
    height:"84vh",
    [theme.breakpoints.down('sm')]: {
      height: "133vh",
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(20),
    },
  },
  paperR: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
    height:"84vh",
    [theme.breakpoints.down('sm')]: {
      height: "70vh",
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(20),
    },
  },
}));

function ThemeContainer({materialTheme}) {
  
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
      }
    }
  );

  return (
      <ThemeProvider theme={muiTheme}>
        <SearchAppBar/>
        <Grid container spacing={2} className={classes.grid} style={{margin: 0,width: '100%', background: materialTheme.background}}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperL} elevation={3}>
              <CitiesList/>
              <DataPaper/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperR} elevation={3}>
              <ReactMap/>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
);
}

const mapStateToProps = (state) => {
  return {
    materialTheme: state.theme,
  }
}


export default connect(mapStateToProps)(ThemeContainer);
