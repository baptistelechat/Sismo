import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import ScrollArea from 'react-scrollbar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  scrollbar: {
    height: "44vh",
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: 0
  }
}));

function CitiesList(props) {
  
  const classes = useStyles();

  const listItemClicked = (index) => (event) => {
    const selectedCity = props.data[index]
    props.choice(selectedCity)
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
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary={cities.Code_postal ? cities.Nom_commune : "Aucune valeur correspondante à votre recherche"} secondary={cities.Code_postal ? `Code postal : ${cities.Code_postal} - INSEE : ${cities.Code_commune_INSEE}` : null}/>
            </ListItem>)}
          </List>
        </ScrollArea>
      </div>
    );
}

export default CitiesList;