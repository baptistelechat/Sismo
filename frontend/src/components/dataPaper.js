import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    height: '20vh',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      height: '15vh',
    },
  },
  grid: {
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
  },
}));

const DataPaper = () => {

  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.grid} >
      <Grid item xs={4} sm={4}>
        <Paper className={classes.paper} elevation={3}>
          Vent
        </Paper>
      </Grid>
      <Grid item xs={4} sm={4}>
        <Paper className={classes.paper} elevation={3}>
          Neige
        </Paper>
      </Grid>
      <Grid item xs={4} sm={4}>
        <Paper className={classes.paper} elevation={3}>
          Sismicité
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DataPaper;
