// import './App.css';
import CitiesList from './components/citiesList'
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SearchAppBar from './components/searchAppBar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    height:"82vh",
    [theme.breakpoints.down('sm')]: {
      height: "135vh",
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
          <Paper className={classes.paper} elevation={3}>
            <CitiesList data={searchValue}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatem accusantium iste totam facilis quas, magnam facere culpa voluptatum excepturi ad saepe eligendi suscipit nobis enim natus, debitis dolorem evenietLorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatem accusantium iste totam facilis quas, magnam facere culpa voluptatum excepturi ad saepe eligendi suscipit nobis enim natus, debitis dolorem evenietLorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatem accusantium iste totam facilis quas, magnam facere culpa voluptatum excepturi ad saepe eligendi suscipit nobis enim natus, debitis dolorem evenietLorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatem accusantium iste totam facilis quas, magnam facere culpa voluptatum excepturi ad saepe eligendi suscipit nobis enim natus, debitis dolorem eveniet!</Paper>
        </Grid>
      </Grid>
      
    </div>
  );
}

export default App;
