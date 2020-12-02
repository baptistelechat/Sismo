import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import DefaultPin from '../img/pin.svg'

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


const ReactMap = (props) => {

  const classes = useStyles();

  const defaultPosition = [46.539006,2.4298391];
  
  let DefaultIcon = L.icon({
    iconUrl: DefaultPin,
    iconRetinaUrl: DefaultPin,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: 30,
    // className: 'leaflet-div-icon'
  });
  
  return (
    <Grid container spacing={2} className={classes.grid} >
      <MapContainer
        center={defaultPosition}
        zoom={6}
        style={{height: '82vh', width: '100%'}}
        scrollWheelZoom={true}
      >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {props.data[0] !== 'Aucune valeur correspondante à votre recherche' ? props.data.map((cities, index) => 
            <Marker key={index}
              position={[cities.Latitude, cities.Longitude]}
              icon={DefaultIcon}
              eventHandlers ={{
                click: (e) => {
                  const selectedCity = props.data[index]
                  props.choice(selectedCity)
                  console.log(index)
                  console.log(selectedCity)
                },
              }}>
              <Popup>
                <h3>{`${cities.Nom_commune} (${cities.Code_postal})`}</h3>
                <p>{`Vent : ${cities.Vent}`}</p>
                <p>{`Neige : ${cities.Neige}`}</p>
                <p>{`Séisme : ${cities.Seisme}`}</p>
              </Popup>
            </Marker>) : null}
      </MapContainer>
    </Grid>
  );
}

export default ReactMap;
