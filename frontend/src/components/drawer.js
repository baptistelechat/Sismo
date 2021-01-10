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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Switch from "@material-ui/core/Switch";

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
  }
}));

const MyDrawer = ({setDarkTheme, setLightTheme, theme}) => {

  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false)
  const [light, setLight] = useState(false)

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
  
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ListItem className={classes.ListItemHeader}>
        <ListItemIcon><MenuIcon className={classes.iconHeader}/></ListItemIcon>
        <h1 className={classes.h1}>Sismo</h1>
      </ListItem>
      <div>
        Icons made by <a href="https://www.flaticon.com/free-icon/wind_481476?related_item_id=481476&term=wind" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </div>
      <div>
        Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </div>
      <div>
        Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </div>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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
        {list()}
        <List>
          <ListItem button onClick={handleThemeChange}>
            <ListItemIcon>{theme.type === "light" ? <BrightnessLowIcon/> : <Brightness4Icon/>}</ListItemIcon>
              <ListItemText primary={theme.type === "light" ? "Thème Clair" : "Thème Sombre"} />
              <Switch checked={light} onChange={handleThemeChange}/>
          </ListItem>
        </List>

      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
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
