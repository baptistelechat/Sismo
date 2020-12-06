import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import ScrollArea from 'react-scrollbar'
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  scrollbar: {
    height: "44vh",
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: 0
  },
  selected: {
      color : theme.palette.secondary.main,
  },
  snackbar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CitiesList(props) {
  
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [result, setResult] = React.useState('');

  const listItemClicked = (index) => (event) => {
    const selectedCity = props.data[index]
    props.choice(selectedCity)
    props.indexSelected(index)
    setOpenSnackbar(true)
    setResult(selectedCity)
    console.log(index)
    console.log(selectedCity)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  
    return (
      <div>
        <ListItem >
          <ListItemIcon><SearchIcon color="secondary" fontSize='large'/></ListItemIcon>
          <h2 className={classes.h2}>{props.data.length>1 ? 'Résultats de votre recherche' : 'Résultat de votre recherche'}</h2>
        </ListItem>
        <ScrollArea className={classes.scrollbar}>
          {props.data.length === 0 ?
          <ListItem>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary="Veuillez saisir une valeur dans le champ de recherche" secondary=""/>
          </ListItem> : null}
          <List>
            { props.data.map((cities, index) => 
            <ListItem button key={index} onClick={listItemClicked(index)}>
              <ListItemIcon>
                {props.index === index ? <CheckIcon color="secondary"/> : <ChevronRightIcon/>}
              </ListItemIcon>
              {props.index === index ?
                <ListItemText className={classes.selected} primary={cities.nomCommune} secondary={`Code postal : ${cities.codePostal} - INSEE : ${cities.insee}`}/>
                : 
                <ListItemText primary={cities.codePostal ? cities.nomCommune : "Aucune valeur correspondante à votre recherche"} secondary={cities.codePostal ? `Code postal : ${cities.codePostal} - INSEE : ${cities.insee}` : null}/>
              }
            </ListItem>)}
          </List>
        </ScrollArea>
        {result.vent === "-"?
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            {`${result.nomCommuneExact} (${result.codePostal}) - Données indisponible.`}
          </Alert>
        </Snackbar> : 
        result.vent === "x" ?
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
          <Alert onClose={handleCloseSnackbar} severity="warning">
            {`${result.nomCommuneExact} (${result.codePostal}) - Ancienne commune française sélectionnée. Données indisponible.`}  
          </Alert>
        </Snackbar> :
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
          <Alert onClose={handleCloseSnackbar} severity="info">
            {`${result.nomCommuneExact} (${result.codePostal}) sélectionnée`}
          </Alert>
        </Snackbar>}
      </div>
    );
}

export default CitiesList;