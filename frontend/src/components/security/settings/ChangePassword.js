// REACT
import React, { useContext } from "react";
// Firebase
import { FirebaseContext } from "../../../services/firebase";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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

const ChangePassword = ({
  userSession,
  email,
  currentPassword,
  setCurrentPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  newPassword,
  setNewPassword,
  showNewPassword,
  setShowNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  showConfirmNewPassword,
  setShowConfirmNewPassword
}) => {

  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.currentTarget.value);
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

  const handleClickShowNewPassword = () => {
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

  return (
    <div>
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
    </div>
  );
}

export default ChangePassword;
