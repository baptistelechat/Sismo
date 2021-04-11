// REACT
import React from 'react';
// REDUX
import { connect } from 'react-redux'
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// MATERIAL UI ICON
import LocationOnIcon from '@material-ui/icons/LocationOn';
// COMPONENTS
import CardWind from './card/CardWind1'
import CardSnow from './card/CardSnow1'
import CardSeism from './card/CardSeism1'

// STYLE
const useStyles = makeStyles((theme) => ({
  grid: {
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary
  },
}));

const CardsContainer = ({indexSelected, apiData, geoData, materialTheme}) => {

  const classes = useStyles();

  return (
    <div>
      <ListItem>
        <ListItemIcon><LocationOnIcon color="secondary" fontSize='large'/></ListItemIcon>
        <h2 className={classes.h2}>{
          geoData.length !== 0 ?
            `${geoData.nomCommune}` :
          apiData[indexSelected] === undefined ?
            "Aucune ville sélectionnée" :
          apiData[indexSelected].nomCommune ?
            `${apiData[indexSelected].nomCommune} (${apiData[indexSelected].codePostal})` :
          "Aucune ville sélectionnée"
          }</h2>
      </ListItem>
      
      <Grid container spacing={2} className={classes.grid} >
        <CardWind/>
        <CardSnow/>
        <CardSeism/>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    materialTheme: state.theme,
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    geoData: state.geoApi.city
  }
}

export default connect(mapStateToProps)(CardsContainer);
