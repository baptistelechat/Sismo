// REACT
import React, { useState, useEffect } from "react";
// REDUX
import { connect } from 'react-redux'
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
// MATERIAL UI ICON
import MenuIcon from '@material-ui/icons/Menu';
import GetAppIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';
// COMPONENTS
import LicenceMIT from "./drawerItem/LicenceMIT";
import CGU from "./drawerItem/CGU";
import Contact from './drawerItem/Contact';
import ThemeSelector from "./theme/ThemeSelector";

// OTHER
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from 'react-hot-toast'
// PICTURES
import logo from '../img/logo.png'

// STYLE
const useStyles = makeStyles((theme) => ({
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
  logo: {
    height: '48px',
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  }
}));

const MyDrawer = ({materialTheme}) => {

  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false)
  const [supportPWA, setSupportPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const clipboard = 
`Sismo

Visitez Sismo ! Un outil pour connaître les zones de neige, de vent et de sismicité en France (y compris les DROM-COM).

Découvrez également d'autres fonctionnalités ...

Application créée par Baptiste LECHAT et Matthieu LECHAT.

https://sismo.vercel.app/`

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportPWA(true);
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
    // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    // <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

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
          <h2 className={classes.h2} onClick={() => document.location.reload()}>Sismo</h2>
          <img className={classes.logo} src={logo} alt="logo Sismo" onClick={() => document.location.reload()}/>
        </ListItem>
        <List className={classes.list}>
          <ThemeSelector/>
          {supportPWA ? 
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
          <CGU/>
          <Divider />
          <ListItem>
            <h3 className={classes.h3}>Contact</h3>
          </ListItem>
          <Contact toggleDrawer={toggleDrawer}/>
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

export default connect(mapStateToProps)(MyDrawer);
