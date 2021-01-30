// REACT
import React from 'react';
// REDUX
import { connect } from 'react-redux'
import { setPrimaryColorPicker, setSecondaryColorPicker } from '../redux/colorPicker/actionColorPicker'
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
// MATERIAL UI ICON
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FileCopyIcon from '@material-ui/icons/FileCopy';
// OTHER
import convert from 'color-convert'
import toast from 'react-hot-toast'

// STYLE
const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
 },
  textExample: {
    margin: 0,
    paddingBottom: theme.spacing(1),
  }
}));

const SampleComponent = ({
  materialTheme, 
  primaryColorPicker,
  secondaryColorPicker,
  setPrimaryColorPicker,
  setSecondaryColorPicker}) => {

  const classes = useStyles();

  const secondaryColorPickerDark = () => {
    let secondaryColorPickerDark = convert.hex.hsl(secondaryColorPicker)
    const secondaryColorPickerDarkHue = secondaryColorPickerDark[0]
    const secondaryColorPickerDarkSaturation = secondaryColorPickerDark[1]+5 >= 100 ? 100 : secondaryColorPickerDark[1]+5
    const secondaryColorPickerDarkLightness = secondaryColorPickerDark[2]+20 >=85 ? 85 : secondaryColorPickerDark[2]+20
    return secondaryColorPickerDark = '#'+convert.hsl.hex([secondaryColorPickerDarkHue, secondaryColorPickerDarkSaturation, secondaryColorPickerDarkLightness])
  }

  const toastColor = () => {
    let toastColor = convert.hex.hsl(primaryColorPicker)
    const toastColorHue = toastColor[0]
    const toastColorSaturation = toastColor[1]+5 >= 100 ? 100 : toastColor[1]+5
    const toastColorLightness = toastColor[2]+20 >=85 ? 85 : toastColor[2]+20
    return toastColor = '#'+convert.hsl.hex([toastColorHue, toastColorSaturation, toastColorLightness])
  }

  const handleClick = () => {
    toast.success(
      `Ceci est une notification de test`,
      {duration: 5000,
        icon: '😉',
        style: {
          background: toastColor(),
          color: '#FFFFFF',
        },
      }
    )
  }

  return (
    <div>
      <h1 className={classes.textExample} style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}>Lorem ipsum</h1>
      <h2 className={classes.textExample} style={{color: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}>Lorem ipsum</h2>
      <h3 className={classes.textExample} style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}>Lorem ipsum</h3>
      <h4 className={classes.textExample} style={{color: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}>Lorem ipsum</h4>
      <h5 className={classes.textExample} style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}>Lorem ipsum</h5>
      <h6 className={classes.textExample} style={{color: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}>Lorem ipsum</h6>
      <p className={classes.textExample} style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus et quos aliquam porro atque tenetur ipsam qui, beatae iusto doloribus adipisci hic molestias excepturi repudiandae asperiores in at? Laudantium, harum!</p>
      <Divider style={{marginTop: '8px', marginBottom: '16px'}}/>
      <Fab
        variant="extended"
        size="medium"
        style={{backgroundColor: primaryColorPicker}}
        aria-label="add"
        className={classes.fab}
        onClick={handleClick}
        >
        <NotificationsActiveIcon className={classes.icon}/>
          Notification
        </Fab>
      <Fab
        variant="extended"
        size="medium"
        style={{backgroundColor: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}
        aria-label="add"
        className={classes.fab}
        onClick={handleClick}
        >
        <NotificationsActiveIcon className={classes.icon}/>
          Notification
      </Fab>
      <div>
        <ChevronRightIcon fontSize='large' style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}/>
        <SearchIcon fontSize='large' style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}/>
        <CheckIcon fontSize='large' style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}/>
        <LocationOnIcon fontSize='large' style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}/>
        <FileCopyIcon fontSize='large' style={{color: materialTheme.type === 'light' ? primaryColorPicker : '#ffffff'}}/>
      </div>
      <div>
        <ChevronRightIcon fontSize='large' style={{color: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}/>
        <SearchIcon fontSize='large' style={{color: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}/>
        <CheckIcon fontSize='large' style={{color: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}/>
        <LocationOnIcon fontSize='large' style={{color: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}/>
        <FileCopyIcon fontSize='large' style={{color: materialTheme.type === 'light' ? secondaryColorPicker : secondaryColorPickerDark()}}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    materialTheme: state.theme,
    primaryColorPicker: state.colorPicker.primaryColor,
    secondaryColorPicker: state.colorPicker.secondaryColor,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPrimaryColorPicker: (primaryColor) => {
      dispatch(setPrimaryColorPicker(primaryColor))
    },
    setSecondaryColorPicker: (secondaryColor) => {
      dispatch(setSecondaryColorPicker(secondaryColor))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleComponent)
