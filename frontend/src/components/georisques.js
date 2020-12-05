import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import BuildIcon from '@material-ui/icons/Build';

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
  
  const url = `https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport?form-commune=true&codeInsee=${props.index !== -1 ? props.data[props.index].insee : ''}&ign=false&CGU-commune=on&commune=${props.index !== -1 ? props.data[props.index].codePostal : ''}+${props.index !== -1 ? props.data[props.index].nomCommuneExact : ''}`

  const openInNewTab = () => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div> 
      {props.index !== -1 && props.data[props.index].vent !== 'x' ?
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

export default Georisques;
