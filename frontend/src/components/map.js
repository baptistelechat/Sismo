// REACT
import React, { useRef, useEffect, useState }from 'react';
// REDUX
import { connect } from 'react-redux'
import { setIndex } from '../redux/indexSelected/actionIndexSelected'
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// LEAFLET
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer, FeatureGroup} from "react-leaflet";
// OTHER
import toast from 'react-hot-toast'
// COMPONENTS
import Georisques from './georisques'
// PICTURE
import DefaultPin from '../img/pin/pinDefault.svg'
import SelectedPin from '../img/pin/pinSelected.svg'
import BigCities from '../img/pin/pinBigCities.svg'

// STYLE
const useStyles = makeStyles((theme) => ({
  grid: {
    paddingTop:theme.spacing(1),
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
  },
  switch: {
    marginBottom: theme.spacing(1)
  },
  formControlLabel: {
    color: theme.palette.text.primary
  }
}));

const ReactMap = ({indexSelected, apiData, setIndex, materialTheme}) => {

  const layerGroupRef = useRef();
  const mapRef = useRef(null);

  const classes = useStyles();

  const [showBigCities, setShowBigCities] = useState(true);

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

  const SelectedIcon = L.icon({
    iconUrl: SelectedPin,
    iconRetinaUrl: SelectedPin,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: 30,
  });

  const BigCitiesIcon = L.icon({
    iconUrl: BigCities,
    iconRetinaUrl: BigCities,
    iconAnchor: null,
    popupAnchor: [0,-15],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: 30,
  });

  const bigCities = [
    {"name": "Strasbourg", "position": [48.5734798,7.7483326], "icon": BigCitiesIcon, "state": "Grand Est", "vent":"2", "neige":"C1", "seisme":"3"},
    {"name": "Bordeaux", "position": [44.8457407,-0.6159378], "icon": BigCitiesIcon, "state": "Nouvelle-Aquitaine", "vent":"1", "neige":"A1", "seisme":"2"},
    {"name": "Lyon", "position": [45.756295,4.8219779], "icon": BigCitiesIcon, "state": "Auvergne-Rhône-Alpes", "vent":"2", "neige":"A2", "seisme":"2"},
    {"name": "Dijon", "position": [47.3218551,5.039368], "icon": BigCitiesIcon, "state": "Bourgogne-Franche-Comté", "vent":"1", "neige":"A1", "seisme":"1"},
    {"name": "Toulouse", "position": [43.6045845,1.4417641], "icon": BigCitiesIcon, "state": "Occitanie", "vent":"1", "neige":"A2", "seisme":"1"},
    {"name": "Lille", "position": [50.6317096,3.0686861], "icon": BigCitiesIcon, "state": "Hauts-de-France", "vent":"3", "neige":"A1", "seisme":"2"},
    {"name": "Rouen", "position": [49.4449232,1.0561541], "icon": BigCitiesIcon, "state": "Normandie", "vent":"2", "neige":"A1", "seisme":"1"},
    {"name": "Rennes", "position": [48.1117198,-1.6830272], "icon": BigCitiesIcon, "state": "Bretagne", "vent":"2", "neige":"A1", "seisme":"2"},
    {"name": "Orléans", "position": [47.8990671,1.9031459], "icon": BigCitiesIcon, "state": "Centre-Val de Loire", "vent":"2", "neige":"A1", "seisme":"1"},
    {"name": "Paris", "position": [48.8588589,2.3264165], "icon": BigCitiesIcon, "state": "Île-de-France", "vent":"2", "neige":"A1", "seisme":"1"},
    {"name": "Nantes", "position": [47.2179379,-1.5567006], "icon": BigCitiesIcon, "state": "Pays de la Loire", "vent":"3", "neige":"A1", "seisme":"3"},
    {"name": "Marseille", "position": [43.2969942,5.3620563], "icon": BigCitiesIcon, "state": "Provence-Alpes-Côte d’Azur", "vent":"2", "neige":"A2", "seisme":"3"},
    {"name": "Ajaccio", "position": [41.9193354,8.7368399], "icon": BigCitiesIcon, "state": "Corse", "vent":"3", "neige":"A2", "seisme":"1"},

    {"name": "Pointe-à-Pitre", "position": [16.2410492,-61.5355473], "icon": BigCitiesIcon, "state": "Guadeloupe", "vent":"5", "neige":"0", "seisme":"5"},
    {"name": "Saint-Denis", "position": [-20.8964595,55.4350018], "icon": BigCitiesIcon, "state": "Réunion", "vent":"5", "neige":"0", "seisme":"2"},
    {"name": "Mamoudzou", "position": [-12.7805816,45.2302623], "icon": BigCitiesIcon, "state": "Mayotte", "vent":"5", "neige":"0", "seisme":"3"},
    {"name": "Cayenne", "position": [4.9381385,-52.3372119], "icon": BigCitiesIcon, "state": "Guyane", "vent":"1", "neige":"0", "seisme":"1"},
    {"name": "Fort-de-France", "position": [14.6078336,-61.0758571], "icon": BigCitiesIcon, "state": "Martinique", "vent":"5", "neige":"0", "seisme":"5"},
    {"name": "Saint-Pierre", "position": [46.7818297,-56.1764619], "icon": BigCitiesIcon, "state": "Saint-Pierre-et-Miquelon", "vent":"1", "neige":"0", "seisme":"1"},
    {"name": "Papeete", "position": [-17.5373218,-149.5659196], "icon": BigCitiesIcon, "state": "Polynésie française", "vent":"-", "neige":"-", "seisme":"-"},
    {"name": "Nouméa", "position": [-22.2703661,166.4369939], "icon": BigCitiesIcon, "state": " Nouvelle-Calédonie", "vent":"-", "neige":"-", "seisme":"-"},
  ];

  const companyVisibility = () => {
    setShowBigCities(!showBigCities)
  }

  const handleMarkerClick = (index) => {
    setIndex(index)
    toastOutput(index)
  }

  const toastOutput = (index) => {
    if (apiData[index].vent === "-") {
      toast.error(
        `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) - Données indisponible.`,
        {duration: 5000,
          style: {
            background: '#e57373',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#b71c1c',
            secondary: '#FFFFFF'
          }
        }
      )
    } else if (apiData[index].vent === "x") {
      toast.error(
        `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) - Ancienne commune française sélectionnée. Données indisponible.`,
        {duration: 5000,
          style: {
            background: '#ffb74d',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#e65100',
            secondary: '#FFFFFF'
          }
        }
      )
    } else {
      toast.success(
        `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) sélectionnée`,
        {duration: 5000,
          icon: '🏡',
          style: {
            background: materialTheme.toastColor,
            color: '#FFFFFF',
          },
        }
      )
    }
  }

  const handleCompanyClick = (bigCities) => {
    toast.success(
      `${bigCities.name} - ${bigCities.state}`,
      {duration: 5000,
        icon: '🏡',
        style: {
          background: "#a1887f",
          color: '#FFFFFF',
        },
      }
    )
  }

  useEffect(() => {
    if (apiData[0] !== undefined) {
      const map = mapRef.current.leafletElement;
      const layerGroup = layerGroupRef.current.leafletElement;
      const bounds = layerGroup.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
    } 
  })

  return (
    <Grid container spacing={2} className={classes.grid}>
      <FormControl component="fieldset" className={classes.switch}>
        <FormControlLabel
          className={classes.formControlLabel}
          value="start"
          control={<Switch color="secondary" checked={showBigCities} onChange={companyVisibility}/>}
          label="Afficher les grandes villes"
          labelPlacement="start"
          />
      </FormControl>
      <Georisques/>
      <Map
        ref={mapRef}
        center={defaultPosition}
        zoom={6}
        style={{height: '78vh', width: '100%'}}
      >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {showBigCities ? bigCities.map((bigCities, index) => 
            <Marker key={index}
              position={bigCities.position}
              icon={bigCities.icon}
              onClick={() => handleCompanyClick(bigCities)}>
              <Popup>
                <h3>{bigCities.name} - {bigCities.state}</h3>
                <p>{`Vent : ${bigCities.vent}`}</p>
                <p>{`Neige : ${bigCities.neige}`}</p>
                <p>{`Séisme : ${bigCities.seisme}`}</p>
              </Popup>
            </Marker>) : null}
            <FeatureGroup ref={layerGroupRef}>
              {apiData[0] !== 'Aucune valeur correspondante à votre recherche' ? apiData.map((cities, index) => 
              <Marker key={index}
                position={[cities.latitude, cities.longitude]}
                icon={indexSelected === index ? SelectedIcon : DefaultIcon}
                onClick={() => handleMarkerClick(index)}>
                <Popup>
                  <h3>{`${cities.nomCommune} (${cities.codePostal})`}</h3>
                  <p>{`Vent : ${cities.vent}`}</p>
                  <p>{`Neige : ${cities.neige}`}</p>
                  <p>{`Séisme : ${cities.seisme}`}</p>
                </Popup>
              </Marker>) : null}
            </FeatureGroup>
      </Map>
    </Grid>
  );
}


const mapStateToProps = (state) => {
  return {
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    materialTheme: state.theme
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setIndex: (index) => {
      dispatch(setIndex(index))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactMap);
