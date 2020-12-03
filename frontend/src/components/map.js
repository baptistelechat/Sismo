import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import DefaultPin from '../img/icon/pin.svg'
import Abak from '../img/icon/abak-ingenierie.png'
import Anjou from '../img/icon/anjou-structure.png'
import Pezzo from '../img/icon/pezzo-ingenierie.png'
import Exetera from '../img/icon/exetera-ingenierie.png'
import Grif from '../img/icon/grif.png'
import UdtStr from '../img/icon/123-structure.png'

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
  
  const DefaultIcon = L.icon({
    iconUrl: DefaultPin,
    iconRetinaUrl: DefaultPin,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: 30,
  });

  const AbakIcon = L.icon({
    iconUrl: Abak,
    iconRetinaUrl: Abak,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [30,32.1],
  });

  const AnjouIcon = L.icon({
    iconUrl: Anjou,
    iconRetinaUrl: Anjou,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [42.5,25],
  });

  const PezzoIcon = L.icon({
    iconUrl: Pezzo,
    iconRetinaUrl: Pezzo,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [30,39.9],
  });

  const ExeteraIcon = L.icon({
    iconUrl: Exetera,
    iconRetinaUrl: Exetera,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [40,25],
  });

  const GrifIcon = L.icon({
    iconUrl: Grif,
    iconRetinaUrl: Grif,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [40.2,30],
  });

  const UdtStrIcon = L.icon({
    iconUrl: UdtStr,
    iconRetinaUrl: UdtStr,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: 45,
  });

  const company = [
    {"name": "ABAK Ingénierie Nantes", "position": [47.1948929,-1.5342012], "adress": "34 boulevard Joliot Curie", "cp": 44200,  "city": "NANTES", "size": 30, "icon": AbakIcon},
    {"name": "ABAK Ingénierie Challans", "position": [46.834533,-1.880718], "adress": "48 rue Jean Perrin", "cp": 85300,  "city": "CHALLANS", "size": 30, "icon": AbakIcon},
    {"name": "ABAK Ingénierie Aquitaine", "position": [44.8828594,-0.6108314], "adress": "26 avenue de l’Europe", "cp": 33520,  "city": "BRUGES", "size": 30, "icon": AbakIcon},
    {"name": "ABAK Ingénierie Provence", "position": [43.5455061,5.3599446], "adress": "190 rue Corindon", "cp": 13150,  "city": "EGUILLES", "size": 30, "icon": AbakIcon},
    {"name": "ABAK Ingénierie IDF", "position": [48.852263,2.516225], "adress": "6 rue Vincent Van Gogh", "cp": 93360,  "city": "PARIS", "size": 30, "icon": AbakIcon},
    {"name": "ABAK Ingénierie Clisson", "position": [47.0869951,-1.2830758], "adress": "18 Venelle de l’Escarpe", "cp": 44190,  "city": "CLISSON", "size": 30, "icon": AbakIcon},
    {"name": "ABAK Ingénierie Lyon", "position": [45.7135679,4.8892344], "adress": "15 rue Marcel Pagnol", "cp": 69200,  "city": "VENISSIEUX", "size": 30, "icon": UdtStrIcon},
    {"name": "ABAK Ingénierie Toulouse", "position": [43.6044622,1.4442469], "adress": "", "cp": 31000,  "city": "TOULOUSE", "size": 30, "icon": AbakIcon},
    {"name": "ABAK Ingénierie Tours", "position": [47.3900474,0.6889268], "adress": "", "cp": 37000,  "city": "TOURS", "size": 30, "icon": AbakIcon},
    {"name": "ANJOU Structure", "position": [47.4723274,-0.6111125], "adress": "9 rue Joseph Fourier", "cp": 49070,  "city": "BEAUCOUZE", "size": 30, "icon": AnjouIcon},
    {"name": "PEZZO Ingénierie", "position": [47.2859271,-2.2963234], "adress": "39 Route de Fondeline", "cp": 44600,  "city": "ST NAZAIRE", "size": 30, "icon": PezzoIcon},
    {"name": "EXETERA Ingénierie", "position": [47.298918,-1.757653], "adress": "ZA du Bois de la Noue", "cp": 44360,  "city": "ST ETIENNE DE MONTLUC", "size": 30, "icon": ExeteraIcon},
    {"name": "GRIF", "position": [48.852263,2.516225], "adress": "6 Rue Vincent Van Gogh", "cp": 93360,  "city": "NEUILLY PLAISANCE", "size": 30, "icon": GrifIcon},
  ];

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
          {true ? company.map((company, index) => 
            <Marker key={index}
              position={company.position}
              icon={company.icon}>
              <Popup>
                <h3>{company.name}</h3>
                <p>{company.adress}</p>
                <p>{company.cp} {company.city}</p>
              </Popup>
            </Marker>) : null}
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
