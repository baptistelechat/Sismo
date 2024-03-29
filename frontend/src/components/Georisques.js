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
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';

// STYLE
const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const MyTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: '12px',
  },
}))(Tooltip);

const Georisques = ({indexSelected, apiData, geoData}) => {

  const classes = useStyles();
  
  const url = geoData.length !== 0 ? geoData.georisques : apiData[indexSelected] === undefined ? "-" : apiData[indexSelected].georisques

  const openInNewTab = () => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div>
      {(indexSelected !== -1 && apiData[indexSelected].vent !== 'x') || geoData.length !== 0 ?
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
            <EmojiTransportationIcon className={classes.extendedIcon}/>
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
          <EmojiTransportationIcon className={classes.extendedIcon}/>
          Géorisques
        </Fab>        
    }
    </div>
    
  );
}

const mapStateToProps = (state) => {
  return {
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    geoData: state.geoApi.city
  }
}

export default connect(mapStateToProps)(Georisques);
