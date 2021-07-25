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
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// MATERIAL UI ICON
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PersonIcon from "@material-ui/icons/Person";
import HelpIcon from "@material-ui/icons/Help";
//OTHER
import toast from "react-hot-toast";

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
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  const [firebaseFirstName, setFirebaseFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firebaseLastName, setFirebaseLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firebaseEmail, setFirebaseEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [showEmailPassword, setShowEmailPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleCloseSettings = () => {
    if (
      firstName !== firebaseFirstName ||
      lastName !== firebaseLastName ||
      email !== firebaseEmail ||
      newPassword !== ""
    ) {
      setOpenConfirm(true)
    } else {
      setOpenSettings(false);
    }
  };

  const cancel = () => {
    setOpenConfirm(false);
    setOpenSettings(false);
    setFirstName(firebaseFirstName);
    setLastName(firebaseLastName);
    setEmail(firebaseEmail);
    setEmailPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const confirm = () => {
    setOpenConfirm(false);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.currentTarget.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.currentTarget.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.currentTarget.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.currentTarget.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.currentTarget.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handleEmailPasswordChange = (event) => {
    setEmailPassword(event.currentTarget.value);
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleClickShowEmailPassword = () => {
    setShowEmailPassword(!showEmailPassword);
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

  const handleSubmitChangeProfileInformation = () => {
    if (firstName !== firebaseFirstName) {
      firebase.userCollection(userSession.uid).update({ firstName: firstName });
      firebase.userCollection(userSession.uid).update({ modified: Date.now() });
      toast.success(`🔐 Informations mises à jour avec succès.`, {
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
      setFirebaseFirstName(firstName);
      setFirstName(firstName);
    }
    if (lastName !== firebaseLastName) {
      firebase.userCollection(userSession.uid).update({ lastName: lastName });
      firebase.userCollection(userSession.uid).update({ modified: Date.now() });
      toast.success(`🔐 Informations mises à jour avec succès.`, {
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
      setFirebaseLastName(lastName);
      setLastName(lastName);
    }
    if (email !== firebaseEmail) {
      firebase
        .loginUser(firebaseEmail, emailPassword)
        .then(() => {
          userSession
            .updateEmail(email)
            .then(() => {
              firebase.userCollection(userSession.uid).update({ email: email });
              firebase
                .userCollection(userSession.uid)
                .update({ modified: Date.now() });
              toast.success(`🔐 Informations mises à jour avec succès.`, {
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
              setFirebaseEmail(email);
              setEmail(email);
              setEmailPassword("");
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
    }
  };

  const handleSubmitChangePassword = () => {
    firebase
      .loginUser(email, currentPassword)
      .then(() => {
        firebase
          .updatePassword(newPassword)
          .then(() => {
            toast.success(`🔐 Mot de passe mis à jour avec succès.`, {
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
              .update({ modified: Date.now() });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
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
            setAvatar(data.avatar);
            setFirstName(data.firstName);
            setFirebaseFirstName(data.firstName);
            setLastName(data.lastName);
            setFirebaseLastName(data.lastName);
            setEmail(data.email);
            setFirebaseEmail(data.email);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [firebase, userSession]);

  const changeProfileInformation = () => (
    <div>
      <h3 className={classes.subtitle}>Mes informations personnelles</h3>
      <TextField
        required
        type={"text"}
        id="firstName"
        label="Prénom"
        variant="outlined"
        color="secondary"
        value={firstName}
        onChange={handleFirstNameChange}
        className={classes.textField}
      />
      <TextField
        required
        type={"text"}
        id="lastname"
        label="Nom"
        variant="outlined"
        color="secondary"
        value={lastName}
        onChange={handleLastNameChange}
        className={classes.textField}
      />
      <TextField
        required
        helperText={
          email !== firebaseEmail ? "Veuillez saisir votre mot de passe" : ""
        }
        type={"text"}
        id="email"
        label="Email"
        variant="outlined"
        color="secondary"
        value={email}
        onChange={handleEmailChange}
        className={classes.textField}
      />
      {email !== firebaseEmail ? (
        <TextField
          required
          type={showEmailPassword ? "text" : "password"}
          id="password"
          label="Mot de passe"
          variant="outlined"
          color="secondary"
          value={emailPassword}
          onChange={handleEmailPasswordChange}
          className={classes.textField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowEmailPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showEmailPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <div></div>
      )}
      <Grid container spacing={0}>
        <Grid
          item
          xs={"auto"}
          sm={5}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar alt="avatar" src={avatar} className={classes.avatar} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {firstName !== firebaseFirstName ||
          lastName !== firebaseLastName ||
          email !== firebaseEmail ? (
            <Fab
              variant="extended"
              component="span"
              color="secondary"
              className={classes.fab}
              onClick={handleSubmitChangeProfileInformation}
            >
              <PersonIcon className={classes.extendedIcon} />
              Modifier mes informations
            </Fab>
          ) : (
            <Fab
              disabled
              variant="extended"
              component="span"
              color="secondary"
              className={classes.fab}
            >
              <PermIdentityIcon className={classes.extendedIcon} />
              Modifier mes informations
            </Fab>
          )}
        </Grid>
      </Grid>
    </div>
  );

  const changePassword = () => (
    <div>
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
                {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
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
                onClick={handleClickShowNewPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
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
                {showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={0}>
        <Grid item xs={"auto"} sm={5}>
          <p className={classes.link} onClick={forgetPassword}>
            Mot de passe oublié ?
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {newPassword !== "" &&
          confirmNewPassword !== "" &&
          newPassword === confirmNewPassword &&
          currentPassword !== newPassword ? (
            <Fab
              variant="extended"
              component="span"
              color="secondary"
              className={classes.fab}
              onClick={handleSubmitChangePassword}
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
    </div>
  );

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
              {changeProfileInformation()}
              <hr />
              {changePassword()}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirm}
        aria-labelledby="form-dialog-title"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <HelpIcon fontSize="large" color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  "Attention ! Paramètres modifiés. Souhaitez-vous les conserver ?"
                }
              />
            </ListItem>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel} color="secondary">
            Non
          </Button>
          <Button onClick={confirm} color="secondary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilSettings;
