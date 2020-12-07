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

import OldCitySnackbar from './snackbars/oldCitySnackbar'
import CitySelectedSnackbar from './snackbars/citySelectedSnackbar'
import NoDataSnackbar from './snackbars/noDataSnackbar'

const useStyles = makeStyles((theme) => ({
  scrollbar: {
    height: "43vh",
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: 0
  },
  selected: {
      color : theme.palette.secondary.main,
  },
}));

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
        {result.vent === "-" ?
        <NoDataSnackbar open={openSnackbar} setOpen={setOpenSnackbar} data={result}/> : 
        result.vent === "x" ?
        <OldCitySnackbar open={openSnackbar} setOpen={setOpenSnackbar} data={result}/> :
        <CitySelectedSnackbar open={openSnackbar} setOpen={setOpenSnackbar} data={result}/>}
      </div>
    );
}

export default CitiesList;