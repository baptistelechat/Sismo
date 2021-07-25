// REACT
import React, { useContext, useState, useEffect } from "react";
// Firebase
import { FirebaseContext } from "../../services/firebase";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
// MATERIAL UI ICON
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
//OTHER
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";

// STYLE
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
    margin: 0,
  },
  subtitle: {
    color: theme.palette.primary.main,
    margin: theme.spacing(1),
  },
  dialogContentText: {
    marginBottom: theme.spacing(1),
  },
  gridContainer: {
    width: "100%",
    background: "rgba(0,0,0,0)",
  },
  button: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  backDrop: {
    backdropFilter: "blur(10px)",
    backgroundColor: "#ffffff00",
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
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: "underline",
    width: "75%",
    "&:hover": {
      color: theme.palette.secondary.main,
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const ProfilSettings = ({
  materialTheme,
  userSession,
  openSettings,
  setOpenSettings,
}) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const [avatar, setAvatar] = useState(
    "https://source.boringavatars.com/beam/500/?colors=3f51b5,e91e63"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [firebasePassword, setFirebasePassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isCurrentPassword, setIsCurrentPassword] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.currentTarget.value);
    if (firebasePassword !== "") {
      const compare = bcrypt.compare(
        event.currentTarget.value,
        firebasePassword,
        (err, res) => {
          setIsCurrentPassword(res);
        }
      );
    } else {
      setIsCurrentPassword(true);
    }
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.currentTarget.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.currentTarget.value);
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const forgetPassword = () => {
    firebase
      .passwordReset(email)
      .then((user) => {
        toast.success(
          `📧 Email de réinitialisation envoyé à l'adresse : ${email}`,
          {
            duration: 5000,
            style: {
              background: "#81c784",
              color: "#FFFFFF",
            },
            iconTheme: {
              primary: "#1b5e20",
              secondary: "#FFFFFF",
            },
          }
        );
        setFirebasePassword("");
        firebase.userCollection(userSession.uid).update({ password: "" });
        firebase
          .userCollection(userSession.uid)
          .update({ modified: Date.now() });
      })
      .catch((error) => {
        toast.error(`💥 ${error.message}`, {
          duration: 5000,
          style: {
            background: "#e57373",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#b71c1c",
            secondary: "#FFFFFF",
          },
        });
      });
  };

  const handleSubmit = () => {
    firebase
      .loginUser(email, currentPassword)
      .then(() => {
        firebase
          .updatePassword(newPassword)
          .then(() => {
            toast.success(`🔐 Mot de passe mis àjour avec succès.`, {
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
            firebase
              .userCollection(userSession.uid)
              .update({ password: bcrypt.hashSync(newPassword, 10) });
            firebase
              .userCollection(userSession.uid)
              .update({ modified: Date.now() });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setIsCurrentPassword(false);
            setFirebasePassword(bcrypt.hashSync(newPassword, 10));
          })
          .catch((error) => {
            toast.error(`💥 ${error.message}`, {
              duration: 5000,
              style: {
                background: "#e57373",
                color: "#FFFFFF",
              },
              iconTheme: {
                primary: "#b71c1c",
                secondary: "#FFFFFF",
              },
            });
          });
      })
      .catch((error) => {
        toast.error(`💥 ${error.message}`, {
          duration: 5000,
          style: {
            background: "#e57373",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#b71c1c",
            secondary: "#FFFFFF",
          },
        });
      });
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
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setFirebasePassword(
              !data.password || data.password === "" ? "" : data.password
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [firebase, userSession]);

  return (
    <div>
      <Dialog
        open={openSettings}
        onClose={handleCloseSettings}
        aria-labelledby="form-dialog-title"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle id="form-dialog-title">
          <h4 className={classes.title}>Mon espace Sismo</h4>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "16px" }}>
          <DialogContentText
            className={classes.dialogContentText}
          ></DialogContentText>
          <Grid container spacing={0} className={classes.gridContainer}>
            <Grid item xs={12}>
              <h3 className={classes.subtitle}>
                Mes informations personnelles
              </h3>
              <p>{`Prénom : ${firstName}`}</p>
              <p>{`Nom : ${lastName}`}</p>
              <p>{`Email : ${email}`}</p>
              <Avatar alt="avatar" src={avatar} className={classes.avatar} />
              <hr />
              <h3 className={classes.subtitle}>Modifier mon mot de passe</h3>
              <TextField
                required
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                label="Mot de passe actuel"
                variant="outlined"
                color="secondary"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                className={classes.textField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                error={currentPassword === newPassword && newPassword !== ""}
                helperText={
                  currentPassword === newPassword && newPassword !== ""
                    ? "Mot de passe déjà utilisé"
                    : ""
                }
                type={showNewPassword ? "text" : "password"}
                id="currentPassword"
                label="Nouveau mot de passe"
                variant="outlined"
                color="secondary"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className={classes.textField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                error={
                  newPassword !== confirmNewPassword &&
                  newPassword.length === confirmNewPassword.length
                }
                helperText={
                  newPassword !== confirmNewPassword &&
                  newPassword.length === confirmNewPassword.length
                    ? "Les mots de passe ne correspondent pas"
                    : ""
                }
                type={showConfirmNewPassword ? "text" : "password"}
                id="currentPassword"
                label="Confirmation de votre nouveau mot de passe"
                variant="outlined"
                color="secondary"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
                className={classes.textField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container spacing={0} className={classes.gridContainer}>
                <Grid item xs={"auto"} sm={6}>
                  <p className={classes.link} onClick={forgetPassword}>
                    Mot de passe oublié ?
                  </p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {isCurrentPassword &&
                  newPassword !== "" &&
                  confirmNewPassword !== "" &&
                  newPassword === confirmNewPassword &&
                  currentPassword !== newPassword ? (
                    <Fab
                      variant="extended"
                      component="span"
                      color="secondary"
                      className={classes.fab}
                      onClick={handleSubmit}
                    >
                      <LockOpenIcon className={classes.extendedIcon} />
                      Changer de mot de passe
                    </Fab>
                  ) : (
                    <Fab
                      disabled
                      variant="extended"
                      component="span"
                      color="secondary"
                      className={classes.fab}
                    >
                      <LockIcon className={classes.extendedIcon} />
                      Changer de mot de passe
                    </Fab>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilSettings;
