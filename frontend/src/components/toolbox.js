// REACT
import React, { useState } from "react";
// REDUX
import { connect } from 'react-redux'
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
// MATERIAL UI
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
}));



const Toolbox = ({indexSelected, apiData, materialTheme}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
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
        title: `🏡 Sismo - ${nomCommuneExact} (${codePostal})`,
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

  const actions = [
    { icon: <CopyToClipboard text={data}><FileCopyIcon onClick={clipboardToast}/></CopyToClipboard>, name: 'Copier' },
    { icon: <ShareIcon onClick={share}/>, name: 'Partager' },
    { icon: <SaveIcon onClick={workInProgress}/>, name: 'Enregistrer' },
    { icon: <PrintIcon onClick={workInProgress}/>, name: 'Imprimer' },
    { icon: <FavoriteIcon onClick={workInProgress}/>, name: 'Aimer' },
  ];

  return (
    <div>
      {apiData[indexSelected] === undefined ?
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
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    materialTheme: state.theme,
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities
  }
}

export default connect(mapStateToProps)(Toolbox)
