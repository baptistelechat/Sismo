// REACT
import React, { useState } from "react";
// REDUX
import { connect } from "react-redux";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
// MATERIAL UI ICON
import HomeWorkIcon from "@material-ui/icons/HomeWork";
// COMPONENTS
import DocumentPDF from "./DocumentPDF";
import CGU from "../drawerItem/CGU"
// OTHER
import { PDFViewer } from "@react-pdf/renderer";

// STYLE
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.secondary.main,
    margin: 0,
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
  listItem: {
    marginBottom: theme.spacing(1),
  },
  firstFab: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  switch: {
    marginBottom: theme.spacing(1),
  },
  formControlLabel: {
    color: theme.palette.text.primary,
  }
}));

const GeneratePDF = ({
  apiData,
  geoData,
  indexSelected,
  screenshot,
  openPdfDialog,
  setOpenPdfDialog,
}) => {
  const classes = useStyles();

  const [consent, setConsent] = useState(false);

  const handleCloseDialog = () => {
    setOpenPdfDialog(false);
  };

  const showPDF = () => {
    setConsent(!consent);
  };

  return (
    <div>
      <Dialog
        open={openPdfDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h4 className={classes.title}>Imprimer la recherche Sismo</h4>
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "16px" }}>
          <DialogContentText className={classes.dialogContentText}>
            Visualisez le PDF avant son impression
          </DialogContentText>
          <Grid container spacing={0} className={classes.gridContainer}>
            {apiData[indexSelected] !== undefined ? (
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <HomeWorkIcon fontSize="large" color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary={apiData[indexSelected].nomCommune}
                  secondary={`Code postal : ${apiData[indexSelected].codePostal} - INSEE : ${apiData[indexSelected].insee}`}
                />
              </ListItem>
            ) : null}
            <FormControl component="fieldset" className={classes.switch}>
              <FormControlLabel
                className={classes.formControlLabel}
                value="start"
                control={
                  <Switch
                    color="secondary"
                    checked={consent}
                    onChange={showPDF}
                  />
                }
                label="J'ai lu et j'accepte les Conditions générales d'utilisation"
                labelPlacement="start"
              />
            </FormControl>
            <CGU/>
            <Grid item xs={12}>
              {consent ? (
                <PDFViewer width="100%" height="500px">
                  <DocumentPDF
                    apiData={apiData}
                    geoData={geoData}
                    indexSelected={indexSelected}
                    screenshot={screenshot}
                  />
                </PDFViewer>
              ) : (
                <div></div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    geoData: state.geoApi.city,
  };
};

export default connect(mapStateToProps)(GeneratePDF);
