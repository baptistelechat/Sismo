// REACT
import React, { useState } from "react";
// REDUX
import { connect } from 'react-redux'
import { setPrimaryColorPicker, setSecondaryColorPicker } from '../redux/colorPicker/actionColorPicker'
import {
  setIndigoPinkTheme,
  setCyanAmberTheme,
  setRedBrownTheme,
  setLightGreenBlueTheme,
  setPersoTheme,
} from '../redux/theme/actionTheme'
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Switch from "@material-ui/core/Switch";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button'
// MATERIAL UI ICON
import BrushIcon from '@material-ui/icons/Brush';
import TextureIcon from '@material-ui/icons/Texture';
import HelpIcon from '@material-ui/icons/Help';
import SampleComponent from './sampleComponent'
// OTHER
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import convert from 'color-convert'

// STYLE
const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(3)
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
  theme: {
    marginLeft: theme.spacing(3)
  },
  indigoPinkTheme: {
    color: '#e91e63',
    background: '#3f51b5',
    '&:hover': {
      color: '#3f51b5',
    background: '#e91e63',
    },
  },
  cyanAmberTheme: {
    color: '#ffb300',
    background: '#00acc1',
    '&:hover': {
      color: '#00acc1',
    background: '#ffb300',
    },
  },
  redBrownTheme: {
    color: '#795548',
    background: '#d32f2f',
    '&:hover': {
      color: '#d32f2f',
    background: '#795548',
    },
  },
  lightGreenBlueTheme: {
    color: '#2196f3',
    background: '#8bc34a',
    '&:hover': {
      color: '#8bc34a',
    background: '#2196f3',
    },
  }
}));

