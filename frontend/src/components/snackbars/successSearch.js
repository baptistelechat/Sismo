import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SuccessSearch = (props) => {
  
  const classes = useStyles();
  
  const snackbarTest = () => {
    if (props.apiData.isLoading === true) {
      return "⏳ Chargement ..."
    }
    if (props.length>1 && props.param === 'cp') {
      return `${props.length} résultats trouvés pour le code postal : ${props.searchValue}`
    }
    if (props.length>1 && props.param === 'insee') {
      return `${props.length} résultats trouvés pour le code INSEE : ${props.searchValue}`
    }
    if (props.length>1 && props.param === 'name') {
      return `${props.length} résultats trouvés pour la valeur : ${props.searchValue}`
    }
    if (props.length===1 && props.param === 'cp') {
      return `${props.length} résultat trouvé pour le code postal : ${props.searchValue}`
    }
    if (props.length===1 && props.param === 'insee') {
      return `${props.length} résultat trouvé pour le code INSEE : ${props.searchValue}`
    }
    if (props.length===1 && props.param === 'name') {
      return `${props.length} résultat trouvé pour la valeur : ${props.searchValue}`
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  return (
    <Snackbar open={props.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} className={classes.root}>
      <Alert onClose={handleCloseSnackbar} severity={props.apiData.isLoading ? "info" : "success"}>
        {snackbarTest()}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
  return {
    apiData: state.cityApi
  }
}

export default connect(mapStateToProps)(SuccessSearch);
