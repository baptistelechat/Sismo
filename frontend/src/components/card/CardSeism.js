import React from "react";
// REDUX
import { connect } from "react-redux";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// SEISM
import seism_default from "../../img/seism/seism-default.png";
import seism_1 from "../../img/seism/seism-1.png";
import seism_2 from "../../img/seism/seism-2.png";
import seism_3 from "../../img/seism/seism-3.png";
import seism_4 from "../../img/seism/seism-4.png";
import seism_5 from "../../img/seism/seism-5.png";
import seism_default_dark from "../../img/seism/seism-default-dark.png";
// import seism_error from "../../img/seism/seism-error.png";
// import seism_error_dark from "../../img/seism/seism-error-dark.png";

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

const CardSeism = ({ indexSelected, apiData, geoData, materialTheme }) => {
  const classes = useStyles();

  const seism =
    geoData.length !== 0
      ? geoData.seisme
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].seisme;

  return (
    <Grid item xs={12} sm={12} md={4}>
      <Paper className={classes.paper} elevation={3}>
        <h3 className={classes.h3}>Séisme</h3>
        <img
          className={classes.img}
          src={
            seism === "1"
              ? seism_1
              : seism === "2"
              ? seism_2
              : seism === "3"
              ? seism_3
              : seism === "4"
              ? seism_4
              : seism === "5"
              ? seism_5
              : materialTheme.type === "dark"
              ? seism_default_dark
              : seism_default
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

export default connect(mapStateToProps)(CardSeism);
