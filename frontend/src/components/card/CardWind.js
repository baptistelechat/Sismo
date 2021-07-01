import React from "react";
// REDUX
import { connect } from "react-redux";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// WIND
import wind_default from "../../img/wind/wind-default.png";
import wind_1 from "../../img/wind/wind-1.png";
import wind_2 from "../../img/wind/wind-2.png";
import wind_3 from "../../img/wind/wind-3.png";
import wind_4 from "../../img/wind/wind-4.png";
import wind_5 from "../../img/wind/wind-5.png";
import wind_error from "../../img/wind/wind-error.png";
import wind_default_dark from "../../img/wind/wind-default-dark.png";
import wind_error_dark from "../../img/wind/wind-error-dark.png";

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

const CardWind = ({ indexSelected, apiData, geoData, materialTheme }) => {
  const classes = useStyles();

  const wind =
    geoData.length !== 0
      ? geoData.vent
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].vent;

  return (
    <Grid item xs={12} sm={12} md={4}>
      <Paper className={classes.paper} elevation={3}>
        <h3 className={classes.h3}>Vent</h3>
        <img
          className={classes.img}
          src={
            wind === "1"
              ? wind_1
              : wind === "2"
              ? wind_2
              : wind === "3"
              ? wind_3
              : wind === "4"
              ? wind_4
              : wind === "5"
              ? wind_5
              : wind === "x" && materialTheme.type === "dark"
              ? wind_error_dark
              : wind === "x"
              ? wind_error
              : materialTheme.type === "dark"
              ? wind_default_dark
              : wind_default
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

export default connect(mapStateToProps)(CardWind);
