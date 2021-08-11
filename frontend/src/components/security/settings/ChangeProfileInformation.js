// REACT
import React, { useContext, useEffect } from "react";
// Firebase
import { FirebaseContext } from "../../../services/firebase";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton"; // MATERIAL UI ICON
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
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
}));

const ChangeProfileInformation = ({
  userSession,
  firstName,
  firebaseFirstName,
  lastName,
  firebaseLastName,
  email,
  firebaseEmail,
  emailPassword,
  avatar,
  showEmailPassword,
  setFirstName,
  setFirebaseFirstName,
  setLastName,
  setFirebaseLastName,
  setEmail,
  setFirebaseEmail,
  setEmailPassword,
  setAvatar,
  setShowEmailPassword,
}) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

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

  const handleClickShowEmailPassword = () => {
    setShowEmailPassword(!showEmailPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
  }, [
    firebase,
    userSession,
    setFirstName,
    setFirebaseFirstName,
    setLastName,
    setFirebaseLastName,
    setEmail,
    setFirebaseEmail,
    setAvatar,
  ]);

  return (
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
};

export default ChangeProfileInformation;
