// REACT
import React from "react";
// REDUX
import { connect } from 'react-redux'
import { setIndex } from '../redux/indexSelected/actionIndexSelected'
import { geoApiCall } from '../redux/geoData/actionGeoData'
// MATERIAL UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
// MATERIAL UI ICON
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MyLocationIcon from '@material-ui/icons/MyLocation';
// OTHER
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast'

// STYLE
const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDialDefault: {
    position: 'fixed',
    '&.MuiSpeedDial-directionRight': {
      bottom: theme.spacing(4),
      left: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  speedDialResponsive: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp': {
      bottom: theme.spacing(2),
      left: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
  fab: {
    position: 'fixed',
    top: theme.spacing(9),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    zIndex: '1000',
    [theme.breakpoints.up('sm')]: {
      display:"none"
    },
  },
}));

const MyTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: '12px',
  },
}))(Tooltip);

const Toolbox = ({indexSelected, apiData, geoData, geoApiCall, materialTheme}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const nomCommuneExact = geoData.length !== 0 ? geoData.nomCommuneExact : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].nomCommuneExact
  const codeInsee = geoData.length !== 0 ? geoData.insee : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].insee
  const codePostal = geoData.length !== 0 ? "-" : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].codePostal
  const latitude = geoData.length !== 0 ? geoData.latitude : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].latitude
  const longitude = geoData.length !== 0 ? geoData.longitude : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].longitude
  const codeDepartement = geoData.length !== 0 ? geoData.codeDepartement : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].codeDepartement
  const departement = geoData.length !== 0 ? geoData.departement : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].departement
  const region = geoData.length !== 0 ? geoData.region : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].region
  const wind = geoData.length !== 0 ? geoData.vent : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].vent;
  const snow = geoData.length !== 0 ? geoData.neige : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].neige;
  const seism = geoData.length !== 0 ? geoData.seisme : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].seisme;

  const data = 
  geoData.length !== 0 ?
`🏡 ${nomCommuneExact} :
• Code INSEE : ${codeInsee}
• Département : ${departement} (${codeDepartement})
• Région : ${region}
• Latitude : ${latitude}
• Longitude : ${longitude}
• Coordonnées : ${latitude},${longitude}
• Vent : ${wind}
• Neige : ${snow}
• Sismicité : ${seism}`
: 
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
    
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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

  const workInProgress = () => {
    toast.success(
      `Fonctionnalité en cours de développement`,
      {duration: 5000,
        icon: '👨‍💻',
        style: {
          background: '#e65100',
          color: '#FFFFFF',
        },
      }
    )
  }

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: geoData.length !== 0 ? `🏡 Sismo - ${nomCommuneExact}` : `🏡 Sismo - ${nomCommuneExact} (${codePostal})`,
        text: data
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    } else {
      console.log('navigator.share not supported by the browser');
      toast.success(
        `Fonctionnalité non supportée par votre navigateur. Résultats copiés dans le presse-papier`,
        {duration: 5000,
          icon: '💻',
          style: {
            background: materialTheme.toastColor,
            color: '#FFFFFF',
          },
        }
      )
    }
  }
  
  const handleGeolocation = () => {
    geoApiCall()
    // setSearchValue('')
    setIndex(-1);
  }

  const actions = [
    { icon: <CopyToClipboard text={data}><FileCopyIcon onClick={clipboardToast}/></CopyToClipboard>, name: 'Copier' },
    { icon: <ShareIcon onClick={share}/>, name: 'Partager' },
    { icon: <SaveIcon onClick={workInProgress}/>, name: 'Enregistrer' },
    { icon: <PrintIcon onClick={workInProgress}/>, name: 'Imprimer' },
    { icon: <FavoriteIcon onClick={workInProgress}/>, name: 'Aimer' },
  ];

  return (
    <div>
      {apiData[indexSelected] === undefined && geoData.length === 0 ?
        (<div></div>)
        :
        (<div>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDialDefault}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={'right'}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement={'top'}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDialResponsive}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={'up'}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement={'top'}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
        </div>)
      }
      <MyTooltip title="Me géolocaliser" enterDelay={500} leaveDelay={300} TransitionComponent={Zoom} interactive arrow>
        <Fab className={classes.fab} color="secondary" aria-label="add" size="medium" onClick={handleGeolocation}>
            <MyLocationIcon />
          </Fab>
      </MyTooltip>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    materialTheme: state.theme,
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    geoData: state.geoApi.city
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIndex: (index) => {
      dispatch(setIndex(index))
    },
    geoApiCall: () => {
      dispatch(geoApiCall())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
