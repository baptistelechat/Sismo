import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import store from './redux/store'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchAppBar from './components/searchAppBar'
import CitiesList from './components/citiesList'
import ReactMap from './components/map';
import DataPaper from './components/dataPaper'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
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
    color: theme.palette.text.primary,
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
    color: theme.palette.text.primary,
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

function App() {
  
  const classes = useStyles();

  return (
    <Provider className="App" store={store}>
      <SearchAppBar/>
      <Grid container spacing={2} className={classes.grid} style={{margin: 0,width: '100%'}}>
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
    </Provider>
  );
}

export default App;
