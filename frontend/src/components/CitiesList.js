// REACT
import React from "react";
// REDUX
import { connect } from "react-redux";
import { setIndex } from "../services/redux/indexSelected/actionIndexSelected";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// MATERIAL UI ICON
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";
// OTHER
import ScrollArea from "react-scrollbar";
import toast from "react-hot-toast";

// STYLE
const useStyles = makeStyles((theme) => ({
  scrollbar: {
    height: "43vh",
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: 0,
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  p: {
    color: theme.palette.text.primary,
  },
  selected: {
    color: theme.palette.secondary.main,
  },
}));

function CitiesList({
  indexSelected,
  apiData,
  apiDataLoading,
  geoData,
  setIndex,
  materialTheme,
}) {
  const classes = useStyles();

  const listItemClicked = (index) => {
    setIndex(index);
    toastOutput(index);
    console.log(apiData[index]);
    const path = document.querySelectorAll("path.leaflet-interactive");
    const pathArray = [...path];
    const selectedPath = pathArray[index];
    if (pathArray.length === 1) {
      pathArray[0].setAttribute("fill", materialTheme.mainSecondaryColor);
      pathArray[0].setAttribute("stroke", materialTheme.mainSecondaryColor);
    } else {
      pathArray.forEach((el) => {
        if (el !== selectedPath) {
          if (el.getAttribute("fill") === "#ffffff00") {
            el.setAttribute("fill", "#ffffff00");
            el.setAttribute("stroke", "#ffffff00");
          } else {
            el.setAttribute("fill", materialTheme.mainPrimaryColor);
            el.setAttribute("stroke", materialTheme.mainPrimaryColor);
          }
        } else {
          if (el.getAttribute("fill") === "#ffffff00") {
            el.setAttribute("fill", "#ffffff00");
            el.setAttribute("stroke", "#ffffff00");
          } else {
            el.setAttribute("fill", materialTheme.mainSecondaryColor);
            el.setAttribute("stroke", materialTheme.mainSecondaryColor);
          }
        }
      });
    }
  };

  const toastOutput = (index) => {
    if (apiData[index].vent === "-") {
      toast.error(
        `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) - Données indisponible`,
        {
          duration: 5000,
          style: {
            background: "#e57373",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#b71c1c",
            secondary: "#FFFFFF",
          },
        }
      );
    } else {
      if (
        apiData[index].littoral === "Mer" ||
        apiData[index].littoral === "Estuaire"
      ) {
        toast.success(
          `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) sélectionnée🌊\u00a0Commune proche du littoral`,
          {
            duration: 5000,
            icon: "🏡",
            style: {
              background: materialTheme.toastColor,
              color: "#FFFFFF",
            },
          }
        );
      } else {
        toast.success(
          `${apiData[index].nomCommuneExact} (${apiData[index].codePostal}) sélectionnée`,
          {
            duration: 5000,
            icon: "🏡",
            style: {
              background: materialTheme.toastColor,
              color: "#FFFFFF",
            },
          }
        );
      }
    }
  };

  return (
    <div>
      <ListItem>
        <ListItemIcon>
          <SearchIcon color="secondary" fontSize="large" />
        </ListItemIcon>
        <h2 className={classes.h2}>
          {apiData.length > 1
            ? "Résultats de votre recherche"
            : "Résultat de votre recherche"}
        </h2>
      </ListItem>
      <ScrollArea className={classes.scrollbar}>
        {apiData.length === 0 && geoData.length === 0 ? (
          <ListItem>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.p}
              primary="Veuillez saisir une valeur dans le champ de recherche"
              secondary=""
            />
          </ListItem>
        ) : null}
        <List>
          {geoData.length === 0 ? (
            apiData.map((cities, index) => (
              <ListItem
                button
                key={index}
                onClick={() => listItemClicked(index)}
              >
                <ListItemIcon>
                  {indexSelected === index ? (
                    <CheckIcon color="secondary" />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </ListItemIcon>
                {indexSelected === index ? (
                  <ListItemText
                    className={classes.selected}
                    primary={
                      cities.littoral === "Mer" ||
                      cities.littoral === "Estuaire"
                        ? cities.nomCommune + " 🌊"
                        : cities.nomCommune
                    }
                    secondary={`Code postal : ${cities.codePostal} - INSEE : ${cities.insee}`}
                  />
                ) : (
                  <ListItemText
                    className={classes.p}
                    primary={
                      cities.codePostal
                        ? cities.littoral === "Mer" ||
                          cities.littoral === "Estuaire"
                          ? cities.nomCommune + " 🌊"
                          : cities.nomCommune
                        : "Aucune valeur correspondante à votre recherche"
                    }
                    secondary={
                      cities.codePostal
                        ? `Code postal : ${cities.codePostal} - INSEE : ${cities.insee}`
                        : null
                    }
                  />
                )}
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                className={classes.selected}
                primary={geoData.nomCommune}
                secondary={`Code postal : ${geoData.codePostal} - INSEE : ${geoData.insee}`}
              />
            </ListItem>
          )}
        </List>
      </ScrollArea>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    indexSelected: state.index.indexSelected,
    apiData: state.cityApi.cities,
    apiDataLoading: state.cityApi.isLoading,
    geoData: state.geoApi.city,
    materialTheme: state.theme,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setIndex: (index) => {
      dispatch(setIndex(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
