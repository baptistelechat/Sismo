import React, { useState } from "react";
import { connect } from 'react-redux'
import { setDarkTheme, setLightTheme } from '../redux/theme/actionTheme'
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
import Pop from '../img/Pop_Baptiste.png'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '25vw',
    [theme.breakpoints.down('md')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '75vw',
    },
  },
  h1: {
    color: theme.palette.common.white
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
    marginTop: theme.spacing(2),
  },
  pop: {
    height: '40px',
    borderRadius: '50%',
    marginRight: theme.spacing(1),
  }
}));

const MyDrawer = ({setDarkTheme, setLightTheme, materialTheme}) => {

  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false)
  const [light, setLight] = useState(false)

  const urlLinkedin = 'https://www.linkedin.com/in/baptiste-lechat-3686a6174/'
  const urlGithub = 'https://github.com/baptistelechat'
  const urlMail = 'mailto:baptistelechat@outlook.fr'
  const urlMessenger = 'https://m.me/baptistelechat72'

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  const handleThemeChange = () => {
    setLight(!light)
    setTheme()
  };

  const setTheme = () => {
    if (!light) {
      setDarkTheme()
    } else {
      setLightTheme()
    }
  }

  const openLink = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      
      <Divider />
      <div className={classes.iconContainer}>
        <FontAwesomeIcon
          className={classes.fontAwesomeIcon}
          icon={faLinkedin}
          onClick={() => openLink(urlLinkedin)}/>
        <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faGithub} onClick={() => openLink(urlGithub)}/>
        <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faEnvelope} onClick={() => openLink(urlMail)}/>
        <FontAwesomeIcon className={classes.fontAwesomeIcon} icon={faFacebookMessenger} onClick={() => openLink(urlMessenger)}/>
      </div>
      <div className={classes.iconContainer}>
          <img src={Pop} alt="Pop Baptiste" className={classes.pop}/>
          <p style={{fontWeight: 'bold'}}>Baptiste LECHAT - M2 LMIOT</p>
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
          <h2 className={classes.h1}>Sismo</h2>
        </ListItem>
        <List>
        <ListItem button onClick={handleThemeChange}>
          <ListItemIcon>{materialTheme.type === "light" ? <BrightnessLowIcon/> : <Brightness4Icon/>}</ListItemIcon>
            <ListItemText primary={materialTheme.type === "light" ? "Thème Clair" : "Thème Sombre"} />
            <Switch checked={light} onChange={handleThemeChange}/>
        </ListItem>
        {list()}
        
        </List>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    materialTheme: state.theme,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDarkTheme: () => {
      dispatch(setDarkTheme())
    },
    setLightTheme: () => {
      dispatch(setLightTheme())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDrawer);
