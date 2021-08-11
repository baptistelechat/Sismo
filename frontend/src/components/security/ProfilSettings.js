// REACT
import React, { useState } from "react";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// MATERIAL UI ICON
import HelpIcon from "@material-ui/icons/Help";
// COMPONENTS
import ChangeProfileInformation from "./settings/ChangeProfileInformation";
import ChangePassword from "./settings/ChangePassword";

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
      setOpenConfirm(true);
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
              <ChangeProfileInformation
                userSession={userSession}
                firstName={firstName}
                firebaseFirstName={firebaseFirstName}
                lastName={lastName}
                firebaseLastName={firebaseLastName}
                email={email}
                firebaseEmail={firebaseEmail}
                emailPassword={emailPassword}
                avatar={avatar}
                showEmailPassword={showEmailPassword}
                setFirstName={setFirstName}
                setFirebaseFirstName={setFirebaseFirstName}
                setLastName={setLastName}
                setFirebaseLastName={setFirebaseLastName}
                setEmail={setEmail}
                setFirebaseEmail={setFirebaseEmail}
                setEmailPassword={setEmailPassword}
                setAvatar={setAvatar}
                setShowEmailPassword={setShowEmailPassword}
              />
              <hr/>
              <ChangePassword
                userSession={userSession}
                email={email}
                setShowConfirmNewPassword={setShowConfirmNewPassword}
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                showCurrentPassword={showCurrentPassword}
                setShowCurrentPassword={setShowCurrentPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                showNewPassword={showNewPassword}
                setShowNewPassword={setShowNewPassword}
                confirmNewPassword={confirmNewPassword}
                setConfirmNewPassword={setConfirmNewPassword}
                showConfirmNewPassword={showConfirmNewPassword}
              />
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
