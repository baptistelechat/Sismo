import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { setPersoTheme } from '../redux/theme/actionTheme'
import { setPrimaryColorPicker, setSecondaryColorPicker } from '../redux/colorPicker/actionColorPicker'
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import BrushIcon from '@material-ui/icons/Brush';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField';
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import convert from 'color-convert'
import Divider from '@material-ui/core/Divider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Switch from "@material-ui/core/Switch";
import toast from 'react-hot-toast'

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
  title: {
    color: theme.palette.text.primary,
  },
  dialogContentText: {
    marginBottom: theme.spacing(2)
  },
  colorPicker: {
    marginBottom: theme.spacing(3)
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  grid: {
    margin: 0,
    width: '100%',
    background: 'rgba(0,0,0,0)'
  },
  textExample: {
    margin: 0,
    paddingBottom: theme.spacing(1),
  },
  theme: {
    marginLeft: theme.spacing(3)
  }
}));

const ColorPicker = ({
  materialTheme,
  setPersoTheme,
  primaryColorPicker,
  secondaryColorPicker,
  setPrimaryColorPicker,
  setSecondaryColorPicker,
  setThemeSelected,
  setTheme}) => {
  
  const classes = useStyles();
  
  const [openColorPicker, setOpenColorPicker] = useState(false)
  const [dark, setDark] = useState(false)
  
  const handleClickOpen = () => {
    setOpenColorPicker(true);
  };

  const handleClose = () => {
    setOpenColorPicker(false);
  };

  const handlePrimaryColorChange = (event) => {
    setPrimaryColorPicker(event.target.value);
  };

  const handleSecondaryColorChange = (event) => {
    setSecondaryColorPicker(event.target.value);
  };

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

  const changeTheme = (dark) => {
    setPersoTheme(primaryColorPicker, secondaryColorPicker, secondaryColorPickerDark(), toastColor(), dark)
    setTheme("perso")
  }
  
  const closeDialog = () => {
    handleClose()
    changeTheme(materialTheme.type === 'dark')
  }

  const handleThemeChange = () => {
    setDark(!dark)
    changeTheme(!dark)
  };

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
      <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickOpen}
          >
          <BrushIcon className={classes.icon}/>
          Créer son thème personnalisé
        </Fab>
      <Dialog open={openColorPicker} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Créer son thème personnalisé
          <Switch checked={materialTheme.type === 'dark'} onChange={handleThemeChange}/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            Sélectionner une couleur principale et secondaire
          </DialogContentText>
          <Grid container spacing={1} className={classes.grid}>
            <Grid item xs={12} sm={6}>
              <HexColorPicker
                color={primaryColorPicker}
                onChange={setPrimaryColorPicker}
                className={classes.colorPicker}
                />
              <TextField
                id="outlined-basic"
                label="Couleur principale"
                variant="outlined"
                color="secondary"
                value={primaryColorPicker}
                onChange={handlePrimaryColorChange}
                className={classes.textField}
                />
                <HexColorPicker
                  color={secondaryColorPicker}
                  onChange={setSecondaryColorPicker}
                  className={classes.colorPicker}
                  />
                <TextField
                  id="outlined-basic"
                  label="Couleur secondaire"
                  variant="outlined"
                  color="secondary"
                  value={secondaryColorPicker}
                  onChange={handleSecondaryColorChange}
                  className={classes.textField}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={closeDialog} color="secondary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    materialTheme: state.theme,
    primaryColorPicker: state.colorPicker.primaryColor,
    secondaryColorPicker: state.colorPicker.secondaryColor,
    setTheme: props.setTheme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPersoTheme: (primaryColorLight, secondaryColorLight, secondaryColorDark, toastColor, darkmode) => {
      dispatch(setPersoTheme(primaryColorLight, secondaryColorLight, secondaryColorDark, toastColor, darkmode))
    },
    setPrimaryColorPicker: (primaryColor) => {
      dispatch(setPrimaryColorPicker(primaryColor))
    },
    setSecondaryColorPicker: (secondaryColor) => {
      dispatch(setSecondaryColorPicker(secondaryColor))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)
