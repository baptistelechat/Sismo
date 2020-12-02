// import './App.css';
import CitiesList from './components/citiesList'
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SearchAppBar from './components/searchAppBar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReactMap from './components/map';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight:theme.spacing(3),
    paddingLeft:theme.spacing(3),
  },
  paperL: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
    color: theme.palette.text.primary,
    height:"79vh",
    [theme.breakpoints.down('sm')]: {
      height: "130vh",
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
    height:"79vh",
    [theme.breakpoints.down('sm')]: {
      height: "70vh",
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(15),
    },
  },
}));

function App() {
  
  const classes = useStyles();

  const [searchValue, setSearchValue] = React.useState([]);

  return (
    <div className="App">
      <SearchAppBar data={setSearchValue}/>
      <Grid container spacing={2} className={classes.grid} style={{margin: 0,width: '100%'}}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperL} elevation={3}>
            <CitiesList data={searchValue}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paperR} elevation={3}>
            <ReactMap data={searchValue}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
