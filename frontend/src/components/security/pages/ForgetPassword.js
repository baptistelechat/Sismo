import React, { useState, useContext } from "react";
// Firebase
import { FirebaseContext } from "../../../services/firebase";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
// MATERIAL UI ICON
import MailIcon from "@material-ui/icons/Mail";
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

const ForgetPassword = ({ setAuthState }) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  const data = {
    email: "",
  };

  const [loginData, setLoginData] = useState(data);

  const handleTextFieldChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const { email } = loginData;

  const handleSubmit = () => {
    const { email } = loginData;
    firebase
      .passwordReset(email)
      .then((user) => {
        setLoginData({ ...data });
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
        setLoginData({ ...data });
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
    email === "" || email.length < 6 ? (
      <Fab variant="extended" size="medium" disabled className={classes.fab}>
        <MailIcon className={classes.icon} />
        Envoyer
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
        <MailIcon className={classes.icon} />
        Envoyer
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
        </Grid>
      </Grid>
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={"auto"} sm={7}>
          <p className={classes.link} onClick={() => setAuthState("login")}>
            Déjà inscrit ? Connectez-vous
          </p>
        </Grid>
        <Grid item xs={12} sm={5}>
          {button}
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgetPassword;
