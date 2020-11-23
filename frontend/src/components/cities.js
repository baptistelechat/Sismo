import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';

function cities(props) {
  
    return (
      <div>
        <ListItem >
          <ListItemIcon><SearchIcon color="secondary" fontSize='large'/></ListItemIcon>
          <h2>Résultat de votre recherche</h2>
        </ListItem>
        <List>
          { props.data.map((cities, index) => 
          <ListItem button key={index}>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary={cities.Code_postal ? cities.Nom_commune : "Aucune valeur correspondante à votre recherche"} secondary={`Code postal : ${cities.Code_postal} - INSEE : ${cities.Code_commune_INSEE} - Vent : ${cities.Vent} - Neige : ${cities.Neige} - Sismique : ${cities.Seisme}`}/>
          </ListItem>)}
        </List>
      </div>
    );
}

export default cities;

