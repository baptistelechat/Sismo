import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import ScrollArea from 'react-scrollbar'
import { makeStyles } from '@material-ui/core/styles';

import DataPaper from './dataPaper'

const useStyles = makeStyles((theme) => ({
  scrollbar: {
    height: "38vh",
  },
  h2: {
    marginTop: theme.spacing(1)
  }
}));

function CitiesList(props) {
  
  const classes = useStyles();

  const [choice, setChoice] = React.useState('');
  const [listVisible, setListVisible] = React.useState(false);

  const listItemClicked = (index) => (event) => {
    const selectedCity = props.data[index]
    setChoice(selectedCity)
    setListVisible(true)
    console.log(index)
    console.log(selectedCity)
  }
  
    return (
      <div>
        <ListItem >
          <ListItemIcon><SearchIcon color="secondary" fontSize='large'/></ListItemIcon>
          <h2 className={classes.h2}>Résultat de votre recherche</h2>
        </ListItem>
        <ScrollArea className={classes.scrollbar}>
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
        <DataPaper data={choice} listVisible={listVisible}/>
      </div>
    );
}

export default CitiesList;