const ThemePicker = ({
  materialTheme,
  theme,
  dark,
  primaryColorPicker,
  secondaryColorPicker,
  setTheme,
  setDark,
  setPersoTheme,
  setThemeSelected,
  setIndigoPinkTheme,
  setCyanAmberTheme,
  setRedBrownTheme,
  setLightGreenBlueTheme,
  setPrimaryColorPicker,
  setSecondaryColorPicker}) => {
  
  const classes = useStyles();
  
  const [openThemePicker, setOpenThemePicker] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openConfirmDark, setOpenConfirmDark] = useState(false)
  const [param, setParam] = React.useState('prédéfini');

  const handleClickOpen = () => {
    setOpenThemePicker(true);
  };

  const handlePrimaryColorChange = (event) => {
    setTheme("perso")
    setPrimaryColorPicker(event.target.value);
  };

  const handleSecondaryColorChange = (event) => {
    setTheme("perso")
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

  const changeTheme = (id, dark) => {
    switch (id) {
      case "indigo_pink": 
        setIndigoPinkTheme(dark)
        setTheme("indigo_pink")
        setPrimaryColorPicker('#3f51b5')
        setSecondaryColorPicker(dark === false ? '#e91e63' : '#f06292')
        setParam('prédéfini')
        break
      case "cyan_amber":
        setCyanAmberTheme(dark)
        setTheme("cyan_amber")
        setPrimaryColorPicker('#00acc1')
        setSecondaryColorPicker(dark === false ?'#ffb300' : '#ffca28')
        setParam('prédéfini')
        break
      case "red_brown":
        setRedBrownTheme(dark)
        setTheme("red_brown")
        setPrimaryColorPicker('#d32f2f')
        setSecondaryColorPicker(dark === false ?'#795548' : '#a1887f')
        setParam('prédéfini')
        break
      case "light_green_blue":
        setLightGreenBlueTheme(dark)
        setTheme("light_green_blue")
        setPrimaryColorPicker('#8bc34a')
        setSecondaryColorPicker(dark === false ? '#2196f3' : '#64b5f6')
        setParam('prédéfini')
        break
      case "perso":
        setPersoTheme(primaryColorPicker, secondaryColorPicker, secondaryColorPickerDark(), toastColor(), dark)
        setTheme('perso')
        setParam('perso')
        break
      default :
        setIndigoPinkTheme(dark)
    }   
  }
  
  const confirm = () => {
    if (param === 'prédéfini' && (primaryColorPicker !== materialTheme.mainPrimaryColor || secondaryColorPicker !== materialTheme.mainSecondaryColor)) {
      setOpenConfirm(true)
    } else {
      setTheme(theme)
      changeTheme(theme, dark)
      setOpenThemePicker(false);
    }
  }
  
  const closeDialog = () => {
    setOpenThemePicker(false);
    setOpenConfirm(false)
    changeTheme('perso', materialTheme.type === 'dark')
  }
  
  const cancel = () => {
    setOpenConfirm(false)
  }

  const closeConfirmDark = () => {
    setDark(!dark)
    changeTheme('perso', !dark)
    setOpenConfirmDark(false)
  }

  const cancelConfirmDark = () => {
    setOpenConfirmDark(false)
  }

  const handleThemeChange = () => {
    if (param === 'prédéfini' && (primaryColorPicker !== materialTheme.mainPrimaryColor || secondaryColorPicker !== materialTheme.mainSecondaryColor)) {
      setOpenConfirmDark(true)
    } else {
      setDark(!dark)
      changeTheme(theme, !dark)
    }
  };

  const handleChangeRadio = (event) => {
    setParam(event.target.value);
    if (event.target.value === 'perso') {
      setTheme('perso')
      changeTheme('perso', dark)
    } else if (event.target.value === 'prédéfini') {
      setTheme('indigo_pink')
      changeTheme('indigo_pink', dark)
    }
  }

  const openColorPickerButton = () => (
    <ListItem button onClick={handleClickOpen} className={classes.listItem}>
      <ListItemIcon><BrushIcon/></ListItemIcon>
      <ListItemText primary={"Choisir son thème"}/> 
    </ListItem>
  )

  const colorPicker = () => (
    <div>
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
    </div>
  )

  const definedTheme = () => (
    <div className={classes.iconContainer}>
      <Fab className={`${classes.fab} ${classes.indigoPinkTheme}`} aria-label="add" size="small" onClick={() => changeTheme("indigo_pink", dark)}>
        <TextureIcon/>
      </Fab>
      <Fab className={`${classes.fab} ${classes.cyanAmberTheme}`} aria-label="add" size="small" onClick={() => changeTheme("cyan_amber", dark)}>
        <TextureIcon/>
      </Fab>
      <Fab className={`${classes.fab} ${classes.redBrownTheme}`} aria-label="add" size="small" onClick={() => changeTheme("red_brown", dark)}>
        <TextureIcon/>
      </Fab>
      <Fab className={`${classes.fab} ${classes.lightGreenBlueTheme}`} aria-label="add" size="small" onClick={() => changeTheme("light_green_blue", dark)}>
        <TextureIcon />
      </Fab>
    </div>
  )

  return (
    <div>
      {openColorPickerButton()}
      <Dialog open={openThemePicker} onClose={confirm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Choisir son thème
          <Switch checked={materialTheme.type === 'dark'} onChange={handleThemeChange}/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText} onClick={() => {setParam('prédéfini'); setTheme('indigo_pink'); changeTheme('indigo_pink', dark)}}>
            <Radio
              checked={param === 'prédéfini'}
              onChange={handleChangeRadio}
              value="prédéfini"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'prédéfini' }}
            />
            Choisir parmi des thèmes prédéfinis
          </DialogContentText>
          {definedTheme()}
          <DialogContentText className={classes.dialogContentText} onClick={() => {setParam('perso'); setTheme('perso'); changeTheme('perso', dark)}}>
            <Radio
              checked={param === 'perso'}
              onChange={handleChangeRadio}
              value="perso"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'prédéfini' }}
            />
            Créer un thème personnalisé
          </DialogContentText>
          <Grid container spacing={1} className={classes.grid}>
            <Grid item xs={12} sm={6}>
              {colorPicker()}
              </Grid>
              <Grid item xs={12} sm={6}>
                <SampleComponent/>
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirm} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirm} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            <ListItem onClick={handleClickOpen} className={classes.listItem}>
              <ListItemIcon><HelpIcon fontSize='large' color="secondary"/></ListItemIcon>
              <ListItemText primary={"Attention ! Paramètres prédéfinies modifiés. Souhaitez-vous le définir comme thème personnalisé ?"}/> 
            </ListItem>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="secondary">
            Annuler
          </Button>
          <Button onClick={closeDialog} color="secondary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDark} onClose={cancelConfirmDark} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            <ListItem onClick={handleClickOpen} className={classes.listItem}>
              <ListItemIcon><HelpIcon fontSize='large' color="secondary"/></ListItemIcon>
              <ListItemText primary={"Attention ! Paramètres prédéfinies modifiés. Souhaitez-vous le définir comme thème personnalisé ?"}/> 
            </ListItem>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelConfirmDark} color="secondary">
            Annuler
          </Button>
          <Button onClick={closeConfirmDark} color="secondary">
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
    theme: props.theme,
    setTheme: props.setTheme,
    dark: props.dark,
    setDark: props.setDark
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

export default connect(mapStateToProps, mapDispatchToProps)(ThemePicker)
