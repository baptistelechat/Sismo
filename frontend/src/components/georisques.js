import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/Build';
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  }
}));

const Georisques = (props) => {

  const classes = useStyles();
  
  const url = `https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport?form-commune=true&codeInsee=${props.cityChoice.insee}&ign=false&CGU-commune=on&commune=${props.cityChoice.codePostal}+${props.cityChoice.nomCommuneExact}`

  const openInNewTab = () => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div> 
      {props.indexSelected !== -1 && props.cityChoice.vent !== 'x' ?
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
    cityChoice: state.city.cityChoice
  }
}

export default connect(mapStateToProps)(Georisques);
