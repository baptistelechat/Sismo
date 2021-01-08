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

const NoDataSnackbar = (props) => {

  const classes = useStyles();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  return (
    <Snackbar open={props.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} className={classes.root}>
      <Alert onClose={handleCloseSnackbar} severity="error">
        {`${props.apiData[props.indexSelected].nomCommuneExact} (${props.apiData[props.indexSelected].codePostal}) - Données indisponible.`}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
  return {
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities
  }
}

export default connect(mapStateToProps)(NoDataSnackbar);
