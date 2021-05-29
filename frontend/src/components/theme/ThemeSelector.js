import React, { useState } from 'react';
//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from "@material-ui/core/Switch";
import Divider from '@material-ui/core/Divider';
// MATERIAL UI ICON
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
// REDUX
import { connect } from 'react-redux'
import { setPrimaryColorPicker, setSecondaryColorPicker } from '../../services/redux/colorPicker/actionColorPicker'
import { setIndigoPinkTheme, setCyanAmberTheme, setRedBrownTheme, setLightGreenBlueTheme, setPersoTheme } from '../../services/redux/theme/actionTheme'
// COMPONENTS
import ThemePicker from './ThemePicker'
// OTHER
import convert from 'color-convert'
const useStyles = makeStyles((theme) => ({
  h3: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
}))

const ThemeSelector = ({
  materialTheme,
  primaryColorPicker,
  secondaryColorPicker,
  setPersoTheme,
  setThemeSelected,
  setIndigoPinkTheme,
  setCyanAmberTheme,
  setRedBrownTheme,
  setLightGreenBlueTheme,
  setPrimaryColorPicker,
  setSecondaryColorPicker}) => {

  const classes = useStyles();

  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState("indigo_pink")

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

  const changeTheme = () => {
    setDark(!dark)
    switch (theme) {
      case "indigo_pink": 
        setIndigoPinkTheme(!dark)
        setTheme("indigo_pink")
        setPrimaryColorPicker('#3f51b5')
        setSecondaryColorPicker(!dark === false ? '#e91e63' : '#f06292')
        break
      case "cyan_amber":
        setCyanAmberTheme(!dark)
        setTheme("cyan_amber")
        setPrimaryColorPicker('#00acc1')
        setSecondaryColorPicker(!dark === false ?'#ffb300' : '#ffca28')
        break
      case "red_brown":
        setRedBrownTheme(!dark)
        setTheme("red_brown")
        setPrimaryColorPicker('#d32f2f')
        setSecondaryColorPicker(!dark === false ?'#795548' : '#a1887f')
        break
      case "light_green_blue":
        setLightGreenBlueTheme(!dark)
        setTheme("light_green_blue")
        setPrimaryColorPicker('#8bc34a')
        setSecondaryColorPicker(!dark === false ? '#2196f3' : '#64b5f6')
        break
      case "perso":
        setPersoTheme(primaryColorPicker, secondaryColorPicker, secondaryColorPickerDark(), toastColor(), !dark)
        setTheme("perso")
        break
      default :
        setIndigoPinkTheme(dark)
    }   
  };

  return (
    <div>
      <ListItem>
        <h3 className={classes.h3}>Personnalisation</h3>
      </ListItem>
      <ListItem button  onClick={changeTheme}>
        <ListItemIcon>{materialTheme.type === "light" ? <BrightnessLowIcon/> : <Brightness4Icon/>}</ListItemIcon>
        <ListItemText primary={materialTheme.type === "light" ? "Thème Clair" : "Thème Sombre"} />
        <Switch checked={materialTheme.type === 'dark'} onClick={changeTheme}/>
      </ListItem>
      <ThemePicker theme={theme} setTheme={setTheme} dark={dark} setDark={setDark}/>
      <Divider />
      <ListItem>
        <h3 className={classes.h3}>Autres options de Sismo</h3>
      </ListItem>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    materialTheme: state.theme,
    primaryColorPicker: state.colorPicker.primaryColor,
    secondaryColorPicker: state.colorPicker.secondaryColor,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPersoTheme: (primaryColorLight, secondaryColorLight, secondaryColorDark, toastColor, darkmode) => {
      dispatch(setPersoTheme(primaryColorLight, secondaryColorLight, secondaryColorDark, toastColor, darkmode))
    },
    setIndigoPinkTheme: (darkmode) => {
      dispatch(setIndigoPinkTheme(darkmode))
    },
    setCyanAmberTheme: (darkmode) => {
      dispatch(setCyanAmberTheme(darkmode))
    },
    setRedBrownTheme: (darkmode) => {
      dispatch(setRedBrownTheme(darkmode))
    },
    setLightGreenBlueTheme: (darkmode) => {
      dispatch(setLightGreenBlueTheme(darkmode))
    },
    setPrimaryColorPicker: (primaryColor) => {
      dispatch(setPrimaryColorPicker(primaryColor))
    },
    setSecondaryColorPicker: (secondaryColor) => {
      dispatch(setSecondaryColorPicker(secondaryColor))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSelector);
