import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles((theme) => ({
  grid: {
    paddingTop:theme.spacing(1),
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
  },

  map: {
    [theme.breakpoints.down('sm')]: {
      height: '130vh',
    },
    [theme.breakpoints.down('md')]: {
      height: '130vh',
    },
  }
}));

const ReactMap = () => {

  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState('');

  const position = [47.2028927,-1.5434697]
  
  return (
    <Grid container spacing={2} className={classes.grid} >
      <MapContainer
        center={position}
        zoom={15}
        style={{height: '80vh', width: '100%'}}
        scrollWheelZoom={true}
      >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Grid>
  );
}

export default ReactMap;
