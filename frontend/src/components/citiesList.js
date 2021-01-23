import React from "react";
import { connect } from 'react-redux'
import { setIndex } from '../redux/indexSelected/actionIndexSelected'
import toast from 'react-hot-toast'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import ScrollArea from 'react-scrollbar'
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  scrollbar: {
    height: "43vh",
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: 0,
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  p: {
    color: theme.palette.text.primary,
  },
  selected: {
    color : theme.palette.secondary.main,
  }
}));

function CitiesList({indexSelected, apiData, setIndex, materialTheme}) {
  
  const classes = useStyles();
  
  const listItemClicked = (index) => {
    setIndex(index)
    toastOutput(index)
  }

  const toastOutput = (index) => {
    if (apiData[index].vent === "-") {
      toast.error(
        `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) - Données indisponible`,
        {duration: 5000,
          style: {
            background: '#e57373',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#b71c1c',
            secondary: '#FFFFFF'
          }
        }
      )
    } else if (apiData[index].vent === "x") {
      toast.error(
        `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) - Ancienne commune française sélectionnée. Données indisponible`,
        {duration: 5000,
          style: {
            background: '#ffb74d',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#e65100',
            secondary: '#FFFFFF'
          }
        }
      )
    } else {
      toast.success(
        `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) sélectionnée`,
        {duration: 5000,
          icon: '🏡',
          style: {
            background: materialTheme.toastColor,
            color: '#FFFFFF',
          },
        }
      )
    }
  }
 
    return (
      <div>
        <ListItem >
          <ListItemIcon><SearchIcon color="secondary" fontSize='large'/></ListItemIcon>
          <h2 className={classes.h2}>{apiData.length>1 ? 'Résultats de votre recherche' : 'Résultat de votre recherche'}</h2>
        </ListItem>
        <ScrollArea className={classes.scrollbar}>
          {apiData.length === 0 ?
          <ListItem>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText className={classes.p} primary="Veuillez saisir une valeur dans le champ de recherche" secondary=""/>
          </ListItem> : null}
          <List>
            {apiData.map((cities, index) => 
            <ListItem button key={index} onClick={() => listItemClicked(index)}>
              <ListItemIcon>
                {indexSelected === index ? <CheckIcon color="secondary"/> : <ChevronRightIcon/>}
              </ListItemIcon>
              {indexSelected === index ?
                <ListItemText className={classes.selected} primary={cities.nomCommune} secondary={`Code postal : ${cities.codePostal} - INSEE : ${cities.insee}`}/>
                : 
                <ListItemText className={classes.p} primary={cities.codePostal ? cities.nomCommune : "Aucune valeur correspondante à votre recherche"} secondary={cities.codePostal ? `Code postal : ${cities.codePostal} - INSEE : ${cities.insee}` : null}/>
              }
            </ListItem>)}
          </List>
        </ScrollArea>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    materialTheme: state.theme
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setIndex: (index) => {
      dispatch(setIndex(index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList)
