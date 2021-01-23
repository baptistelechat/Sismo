import React from 'react';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast'

// SEISM
import seism_default from '../img/seism/seism-default.png'
import seism_1 from '../img/seism/seism-1.png'
import seism_2 from '../img/seism/seism-2.png'
import seism_3 from '../img/seism/seism-3.png'
import seism_4 from '../img/seism/seism-4.png'
import seism_5 from '../img/seism/seism-5.png'
import seism_error from '../img/seism/seism-error.png'
import seism_default_dark from '../img/seism/seism-default-dark.png'
import seism_error_dark from '../img/seism/seism-error-dark.png'

// SNOW
import snow_default from '../img/snow/snow-default.png'
import snow_0 from '../img/snow/snow-0.png'
import snow_A1 from '../img/snow/snow-A1.png'
import snow_A2 from '../img/snow/snow-A2.png'
import snow_B1 from '../img/snow/snow-B1.png'
import snow_B2 from '../img/snow/snow-B2.png'
import snow_C1 from '../img/snow/snow-C1.png'
import snow_C2 from '../img/snow/snow-C2.png'
import snow_D from '../img/snow/snow-D.png'
import snow_E from '../img/snow/snow-E.png'
import snow_error from '../img/snow/snow-error.png'
import snow_default_dark from '../img/snow/snow-default-dark.png'
import snow_error_dark from '../img/snow/snow-error-dark.png'

// WIND
import wind_default from '../img/wind/wind-default.png'
import wind_1 from '../img/wind/wind-1.png'
import wind_2 from '../img/wind/wind-2.png'
import wind_3 from '../img/wind/wind-3.png'
import wind_4 from '../img/wind/wind-4.png'
import wind_5 from '../img/wind/wind-5.png'
import wind_error from '../img/wind/wind-error.png'
import wind_default_dark from '../img/wind/wind-default-dark.png'
import wind_error_dark from '../img/wind/wind-error-dark.png'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    height: '20vh',
    color: theme.palette.text.primary,
    alignItems: 'center',
    textAlign: 'center'
  },
  grid: {
    paddingRight:theme.spacing(2),
    paddingLeft:theme.spacing(2),
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary
  },
  h3: {
    marginTop: theme.spacing(1)
  },
  img: {
    height: '12vh',
    [theme.breakpoints.down('md')]: {
      height: '9.5vh',
    },
    [theme.breakpoints.down('sm')]: {
      height: '12vh',
    },
  },
  iconButton: {
    display: 'none',
    marginLeft: 'auto',
    marginRight:theme.spacing(3),
    [theme.breakpoints.up('clipboard')]: {
      display: 'block',
    },
  },
  fab: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
 },
 clipboardText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
 },
 clipboard: {
  [theme.breakpoints.up('clipboard')]: {
    display: 'none',
  },
 }
}));

const DataPaper = ({indexSelected, apiData, materialTheme}) => {

  const classes = useStyles();

  const nomCommuneExact = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].nomCommuneExact
  const codeInsee = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].insee
  const codePostal = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].codePostal
  const latitude = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].latitude
  const longitude = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].longitude
  const codeDepartement = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].codeDepartement
  const departement = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].departement
  const region = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].region
  const wind = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].vent;
  const snow = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].neige;
  const seism = apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].seisme;

    const data = 
`🏡 ${nomCommuneExact} (${codePostal}) :
• Code INSEE : ${codeInsee}
• Département : ${departement} (${codeDepartement})
• Région : ${region}
• Latitude : ${latitude}
• Longitude : ${longitude}
• Coordonnées : ${latitude},${longitude}
• Vent : ${wind}
• Neige : ${snow}
• Sismicité : ${seism}`

  const clipboardToast = () => {
    toast.success(
      `Résultats copiés dans le presse-papier`,
      {duration: 5000,
        icon: '📃',
        style: {
          background: materialTheme.toastColor,
          color: '#FFFFFF',
        },
      }
    )
  }

  return (
    <div>
      <ListItem>
        <ListItemIcon><LocationOnIcon color="secondary" fontSize='large'/></ListItemIcon>
        <h2 className={classes.h2}>{apiData[indexSelected] === undefined ? "Aucune ville sélectionnée" : apiData[indexSelected].nomCommune ? `${apiData[indexSelected].nomCommune} (${apiData[indexSelected].codePostal})` : "Aucune ville sélectionnée"}</h2>
        {apiData[indexSelected] === undefined ?
        (<IconButton disabled color="secondary" aria-label="copy to clipboard" className={classes.iconButton}>
          <FileCopyIcon fontSize='large'/>
        </IconButton>)
        :
        (<CopyToClipboard text={data}>
          <IconButton color="secondary" aria-label="copy to clipboard" className={classes.iconButton} onClick={clipboardToast}>
            <FileCopyIcon fontSize='large'/>
          </IconButton>
        </CopyToClipboard>)}
      </ListItem>
      {apiData[indexSelected] === undefined ?
        (<div></div>)
        :
        (<CopyToClipboard text={data}>
          <ListItem button className={classes.clipboard} onClick={clipboardToast}>
            <ListItemIcon><FileCopyIcon color="secondary" fontSize='large'/></ListItemIcon>
            <h3 className={classes.clipboardText}>Copier dans le presse-papier</h3>
          </ListItem>
        </CopyToClipboard>)}
      <Grid container spacing={2} className={classes.grid} >
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper} elevation={3}>
            <h3 className={classes.h3}>Vent</h3>
            <img
              className={classes.img}
              src={
                wind === '1' ? wind_1 :
                wind === '2' ? wind_2 :
                wind === '3' ? wind_3 :
                wind === '4' ? wind_4 :
                wind === '5' ? wind_5 :
                wind === 'x' && materialTheme.type === "dark" ? wind_error_dark :
                wind === 'x' ? wind_error :
                materialTheme.type === "dark" ? wind_default_dark :
                wind_default
              } 
              alt="image_wind"/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper} elevation={3}>
            <h3 className={classes.h3}>Neige</h3>
            <img
              className={classes.img}
              src={
                snow === 'A1' ? snow_A1 :
                snow === 'A2' ? snow_A2 :
                snow === 'B1' ? snow_B1 :
                snow === 'B2' ? snow_B2 :
                snow === 'C1' ? snow_C1 :
                snow === 'C2' ? snow_C2 :
                snow === 'D' ? snow_D :
                snow === 'E' ? snow_E :
                snow === '0' ? snow_0 :
                snow === 'x' && materialTheme.type === "dark" ? snow_error_dark :
                snow === 'x' ? snow_error :
                materialTheme.type === "dark" ? snow_default_dark :
                snow_default
              }
              alt="image_wind" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes.paper} elevation={3}>
            <h3 className={classes.h3}>Séisme</h3>
            <img
            className={classes.img}
            src={
              seism === '1' ? seism_1 :
              seism === '2' ? seism_2 :
              seism === '3' ? seism_3 :
              seism === '4' ? seism_4 :
              seism === '5' ? seism_5 :
              seism === 'x' && materialTheme.type === "dark" ? seism_error_dark :
              seism === 'x' ? seism_error :
              materialTheme.type === "dark" ? seism_default_dark :
              seism_default
            }
            alt="image_wind" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    materialTheme: state.theme,
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    clipboard: props.clipboard
  }
}

export default connect(mapStateToProps)(DataPaper);
