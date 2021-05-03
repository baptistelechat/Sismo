// REACT
import React, { useContext } from "react";
// Firebase
import { FirebaseContext } from "../../services/firebase";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
// MATERIAL UI ICON
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import ContactsIcon from "@material-ui/icons/Contacts";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
}));

const Profil = ({ setOpenDialog }) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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

  const actions = [
    {
      icon: <ContactsIcon onClick={workInProgress} />,
      name: "Mon espace Sismo",
    },
    { icon: <ExitToAppIcon onClick={logOut} />, name: "Se déconnecter" },
    { icon: <FavoriteIcon onClick={workInProgress} />, name: "Soutenir" },
  ];

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDialDefault}
        icon={<PersonIcon />}
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
        ariaLabel="SpeedDial example"
        className={classes.speedDialResponsive}
        icon={<PersonIcon />}
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
