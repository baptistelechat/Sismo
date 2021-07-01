import React from "react";
// REDUX
import { connect } from "react-redux";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// SNOW
import snow_default from "../../img/snow/snow-default.png";
import snow_0 from "../../img/snow/snow-0.png";
import snow_A1 from "../../img/snow/snow-A1.png";
import snow_A2 from "../../img/snow/snow-A2.png";
import snow_B1 from "../../img/snow/snow-B1.png";
import snow_B2 from "../../img/snow/snow-B2.png";
import snow_C1 from "../../img/snow/snow-C1.png";
import snow_C2 from "../../img/snow/snow-C2.png";
import snow_D from "../../img/snow/snow-D.png";
import snow_E from "../../img/snow/snow-E.png";
import snow_error from "../../img/snow/snow-error.png";
import snow_default_dark from "../../img/snow/snow-default-dark.png";
import snow_error_dark from "../../img/snow/snow-error-dark.png";

// STYLE
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    height: "20vh",
    color: theme.palette.text.primary,
    alignItems: "center",
    textAlign: "center",
  },
  grid: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  h3: {
    marginTop: theme.spacing(1),
  },
  img: {
    height: "12vh",
    [theme.breakpoints.down("md")]: {
      height: "9.5vh",
    },
    [theme.breakpoints.down("sm")]: {
      height: "12vh",
    },
  },
}));

const CardSnow = ({ indexSelected, apiData, geoData, materialTheme }) => {
  const classes = useStyles();

  const snow =
    geoData.length !== 0
      ? geoData.neige
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].neige;

  return (
    <Grid item xs={12} sm={12} md={4}>
      <Paper className={classes.paper} elevation={3}>
        <h3 className={classes.h3}>Neige</h3>
        <img
          className={classes.img}
          src={
            snow === "A1"
              ? snow_A1
              : snow === "A2"
              ? snow_A2
              : snow === "B1"
              ? snow_B1
              : snow === "B2"
              ? snow_B2
              : snow === "C1"
              ? snow_C1
              : snow === "C2"
              ? snow_C2
              : snow === "D"
              ? snow_D
              : snow === "E"
              ? snow_E
              : snow === "0"
              ? snow_0
              : snow === "x" && materialTheme.type === "dark"
              ? snow_error_dark
              : snow === "x"
              ? snow_error
              : materialTheme.type === "dark"
              ? snow_default_dark
              : snow_default
          }
          alt="image_wind"
        />
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    materialTheme: state.theme,
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    geoData: state.geoApi.city,
  };
};

export default connect(mapStateToProps)(CardSnow);
