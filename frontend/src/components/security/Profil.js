// REACT
import React, { useContext, useState, useEffect } from "react";
// Firebase
import { FirebaseContext } from "../../services/firebase";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
// MATERIAL UI ICON
import FavoriteIcon from "@material-ui/icons/Favorite";
import ContactsIcon from "@material-ui/icons/Contacts";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
// COMPONENTS
import ProfilSettings from "./ProfilSettings";
// OTHER
import toast from "react-hot-toast";

// STYLE
const useStyles = makeStyles((theme) => ({
  speedDialDefault: {
    position: "fixed",
    "&.MuiSpeedDial-directionRight": {
      bottom: theme.spacing(4),
      left: theme.spacing(5),
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  speedDialResponsive: {
    position: "fixed",
    "&.MuiSpeedDial-directionDown": {
      top: theme.spacing(17),
      right: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Profil = ({ setOpenDialog, userSession }) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://source.boringavatars.com/beam/500/?colors=3f51b5,e91e63"
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const workInProgress = () => {
    toast.success(`Fonctionnalité en cours de développement`, {
      duration: 5000,
      icon: "👨‍💻",
      style: {
        background: "#e65100",
        color: "#FFFFFF",
      },
    });
  };

  const logOut = () => {
    firebase.signOutUser();
    toast.success("🖐 Déconnexion réussie, à bientôt sur Sismo !", {
      duration: 5000,
      style: {
        background: "#81c784",
        color: "#FFFFFF",
      },
      iconTheme: {
        primary: "#1b5e20",
        secondary: "#FFFFFF",
      },
    });
    setOpenDialog(true);
  };

  useEffect(() => {
    if (!!userSession) {
      firebase
        .userCollection(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const data = doc.data();
            setAvatar(
              `https://source.boringavatars.com/beam/500/${data.firstName}%20${data.lastName}%20${data.email}?colors=3f51b5,e91e63`
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [firebase, userSession]);

  const actions = [
    {
      icon: <ContactsIcon onClick={handleOpenSettings} />,
      name: "Mon espace Sismo",
    },
    { icon: <ExitToAppIcon onClick={logOut} />, name: "Se déconnecter" },
    { icon: <FavoriteIcon onClick={workInProgress} />, name: "Soutenir" },
  ];

  return (
    <div>
      <ProfilSettings
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
        avatar={avatar}
        userSession={userSession}
      />
      <SpeedDial
        color="secondary"
        ariaLabel="SpeedDial example"
        className={classes.speedDialDefault}
        icon={<Avatar alt="avatar" src={avatar} className={classes.avatar} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={"right"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipPlacement={"top"}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
      <SpeedDial
        color="secondary"
        ariaLabel="SpeedDial example"
        className={classes.speedDialResponsive}
        icon={<Avatar alt="avatar" src={avatar} className={classes.avatar} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={"down"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipPlacement={"top"}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Profil;
