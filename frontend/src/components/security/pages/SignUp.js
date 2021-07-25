import React, { useState, useContext } from "react";
// Firebase
import { FirebaseContext } from "../../../services/firebase";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
// MATERIAL UI ICON
import PersonIcon from "@material-ui/icons/Person";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// OTHER
import toast from "react-hot-toast";

// STYLE
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    background: "rgba(0,0,0,0)",
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  icon: {
    paddingRight: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  link: {
    textDecoration: "underline",
    width: "55%",
    "&:hover": {
      color: theme.palette.secondary.main,
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const SignUp = ({ setAuthState, setNewUser, setOpenDialog, avatar, setAvatar }) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const data = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setLoginData] = useState(data);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = loginData;
  
  const handleTextFieldChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
    setAvatar(
      `https://source.boringavatars.com/beam/500/${firstName}%20${lastName}%20${email}?colors=3f51b5,e91e63`
    );
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setAuthState("");
    }, 600);
  };


  const handleSubmit = () => {
    const { firstName, lastName, email, password } = loginData;
    firebase
      .signUpUser(email, password)
      .then((authUser) => {
        return firebase.userCollection(authUser.user.uid).set({
          firstName,
          lastName,
          email,
          avatar,
          created: Date.now(),
          modified: Date.now(),
        });
      })
      .then(() => {
        setLoginData({ ...data });
        toast.success(
          `🎉 Compte utilisateur créé pour ${firstName} ${lastName} avec l'adresse ${email} !`,
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
        setLoginData({ ...data });
        handleCloseDialog();
        setNewUser(true);
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

  const button =
    email === "" || password === "" || password !== confirmPassword ? (
      <Fab variant="extended" size="medium" disabled className={classes.fab}>
        <PersonIcon className={classes.icon} />
        S'inscrire
      </Fab>
    ) : (
      <Fab
        variant="extended"
        size="medium"
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={handleSubmit}
      >
        <PersonIcon className={classes.icon} />
        S'inscrire
      </Fab>
    );

  return (
    <div>
      <Grid container spacing={1} className={classes.gridContainer}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="firstName"
            id="firstName"
            label="Prénom"
            variant="outlined"
            color="secondary"
            value={firstName}
            onChange={handleTextFieldChange}
            className={classes.textField}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="lastName"
            id="lastName"
            label="Nom"
            variant="outlined"
            color="secondary"
            value={lastName}
            onChange={handleTextFieldChange}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            type="email"
            id="email"
            label="Email"
            variant="outlined"
            color="secondary"
            value={email}
            onChange={handleTextFieldChange}
            className={classes.textField}
          />
          <TextField
            required
            type={showPassword ? "text" : "password"}
            id="password"
            label="Mot de passe"
            variant="outlined"
            color="secondary"
            value={password}
            onChange={handleTextFieldChange}
            className={classes.textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            label="Confirmation de votre mot de passe"
            variant="outlined"
            color="secondary"
            value={confirmPassword}
            onChange={handleTextFieldChange}
            className={classes.textField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={"auto"} sm={9}>
          <p className={classes.link} onClick={() => setAuthState("login")}>
            Déjà inscrit ? Connectez-vous
          </p>
        </Grid>
        <Grid item xs={12} sm={3}>
          {button}
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
