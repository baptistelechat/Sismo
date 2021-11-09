// REACT
import React, { useContext, useEffect, useState } from "react";
// Firebase
import { FirebaseContext } from "../../../services/firebase";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
// MATERIAL UI ICON
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PersonIcon from "@material-ui/icons/Person";
//OTHER
import toast from "react-hot-toast";

// STYLE
const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.primary.main,
    margin: theme.spacing(1),
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: "100%",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  mainAvatar: {
    width: "150px",
    height: "150px",
  },
}));

const ChangeAvatar = ({ userSession, avatar, setAvatar }) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const [newAvatar, setNewAvatar] = useState("");

  const seed = () => {
    const random = Math.floor(Math.random() * (10000 - 1) + 1);
    return random;
  };

  const generateAvatar = () => {
    const url = avatar.split("?colors=");
    const newAvatar = url[0] + "-" + seed() * seed() + "?colors=" + url[1];
    return newAvatar;
  };

  const handleSubmitChangeAvatar = () => {
    if (newAvatar !== avatar) {
      firebase.userCollection(userSession.uid).update({ avatar: newAvatar });
      firebase.userCollection(userSession.uid).update({ modified: Date.now() });
      toast.success(`🔐 Avatar mis à jour avec succès.`, {
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
      setAvatar(newAvatar);
      setNewAvatar(newAvatar);
    }
  };

  useEffect(() => {
    if (!!userSession) {
      firebase
        .userCollection(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const data = doc.data();
            setAvatar(data.avatar);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [firebase, userSession, setAvatar]);

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

  return (
    <div>
      <h3 className={classes.subtitle}>Modifier mon avatar</h3>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar alt="avatar" src={avatar} className={classes.mainAvatar} />
          <div>
            <Avatar
              alt="avatar"
              src={generateAvatar()}
              className={classes.avatar}
            />
            <Avatar
              alt="avatar"
              src={generateAvatar()}
              className={classes.avatar}
            />
            <Avatar
              alt="avatar"
              src={generateAvatar()}
              className={classes.avatar}
            />
            <Avatar
              alt="avatar"
              src={generateAvatar()}
              className={classes.avatar}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={"auto"}
          sm={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {avatar !== newAvatar ? (
            <Fab
              variant="extended"
              component="span"
              color="secondary"
              className={classes.fab}
              // onClick={handleSubmitChangeAvatar}
              // onClick={generateAvatar}
              onClick={workInProgress}
            >
              <PersonIcon className={classes.extendedIcon} />
              Changer mon avatar
            </Fab>
          ) : (
            <Fab
              disabled
              variant="extended"
              component="span"
              color="secondary"
              className={classes.fab}
              onClick={workInProgress}
            >
              <PersonOutlineIcon className={classes.extendedIcon} />
              Changer mon avatar
            </Fab>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangeAvatar;
