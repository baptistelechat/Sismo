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
import "leaflet/dist/leaflet.css";
import { Map, Marker, Popup, TileLayer, FeatureGroup, GeoJSON} from "react-leaflet";
// OTHER
import toast from 'react-hot-toast'
// COMPONENTS
import Georisques from './Georisques1'
import bigCities from './marker/BigCities1'
import DefaultIcon from './marker/icon/DefaultIcon1'
import SelectedIcon from './marker/icon/SelectedIcon1'
import OldCityIcon from './marker/icon/OldCityIcon1'
import GeolocationIcon from './marker/icon/GeolocationIcon1'

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

const ReactMap = ({indexSelected, apiData, geoData, setIndex, gouvData, materialTheme}) => {

  const layerGroupRef = useRef();
  const mapRef = useRef(null);

  const classes = useStyles();

  const [showBigCities, setShowBigCities] = useState(true);

  const defaultPosition = [46.539006,2.4298391];
  
  const data = []

  for (let i = 0; i < apiData.length; i++) {
    const sismo = apiData[i]
    const gouv = gouvData[i]
    if (apiData[0] === 'Aucune valeur correspondante à votre recherche') {
      data.push(sismo)
    } else {
      const obj = {
        ...sismo,
        "border": gouv
      }
      data.push(obj)    
    }
  }

  const bigCityVisibility = () => {
    setShowBigCities(!showBigCities)
  }

  const handleMarkerClick = (index) => {
    setIndex(index)
    toastOutput(index)
    console.log(apiData[index])
    const path = document.querySelectorAll('path.leaflet-interactive')
    const pathArray = [...path]
    const selectedPath = pathArray[index]
    if (pathArray.length === 1) {
      pathArray[0].setAttribute('fill', materialTheme.mainSecondaryColor)
      pathArray[0].setAttribute('stroke', materialTheme.mainSecondaryColor)
    } else {
      if (data[index].vent === "x") {
        pathArray.forEach(el => {
          el.setAttribute('fill', materialTheme.mainPrimaryColor)
          el.setAttribute('stroke', materialTheme.mainPrimaryColor)
        });
        selectedPath.setAttribute('fill', '#ffffff00')
        selectedPath.setAttribute('stroke', '#ffffff00')
      } else {
        pathArray.forEach(el => {
          if (el !== selectedPath) {
            if (el.getAttribute('fill') === '#ffffff00') {
              el.setAttribute('fill',  '#ffffff00')
              el.setAttribute('stroke',  '#ffffff00')
            } else {
              el.setAttribute('fill', materialTheme.mainPrimaryColor)
              el.setAttribute('stroke', materialTheme.mainPrimaryColor)
            }
          } else {
            if (el.getAttribute('fill') === '#ffffff00') {
              el.setAttribute('fill',  '#ffffff00')
              el.setAttribute('stroke',  '#ffffff00')
            } else {
              el.setAttribute('fill', materialTheme.mainSecondaryColor)
              el.setAttribute('stroke', materialTheme.mainSecondaryColor)
            }
          }
        });
      }
    }
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

  const handleBigCityClick = (bigCities) => {
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

  const handleGeolocalisationClick = (nomCommuneExact) => {
    toast.success(`📍 Vous êtes à ${nomCommuneExact}`, {
      duration: 5000,
      style: {
        background: '#81c784',
        color: '#FFFFFF',
      },
      iconTheme: {
        primary: '#1b5e20',
        secondary: '#FFFFFF'
      },
    })
  }

  const handleGeoJsonClick = (e, index) => {
    setIndex(index);
    e.target.setStyle({
      color: materialTheme.mainSecondaryColor
    })
    const selectedPath = e.layer._path
    const path = document.querySelectorAll('path.leaflet-interactive')
    const pathArray = [...path]
    pathArray.forEach(el => {
      if (el !== selectedPath) {
        el.setAttribute('fill', materialTheme.mainPrimaryColor)
        el.setAttribute('stroke', materialTheme.mainPrimaryColor)
      } else {
        el.setAttribute('fill', materialTheme.mainSecondaryColor)
        el.setAttribute('stroke', materialTheme.mainSecondaryColor)
      }
    });
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

  const marker = () => {
    return (data.map((cities, index) =>
      index === 0 ? 
      (<Marker key={index}
        position={[cities.latitude, cities.longitude]}
        icon={indexSelected === index ? SelectedIcon : cities.vent === "x" ? OldCityIcon : DefaultIcon}
        onClick={() => handleMarkerClick(index)}>
        <Popup>
          <h3>{`${cities.nomCommune} (${cities.codePostal})`}</h3>
          <p>{`Vent : ${cities.vent}`}</p>
          <p>{`Neige : ${cities.neige}`}</p>
          <p>{`Séisme : ${cities.seisme}`}</p>
        </Popup>
        {border(index)}
      </Marker>)
      :
      data[index-1].insee !== data[index].insee ?
        (<Marker key={index}
          position={[cities.latitude, cities.longitude]}
          icon={indexSelected === index ? SelectedIcon : cities.vent === "x" ? OldCityIcon : DefaultIcon}
          onClick={() => handleMarkerClick(index)}>
          <Popup>
            <h3>{`${cities.nomCommune} (${cities.codePostal})`}</h3>
            <p>{`Vent : ${cities.vent}`}</p>
            <p>{`Neige : ${cities.neige}`}</p>
            <p>{`Séisme : ${cities.seisme}`}</p>
          </Popup>
          {border(index)}
        </Marker>)
        :
        null
    ))
  }

  const border = (index) => {
    if (data[index].border !== "-") {
      if (index !== 0) {
        if (data[index-1].insee !== data[index].insee) {
          return <GeoJSON key={index} data={data[index].border} onclick={(e) => handleGeoJsonClick(e, index)} style={{color: materialTheme.mainPrimaryColor}}/>
        } else {
          return null
        }
      } else {
        return <GeoJSON key={index} data={data[index].border} onclick={(e) => handleGeoJsonClick(e, index)} style={{color: materialTheme.mainPrimaryColor}}/>
      }
    } else {
      if (data[1] === undefined) {
        return null
      } else {
        return <GeoJSON key={index} data={data[1].border} onclick={(e) => handleGeoJsonClick(e, index)} style={{color: "#ffffff00"}}/>
      }
    }
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
          control={<Switch color="secondary" checked={showBigCities} onChange={bigCityVisibility}/>}
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
              onClick={() => handleBigCityClick(bigCities)}>
              <Popup>
                <h3>{bigCities.name} - {bigCities.state}</h3>
                <p>{`Vent : ${bigCities.vent}`}</p>
                <p>{`Neige : ${bigCities.neige}`}</p>
                <p>{`Séisme : ${bigCities.seisme}`}</p>
              </Popup>
            </Marker>) : null}
            <FeatureGroup ref={layerGroupRef}>
              {geoData.length !== 0 ? 
                (<Marker
                  position={[geoData.latitude, geoData.longitude]}
                  icon={GeolocationIcon}
                  onclick={() => handleGeolocalisationClick(geoData.nomCommuneExact)}>
                  <Popup>
                    <h3>{`📍 Vous êtes ici - ${geoData.nomCommune}`}</h3>
                    <p>{`Vent : ${geoData.vent}`}</p>
                    <p>{`Neige : ${geoData.neige}`}</p>
                    <p>{`Séisme : ${geoData.seisme}`}</p>
                  </Popup>
                  {geoData.border !== "-" ? <GeoJSON key={"GeoJSON"} data={geoData.border} onclick={() => handleGeolocalisationClick(geoData.nomCommuneExact)} style={{color:materialTheme.mainSecondaryColor}}/> : null}
                </Marker>)
              :
              data[0] !== 'Aucune valeur correspondante à votre recherche' ? marker() : null}
            </FeatureGroup>
      </Map>
    </Grid>
  );
}


const mapStateToProps = (state) => {
  return {
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    geoData: state.geoApi.city,
    gouvData: state.gouvApi.borders,
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
