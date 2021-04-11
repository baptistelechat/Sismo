// REACT
import React, { useState } from "react";
// REDUX
import { connect } from 'react-redux'
import { setIndex } from '../redux/indexSelected/actionIndexSelected'
import { citiesApiCall } from '../redux/citiesData/actionCitiesData'
import { geoApiCall, geoApiReset } from '../redux/geoData/actionGeoData'
import { gouvApiCall } from '../redux/gouvData/actionGouvData'
// MATERIAL UI
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
// MATERIAL UI ICON
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MyLocationIcon from '@material-ui/icons/MyLocation';
// OTHER
import toast from 'react-hot-toast'
// COMPONENTS
import MyDrawer from './Drawer1';
// PICTURES
import logo from '../img/logo.png'

// STYLE
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    color: theme.palette.common.white,
    [theme.breakpoints.up('tablet')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '65%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: '50%',
    },
    [theme.breakpoints.up('tablet')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '26ch',
      },
    },
  },
  fab: {
    color: theme.palette.common.white,
    marginLeft:theme.spacing(2),
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display:"none"
    },
  },
  fabDisable: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft:theme.spacing(2),
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display:"none"
    },
  },
  radioContainer: {
    display: 'none',
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      display:"block"
    },
  },
  logo: {
    display: 'none',
    height: '48px',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('tablet')]: {
      display: 'block'
    },
  },
  selectMenuContainer: {
    display: 'block',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
  },
  selectMenu: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    color: theme.palette.common.white,
    '&:before': {
      borderColor: theme.palette.common.white,
    },
    '&:after': {
      borderColor: theme.palette.common.white,
    }
  },
  childrenSelectMenu: {
    padding: theme.spacing(1, 2),
  },
 iconSelectMenu: {
    fill: theme.palette.common.white,
 },
}));

const MyRadio = withStyles({
  root: {
    color: '#fff',
    '&$checked': {
      color: '#fff',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const MyTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: '12px',
  },
}))(Tooltip);

function SearchAppBar({setIndex, apiData, citiesApiCall, geoApiCall, geoApiReset, gouvApiCall, materialTheme}) {

  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');
  const [param, setParam] = useState('cp');

  const handleSubmit = async () => {
    setIndex(-1);
    geoApiReset()
    await gouvApiCall(param, searchValue)
    await citiesApiCall(param, searchValue)
  }

  const handleSubmitDisable = () => {
    toast.error(
      `Champ de recherche vide. Veuillez saisir une valeur.`,
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
  }

  const handleChange = (event) => {
    setSearchValue(event.currentTarget.value)
  }

  const handleSelectChange = (event) => {
    const param = event.target.value
    setParam(param);
    console.log(param)
  }

  const handleChangeRadio = (event) => {
    const param = event.currentTarget.value
    setParam(param);
    console.log(param)
  };

  const handleKeypress = (event) => {
    //it triggers by pressing the enter key
    if (event.keyCode === 13) {
      if (searchValue !== '') {
        handleSubmit();
      } else {
        handleSubmitDisable()
      }
    }
  };

  const handleGeolocation = async () => {
    await geoApiCall()
    setSearchValue('')
    setIndex(-1);
  }

    

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <MyDrawer/>
          <img className={classes.logo} src={logo} alt="logo Sismo" onClick={() => document.location.reload()}/>
          <Typography className={classes.title} variant="h6" noWrap onClick={() => document.location.reload()}>
            Sismo
          </Typography>
          
          <FormControl component="fieldset" className={classes.radioContainer}>
            <RadioGroup row aria-label="parameters" name="params" value={param} onChange={handleChangeRadio}>
              <FormControlLabel value="cp" control={<MyRadio/>} label="Code Postal"/>
              <FormControlLabel value="insee" control={<MyRadio/>} label="Code INSEE" />
              <FormControlLabel value="name" control={<MyRadio />} label="Nom" />
            </RadioGroup>
          </FormControl>
          
          <FormControl className={classes.selectMenuContainer}>
            <Select
              value={param}
              onChange={handleSelectChange}
              className={classes.selectMenu}
              inputProps={{
                  classes: {
                      icon: classes.iconSelectMenu,
                  },
              }}
            >
              <option value={"cp"} className={classes.childrenSelectMenu}>Code Postal</option>
              <option value={"insee"} className={classes.childrenSelectMenu}>Code INSEE</option>
              <option value={"name"} className={classes.childrenSelectMenu}>Nom</option>
            </Select>
          </FormControl>
          
          <div className={classes.search} onSubmit={handleSubmit}>
            <div className={classes.searchIcon}>
              <LocationOnIcon />
            </div>
            <InputBase
              placeholder="Rechercher…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              value={searchValue}
              onKeyUp={handleKeypress}
            />
          </div>
          <MyTooltip title="Rechercher" enterDelay={500} leaveDelay={300} TransitionComponent={Zoom} interactive arrow>
            {searchValue.length > 0 ? 
            (<Fab className={classes.fab} color="secondary" aria-label="add" size="small" onClick={handleSubmit}>
              <SearchIcon />
            </Fab>)
            :
            (<Fab className={classes.fabDisable} color="secondary" aria-label="add" size="small" onClick={handleSubmitDisable}>
              <SearchIcon />
            </Fab>)}
            
          </MyTooltip>
          <MyTooltip title="Me géolocaliser" enterDelay={500} leaveDelay={300} TransitionComponent={Zoom} interactive arrow>
            <Fab className={classes.fab} color="secondary" aria-label="add" size="small" onClick={handleGeolocation}>
              <MyLocationIcon />
            </Fab>
          </MyTooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    apiData: state.cityApi.cities,
    materialTheme: state.theme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIndex: (index) => {
      dispatch(setIndex(index))
    },
    citiesApiCall: (param, searchValue) => {
      dispatch(citiesApiCall(param, searchValue))
    },
    geoApiCall: () => {
      dispatch(geoApiCall())
    },
    geoApiReset: () => {
      dispatch(geoApiReset())
    },
    gouvApiCall: (param, searchValue) => {
      dispatch(gouvApiCall(param, searchValue))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppBar)
