// REACT
import React, { useState } from "react";
// REDUX
import { connect } from "react-redux";
import { setIndex } from "../services/redux/indexSelected/actionIndexSelected";
import { geoApiCall } from "../services/redux/geoData/actionGeoData";
// MATERIAL UI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
// MATERIAL UI ICON
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import EditIcon from "@material-ui/icons/Edit";
// OTHER
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

// STYLE
const useStyles = makeStyles((theme) => ({
  speedDialDefault: {
    position: "fixed",
    "&.MuiSpeedDial-directionRight": {
      bottom: theme.spacing(13),
      left: theme.spacing(5),
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  speedDialResponsive: {
    position: "fixed",
    "&.MuiSpeedDial-directionUp": {
      bottom: theme.spacing(8),
      left: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  fab: {
    position: "fixed",
    top: theme.spacing(9),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    zIndex: "1000",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const MyTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: "12px",
  },
}))(Tooltip);

const Toolbox = ({
  indexSelected,
  apiData,
  geoData,
  geoApiCall,
  materialTheme,
  mapScreenshoter,
  setScreenshot,
  setOpenPdfDialog
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const nomCommune =
    geoData.length !== 0
      ? geoData.nomCommune
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].nomCommune;
  const nomCommuneExact =
    geoData.length !== 0
      ? geoData.nomCommuneExact
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].nomCommuneExact;
  const codeInsee =
    geoData.length !== 0
      ? geoData.insee
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].insee;
  const codePostal =
    geoData.length !== 0
      ? geoData.codePostal
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].codePostal;
  const latitude =
    geoData.length !== 0
      ? geoData.latitude
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].latitude;
  const longitude =
    geoData.length !== 0
      ? geoData.longitude
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].longitude;
  const codeDepartement =
    geoData.length !== 0
      ? geoData.codeDepartement
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].codeDepartement;
  const departement =
    geoData.length !== 0
      ? geoData.departement
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].departement;
  const region =
    geoData.length !== 0
      ? geoData.region
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].region;
  const wind =
    geoData.length !== 0
      ? geoData.vent
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].vent;
  const snow =
    geoData.length !== 0
      ? geoData.neige
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].neige;
  const seism =
    geoData.length !== 0
      ? geoData.seisme
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].seisme;

  const data = `🏡 ${nomCommuneExact} (${codePostal}) :
• Code INSEE : ${codeInsee}
• Département : ${departement} (${codeDepartement})
• Région : ${region}
• Latitude : ${latitude}
• Longitude : ${longitude}
• Coordonnées : ${latitude},${longitude}
• Vent : ${wind}
• Neige : ${snow}
• Sismicité : ${seism}
• Géoriques : https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport?form-commune=true&codeInsee=${codeInsee}&ign=false&CGU-commune=on&commune=${codePostal}+${nomCommuneExact}

Informations issues de Sismo : https://sismo.vercel.app/`;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const clipboardToast = () => {
    toast.success(`Résultats copiés dans le presse-papier`, {
      duration: 5000,
      icon: "📃",
      style: {
        background: materialTheme.toastColor,
        color: "#FFFFFF",
      },
    });
  };

  // const workInProgress = () => {
  //   toast.success(`Fonctionnalité en cours de développement`, {
  //     duration: 5000,
  //     icon: "👨‍💻",
  //     style: {
  //       background: "#e65100",
  //       color: "#FFFFFF",
  //     },
  //   });
  // };

  const downloadFile = (event) => {
    console.log(data);
    const element = document.createElement("a");
    const file = new Blob([data], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${nomCommune} (${codePostal}) - Sismo.txt`;
    element.click();
  };

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title:
            geoData.length !== 0
              ? `🏡 Sismo - ${nomCommuneExact}`
              : `🏡 Sismo - ${nomCommuneExact} (${codePostal})`,
          text: data,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("navigator.share not supported by the browser");
      toast.success(
        `Fonctionnalité non supportée par votre navigateur. Résultats copiés dans le presse-papier`,
        {
          duration: 5000,
          icon: "💻",
          style: {
            background: materialTheme.toastColor,
            color: "#FFFFFF",
          },
        }
      );
    }
  };

  const createPDF = () => {
    toast.success("Génération du fichier PDF ...", {
      duration: 5000,
      icon: "⏳",
      style: {
        background: materialTheme.toastColor,
        color: "#FFFFFF",
      },
    });
    mapScreenshoter
      .takeScreen("blob")
      .then((blob) => {
        setScreenshot(URL.createObjectURL(blob));
        console.log(URL.createObjectURL(blob));
        setOpenPdfDialog(true)
        // var img = document.createElement("img");
        // img.src = image;
        // document.querySelector(".myImg").prepend(img);
      })
      .catch((e) => {
        alert(e.toString());
      });
  };

  const handleGeolocation = () => {
    geoApiCall();
    setIndex(-1);
  };

  const actions = [
    {
      icon: (
        <CopyToClipboard text={data}>
          <FileCopyIcon onClick={clipboardToast} />
        </CopyToClipboard>
      ),
      name: "Copier dans le presse-papier",
    },
    { icon: <ShareIcon onClick={share} />, name: "Partager" },
    {
      icon: <SaveIcon onClick={downloadFile} />,
      name: "Enregistrer",
    },
    { icon: <PrintIcon onClick={createPDF} />, name: "Imprimer" },
  ];

  return (
    <div>
      {apiData[indexSelected] === undefined && geoData.length === 0 ? (
        <div></div>
      ) : (
        <div>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDialDefault}
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={"right"}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement={"top"}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
          <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDialResponsive}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={"up"}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement={"top"}
                onClick={handleClose}
              />
            ))}
          </SpeedDial>
        </div>
      )}
      <MyTooltip
        title="Me géolocaliser"
        enterDelay={500}
        leaveDelay={300}
        TransitionComponent={Zoom}
        interactive
        arrow
      >
        <Fab
          className={classes.fab}
          color="secondary"
          aria-label="add"
          size="medium"
          onClick={handleGeolocation}
        >
          <MyLocationIcon />
        </Fab>
      </MyTooltip>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    materialTheme: state.theme,
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    geoData: state.geoApi.city,
    mapScreenshoter: props.mapScreenshoter,
    setScreenshot: props.setScreenshot,
    setOpenPdfDialog: props.setOpenPdfDialog
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIndex: (index) => {
      dispatch(setIndex(index));
    },
    geoApiCall: () => {
      dispatch(geoApiCall());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox);
