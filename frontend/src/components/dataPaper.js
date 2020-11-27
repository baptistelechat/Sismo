import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    height: '20vh',
    color: theme.palette.text.primary,
  },
  grid: {
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
  },
  h2: {
    marginTop: theme.spacing(1)
  }
}));

const DataPaper = (props) => {

  const classes = useStyles();

  return (
    <div>
      <ListItem >
        <ListItemIcon><LocationOnIcon color="secondary" fontSize='large'/></ListItemIcon>
        <h2 className={classes.h2}>{props.data.Nom_commune ? `${props.data.Nom_commune} (${props.data.Code_postal})` : 'Aucune ville sélectionnée'}</h2>
      </ListItem>
      <Grid container spacing={2} className={classes.grid} >
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper} elevation={3}>
            {props.data.Vent ? 'Vent : '+props.data.Vent : 'Vent : -'}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper} elevation={3}>
          {props.data.Neige ? 'Neige : '+props.data.Neige : 'Neige : -'}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper} elevation={3}>
          {props.data.Seisme ? 'Seisme : '+props.data.Seisme : 'Seisme : -'}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DataPaper;
