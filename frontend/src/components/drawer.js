import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import {
  setIndigoPinkTheme,
  setCyanAmberTheme,
  setRedBrownTheme,
  setLightGreenBlueTheme,
  setPersoTheme,
} from '../redux/theme/actionTheme'
import { setPrimaryColorPicker, setSecondaryColorPicker } from '../redux/colorPicker/actionColorPicker'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Switch from "@material-ui/core/Switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import TextureIcon from '@material-ui/icons/Texture';
import Fab from '@material-ui/core/Fab';
import ColorPicker from './colorPicker'
import convert from 'color-convert'
import GetAppIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast'
import LicenceMIT from "./licenceMIT";

import Pop_Baptiste from '../img/pop/Pop_Baptiste.png'
import Pop_Matthieu from '../img/pop/Pop_Matthieu.png'
import logo from '../img/logo.png'


const useStyles = makeStyles((theme) => ({
  contact: {
    width: '25vw',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '33vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '75vw',
    },
  },
  list: {
    marginBottom: theme.spacing(3)
  },
  h2: {
    color: theme.palette.common.white
  },
  h3: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  menuButton: {
    color: theme.palette.common.white,
  },
  iconHeader: {
    fontSize: 40,
    color: theme.palette.common.white
  },
  ListItemHeader: {
    backgroundColor: theme.palette.primary.main
  },
  fontAwesomeIcon: {
    fontSize: '45px',
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '35px',
      padding: theme.spacing(1),
    },
  },
  iconContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  pop: {
    height: '40px',
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    
  },
  logo: {
    height: '48px',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    marginLeft:theme.spacing(1),
    marginRight:theme.spacing(1),
    marginTop:theme.spacing(1),
    marginBottom:theme.spacing(3),
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

const MyDrawer = ({
  primaryColorPicker,
  secondaryColorPicker,
  setIndigoPinkTheme,
  setCyanAmberTheme,
  setRedBrownTheme,
  setLightGreenBlueTheme,
  setPersoTheme,
  setPrimaryColorPicker,
  setSecondaryColorPicker,
  materialTheme}) => {

  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false)
  const [dark, setDark] = useState(false)
  const [theme, setTheme] = useState("indigo_pink")

  const [supportsPWA, setSupportsPWA] = useState(false);
  // const [supportsPWA, setSupportsPWA] = useState(true);
  const [promptInstall, setPromptInstall] = useState(null);

  const urlLinkedin = 'https://www.linkedin.com/in/baptiste-lechat-3686a6174/'
  const urlGithub = 'https://github.com/baptistelechat'
  const urlMail = 'mailto:baptistelechat@outlook.fr'
  const urlMessenger = 'https://m.me/baptistelechat72'

  const clipboard = 
`Sismo

Visitez Sismo ! Un outil pour connaître les zones de neige, de vent et de sismicité en France (y compris les DROM-COM).

Découvrez également d'autres fonctionnalités ...

Application créée par Baptiste LECHAT et Matthieu LECHAT

https://sismo.vercel.app/`

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleThemeChange = () => {
    setDark(!dark)
    changeTheme(theme, !dark)
  };

  const changeTheme = (id, dark) => {
    switch (id) {
      case "indigo_pink": 
        setIndigoPinkTheme(dark)
        setTheme("indigo_pink")
        setPrimaryColorPicker('#3f51b5')
        setSecondaryColorPicker('#e91e63')
        break
      case "cyan_amber":
        setCyanAmberTheme(dark)
        setTheme("cyan_amber")
        setPrimaryColorPicker('#00acc1')
        setSecondaryColorPicker('#ffb300')
        break
      case "red_brown":
        setRedBrownTheme(dark)
        setTheme("red_brown")
        setPrimaryColorPicker('#d32f2f')
        setSecondaryColorPicker('#795548')
        break
      case "light_green_blue":
        setLightGreenBlueTheme(dark)
        setTheme("light_green_blue")
        setPrimaryColorPicker('#8bc34a')
        setSecondaryColorPicker('#2196f3')
        break
      case "perso":
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
        
        setPersoTheme(primaryColorPicker, secondaryColorPicker, secondaryColorPickerDark, toastColor, dark)
        setTheme("perso")
        setPrimaryColorPicker(primaryColorPicker)
        setSecondaryColorPicker(secondaryColorPicker)
        break
      default :
        setIndigoPinkTheme(dark)
    }
  }

  const openLink = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const install = (event) => {
    event.preventDefault();
    if (!promptInstall) {
        return
    }
    promptInstall.prompt();
}

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sismo',
        text: 
`Visitez Sismo ! Un outil pour connaître les zones de neige, de vent et de sismicité en France (y compris les DROM-COM).

Découvrez également d'autres fonctionnalités ...

Application créée par Baptiste LECHAT et Matthieu LECHAT`,
        url: 'https://sismo.vercel.app/',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    } else {
      console.log('navigator.share not supported by the browser');
      toast.success(
        `Lien de partage copié dans le presse-papier`,
        {duration: 5000,
          icon: '📃',
          style: {
            background: materialTheme.toastColor,
            color: '#FFFFFF',
          },
        }
      )
    }
  }
    // <div>
    //       Icons made by <a href="https://www.flaticon.com/free-icon/wind_481476?related_item_id=481476&term=wind" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    //     </div>
    //     <div>
    //       Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    //     </div>
    //     <div>
    //       Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    //     </div>
    //     <div>
    //       Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    //     </div>
  
  const contact = () => (
    <div
      className={classes.contact}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={classes.iconContainer}>
        <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faLinkedin} onClick={() => openLink(urlLinkedin)}/>
        <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faGithub} onClick={() => openLink(urlGithub)}/>
        <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faEnvelope} onClick={() => openLink(urlMail)}/>
        <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faFacebookMessenger} onClick={() => openLink(urlMessenger)}/>
      </div>
      <div className={classes.iconContainer}>
          <img src={Pop_Baptiste} alt="Pop Baptiste" className={classes.pop}/>
          <p style={{fontWeight: 'bold'}}>Baptiste LECHAT</p>
      </div>
      <div className={classes.iconContainer}>
          <img src={Pop_Matthieu} alt="Pop Matthieu" className={classes.pop}/>
          <p style={{fontWeight: 'bold'}}>Matthieu LECHAT</p>
      </div>
    </div>
  );

  const themeSelector = () => (
    <div>
      <div className={classes.iconContainer}>
          <Fab className={`${classes.fab} ${classes.indigoPinkTheme}`} color="secondary" aria-label="add" size="small" onClick={() => changeTheme("indigo_pink", dark)}>
            <TextureIcon/>
          </Fab>
          <Fab className={`${classes.fab} ${classes.cyanAmberTheme}`} color="secondary" aria-label="add" size="small" onClick={() => changeTheme("cyan_amber", dark)}>
            <TextureIcon/>
          </Fab>
          <Fab className={`${classes.fab} ${classes.redBrownTheme}`} color="secondary" aria-label="add" size="small" onClick={() => changeTheme("red_brown", dark)}>
            <TextureIcon/>
          </Fab>
          <Fab className={`${classes.fab} ${classes.lightGreenBlueTheme}`} color="secondary" aria-label="add" size="small" onClick={() => changeTheme("light_green_blue", dark)}>
            <TextureIcon />
          </Fab>
     </div>
      <div className={classes.iconContainer}>
        <ColorPicker className={classes.colorPicker} setTheme={setTheme}/>
      </div>
    </div>
  );

  return (
    <div>
      <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
          <MenuIcon />
      </IconButton>
      <Drawer anchor={'left'} open={openDrawer} onClose={toggleDrawer(false)}>
        <ListItem className={classes.ListItemHeader}>
          <ListItemIcon><MenuIcon className={classes.iconHeader}/></ListItemIcon>
          <h2 className={classes.h2}>Sismo</h2>
          <img className={classes.logo} src={logo} alt="logo Sismo"/>
        </ListItem>
        <List className={classes.list}>
          <ListItem>
              <h3 className={classes.h3}>Personnalisation</h3>
          </ListItem>
          <ListItem button onClick={handleThemeChange}>
            <ListItemIcon>{materialTheme.type === "light" ? <BrightnessLowIcon/> : <Brightness4Icon/>}</ListItemIcon>
              <ListItemText primary={materialTheme.type === "light" ? "Thème Clair" : "Thème Sombre"} />
              <Switch checked={dark} onChange={handleThemeChange}/>
          </ListItem>
          {themeSelector()}
          <Divider />
          <ListItem>
            <h3 className={classes.h3}>Autres options de Sismo</h3>
          </ListItem>
          {supportsPWA ? 
            (<ListItem button onClick={install}>
              <ListItemIcon><GetAppIcon/></ListItemIcon>
              <ListItemText primary={"Installer"} secondary={"Installer Sismo sur votre appareil"}/> 
            </ListItem>) 
            :
            <div></div>
          }
          {navigator.share ?
            (<ListItem button onClick={share}>
                <ListItemIcon><ShareIcon/></ListItemIcon>
                <ListItemText primary={"Partager"} secondary={"Partager l'application autour de vous"}/>
              </ListItem>)
            :
            (<CopyToClipboard text={clipboard}>
              <ListItem button onClick={share}>
                <ListItemIcon><ShareIcon/></ListItemIcon>
                <ListItemText primary={"Partager"} secondary={"Partager l'application autour de vous"}/>
              </ListItem>
            </CopyToClipboard>)
          }
          <LicenceMIT/>
          <Divider />
          <ListItem>
            <h3 className={classes.h3}>Contact</h3>
          </ListItem>
          {contact()}
        </List>
      </Drawer>
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
    },
    setPersoTheme: (primaryColorPicker, secondaryColorPicker, secondaryColorPickerDark, toastColor, darkmode) => {
      dispatch(setPersoTheme(primaryColorPicker, secondaryColorPicker, secondaryColorPickerDark, toastColor, darkmode))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDrawer);
