import React, { useRef, useEffect, useState }from 'react';
import { Map, Marker, Popup, TileLayer, FeatureGroup} from "react-leaflet";
import { connect } from 'react-redux'
import { setIndex } from '../redux/indexSelected/actionIndexSelected'
import toast from 'react-hot-toast'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import "leaflet/dist/leaflet.css";
import L from 'leaflet'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Georisques from './georisques'

import DefaultPin from '../img/icon/pinDefault.svg'
import SelectedPin from '../img/icon/pinSelected.svg'
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

  const [showCompany, setShowCompany] = useState(true);

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
    {"name": "GRIF", "position": [48.85247560954471,2.51714689365774], "adress": "6 Rue Vincent Van Gogh", "cp": 93360,  "city": "NEUILLY PLAISANCE", "size": 30, "icon": GrifIcon},
  ];

  const companyVisibility = () => {
    showCompany ? setShowCompany(false) : setShowCompany(true)
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

  const handleCompanyClick = (company) => {
    toast.success(
      `${company.name} - ${company.cp} ${company.city}`,
      {duration: 5000,
        icon: '👷‍♂️👷‍♀️',
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
          control={<Switch color="secondary" checked={showCompany} onChange={companyVisibility}/>}
          label="Afficher les agences"
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
          {showCompany ? company.map((company, index) => 
            <Marker key={index}
              position={company.position}
              icon={company.icon}
              onClick={() => handleCompanyClick(company)}>
              <Popup>
                <h3>{company.name}</h3>
                <p>{company.adress}</p>
                <p>{company.cp} {company.city}</p>
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
