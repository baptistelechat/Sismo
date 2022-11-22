import React, { useState } from "react";
// REDUX
import { connect } from "react-redux";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
// MATERIAL UI ICON
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonIcon from "@material-ui/icons/Person";
// OTHER
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
// COMPONENTS
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";

// STYLE
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
    margin: 0,
  },
  dialogContentText: {
    marginBottom: theme.spacing(2),
  },
  gridContainer: {
    width: "100%",
    background: "rgba(0,0,0,0)",
  },
  backDrop: {
    backdropFilter: "blur(10px)",
    backgroundColor: "#ffffff00",
  },
  icon: {
    paddingRight: theme.spacing(1),
  },
  fab: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    float: "right",
    marginBottom: theme.spacing(2),
  },
}));

const override = css`
  display: block;
  margin: 0 auto 32px auto;
`;

const Security = ({
  materialTheme,
  isLoading,
  isLogin,
  openDialog,
  setOpenDialog,
  setNewUser,
}) => {
  const classes = useStyles();

  const [authState, setAuthState] = useState("");
  const [avatar, setAvatar] = useState(
    "https://source.boringavatars.com/beam/500/?colors=3f51b5,e91e63"
  );
  return (
    <Dialog
      open={openDialog}
      aria-labelledby="form-dialog-title"
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <DialogTitle id="form-dialog-title">
        <h4 className={classes.title}>
          {authState === "signUp"
            ? "Inscription"
            : authState === "login"
            ? "Connexion"
            : authState === "forgetPassword"
            ? "Réinitialisation de votre mot de passe"
            : "Bienvenue sur l'application Sismo"}
        </h4>
      </DialogTitle>
      <DialogContent style={{ paddingBottom: "16px" }}>
        <DialogContentText className={classes.dialogContentText}>
          {isLoading === true
            ? ""
            : authState === "signUp"
            ? "Merci de remplir le formulaire ci-dessous :"
            : authState === "login"
            ? "Renseigner vos informations de connexion :"
            : authState === "forgetPassword"
            ? "Veuillez saisir votre adresse mail :"
            : "Veuillez vous connecter ou vous inscrire"}
          {authState === "signUp" ? (
            <Avatar alt="avatar" src={avatar} className={classes.avatar} />
          ) : (
            <div></div>
          )}
        </DialogContentText>
        <Grid container spacing={0} className={classes.gridContainer}>
          {isLoading === true ? (
            <PropagateLoader
              color={materialTheme.mainSecondaryColor}
              loading={isLoading}
              css={override}
              size={15}
            />
          ) : (
            <div>
              <Fab
                style={{ display: authState !== "" ? "none" : null }}
                variant="extended"
                size="medium"
                color="secondary"
                aria-label="add"
                className={classes.fab}
                onClick={() => setAuthState("login")}
              >
                <LockOutlinedIcon className={classes.icon} />
                Connexion
              </Fab>
              <Fab
                style={{ display: authState !== "" ? "none" : null }}
                variant="extended"
                size="medium"
                color="secondary"
                aria-label="add"
                className={classes.fab}
                onClick={() => setAuthState("signUp")}
              >
                <PersonIcon className={classes.icon} />
                Inscription
              </Fab>
            </div>
          )}
        </Grid>
        {authState === "signUp" ? (
          <SignUp
            // handleCloseDialog={handleCloseDialog}
            setOpenDialog={setOpenDialog}
            setAuthState={setAuthState}
            setNewUser={setNewUser}
            avatar={avatar}
            setAvatar={setAvatar}
            materialTheme={materialTheme}
          />
        ) : authState === "login" ? (
          <Login
            // handleCloseDialog={handleCloseDialog}
            setOpenDialog={setOpenDialog}
            setAuthState={setAuthState}
          />
        ) : authState === "forgetPassword" ? (
          <ForgetPassword
            // handleCloseDialog={handleCloseDialog}
            setOpenDialog={setOpenDialog}
            setAuthState={setAuthState}
          />
        ) : (
          <div></div>
        )}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    materialTheme: state.theme,
    isLoading: ownProps.isLoading,
    openDialog: ownProps.openDialog,
    setOpenDialog: ownProps.setOpenDialog,
    isLogin: ownProps.isLogin,
    setNewUser: ownProps.setNewUser,
  };
};

export default connect(mapStateToProps)(Security);
