// REACT
import React from 'react';
// REDUX
import { connect } from 'react-redux'
// MATERIAL UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
// ICON
import BuildIcon from '@material-ui/icons/Build';

// STYLE
const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  }
}));

const MyTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: '12px',
  },
}))(Tooltip);

const Georisques = ({indexSelected, apiData}) => {

  const classes = useStyles();
  
  const url = apiData[indexSelected] === undefined ? "" :`https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport?form-commune=true&codeInsee=${apiData[indexSelected].insee}&ign=false&CGU-commune=on&commune=${apiData[indexSelected].codePostal}+${apiData[indexSelected].nomCommuneExact}`

  const openInNewTab = () => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div>
      {indexSelected !== -1 && apiData[indexSelected].vent !== 'x' ?
        <MyTooltip title="Accéder au site Géorisques" enterDelay={500} leaveDelay={300} TransitionComponent={Zoom} interactive arrow>
          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="add"
            className={classes.fab}
            // href={url}
            onClick={openInNewTab}
          >
            <BuildIcon className={classes.extendedIcon}/>
            Géorisques
          </Fab>
        </MyTooltip>
        :
        <Fab
          disabled
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.fab}
        >
          <BuildIcon className={classes.extendedIcon}/>
          Géorisques
        </Fab>        
    }
    </div>
    
  );
}

const mapStateToProps = (state) => {
  return {
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities
  }
}

export default connect(mapStateToProps)(Georisques);
