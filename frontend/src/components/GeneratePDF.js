// REACT
import React from "react";
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
import Fab from "@material-ui/core/Fab";
// MATERIAL UI ICON
import HomeWorkIcon from "@material-ui/icons/HomeWork";
// OTHER
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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
}));

// Create styles
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf",
      fontStyle: "italic",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf",
      fontWeight: "extrabold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Open Sans",
    flexDirection: "column",
    padding: "10mm",
  },
  header: {
    // justifyContent: "space-between",
    flexDirection: "row",
  },
});

const GeneratePDF = ({
  apiData,
  indexSelected,
  screenshot,
  openPdfDialog,
  setOpenPdfDialog,
}) => {
  const classes = useStyles();
  const today = () => {
    const today = Date.now();
    const date = new Date(today);
    const formatDate = date.toLocaleDateString();
    return formatDate;
  };

  const handleCloseDialog = () => {
    setOpenPdfDialog(false);
  };

  const document = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
            <Image
              src="/icons/manifest-icon-192.png"
              style={{ height: "50mm" }}
            />
          <View style={{ textAlign: "right", flexGrow:1 }}>
            <Text style={{ fontWeight: "extrabold", fontSize: 25 }}>
              Rapport Sismo
            </Text>
            <Text style={{ fontStyle: "italic" }}>Édité le {today()}</Text>
          </View>
          {/* <Image src={screenshot}/> */}
        </View>
        <hr/>
        <View>
        </View>
        <View>
          <Text>Section #3</Text>
        </View>
      </Page>
    </Document>
  );

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
            <Grid item xs={12}>
              <PDFViewer width="100%" height="500px">
                {document()}
              </PDFViewer>
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
  };
};

export default connect(mapStateToProps)(GeneratePDF);
