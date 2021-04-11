import React from 'react';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
// FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// PICTURES
import Pop_Baptiste from '../../img/pop/Pop_Baptiste.png'
import Pop_Matthieu from '../../img/pop/Pop_Matthieu.png'

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
}))

const Contact = ({toggleDrawer}) => {
  
  const classes = useStyles();

  const urlLinkedin = 'https://www.linkedin.com/in/baptiste-lechat-3686a6174/'
  const urlGithub = 'https://github.com/baptistelechat'
  const urlMail = 'mailto:baptistelechat@outlook.fr'
  const urlMessenger = 'https://m.me/baptistelechat72'

  const openLink = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  
  return (
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
}

export default Contact;
