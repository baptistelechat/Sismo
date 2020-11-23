import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function cities(props) {
  
    return (
      <div>
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

