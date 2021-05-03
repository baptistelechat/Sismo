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
import LockOpenIcon from "@material-ui/icons/LockOpen";
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

const Login = ({ setAuthState, handleCloseDialog }) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const data = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(data);

  const [showPassword, setShowPassword] = useState(false);

  const handleTextFieldChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { email, password } = loginData;

  const handleSubmit = () => {
    const { email, password } = loginData;
    firebase
      .loginUser(email, password)
      .then((user) => {
        setLoginData({ ...data });
        toast.success(`🎉 ${email} connecté !`, {
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
        handleCloseDialog();
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
        setLoginData({ ...data });
      });
  };

  const button =
    email === "" || password === "" || password.length < 6 ? (
      <Fab variant="extended" size="medium" disabled className={classes.fab}>
        <LockOpenIcon className={classes.icon} />
        Connexion
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
        <LockOpenIcon className={classes.icon} />
        Connexion
      </Fab>
    );

  return (
    <div>
      <Grid container spacing={0} className={classes.gridContainer}>
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
            autoFocus
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
        </Grid>
      </Grid>
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={"auto"} sm={8}>
          <p
            className={classes.link}
            onClick={() => setAuthState("forgetPassword")}
          >
            Mot de passe oublié ?
          </p>
          <p className={classes.link} onClick={() => setAuthState("signUp")}>
            Nouveau sur Sismo ? Inscrivez-vous
          </p>
        </Grid>
        <Grid item xs={12} sm={4}>
          {button}
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
