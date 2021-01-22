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
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField';
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import convert from 'color-convert'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
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
    marginBottom: theme.spacing(3)
  },
  colorPicker: {
    marginBottom: theme.spacing(3)
  },
  textField: {
    marginBottom: theme.spacing(1)
  },
  grid: {
    margin: 0,
    width: '100%',
    background: 'rgba(0,0,0,0)'
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

  const changeTheme = () => {
    let secondaryColorPickerDark = convert.hex.hsl(secondaryColorPicker)
    const secondaryColorPickerDarkHue = secondaryColorPickerDark[0]
    const secondaryColorPickerDarkSaturation = secondaryColorPickerDark[1]+5 >= 100 ? 100 : secondaryColorPickerDark[1]+5
    const secondaryColorPickerDarkLightness = secondaryColorPickerDark[2]+20 >=85 ? 85 : secondaryColorPickerDark[2]+20
    secondaryColorPickerDark = '#'+convert.hsl.hex([secondaryColorPickerDarkHue, secondaryColorPickerDarkSaturation, secondaryColorPickerDarkLightness])
    
    let toastColor = convert.hex.hsl(primaryColorPicker)
    const toastColorHue = toastColor[0]
    const toastColorSaturation = toastColor[1]+5 >= 100 ? 100 : toastColor[1]+5
    const toastColorLightness = toastColor[2]+20 >=85 ? 85 : toastColor[2]+20
    toastColor = '#'+convert.hsl.hex([toastColorHue, toastColorSaturation, toastColorLightness])
    
    const dark = materialTheme.type === "dark"
    setPersoTheme(primaryColorPicker, secondaryColorPicker, secondaryColorPickerDark, toastColor, dark)
    setTheme("perso")
    handleClose()
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
          <BrushIcon/>
          Créer son thème personnalisé
        </Fab>
      <Dialog open={openColorPicker} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>Créer son thème personnalisé</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            Sélectionner une couleur principale et secondaire
          </DialogContentText>
          <Grid container spacing={2} className={classes.grid} style={{}}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={changeTheme} color="secondary">
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
