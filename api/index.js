// Modules
const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const csv = require("csvtojson");
const path = require("path");
const axios = require("axios");
const https = require("https");

// Constants
const app = express();
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
const PORT = 8000;
const csvFilePath = path.join(__dirname, "/public/data.csv");
const APIversion = "/api/v1";

function toTitleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

const dataGouv = (insee) => {
  return axios
    .get(
      `https://geo.api.gouv.fr/communes?code=${insee}&fields=code,nom,codeDepartement,departement,codeRegion,region,centre,surface,population,codesPostaux,contour`
    )
    .then((dataGouv) => {
      if (dataGouv.data[0] !== undefined) {
        const obj = {
          insee: dataGouv.data[0].code,
          population: "-",
          surface: "-",
          latitude: "-",
          longitude: "-",
        };

        if (dataGouv.data.length !== 0) {
          dataGouv.data[0].population !== undefined
            ? (obj.population = dataGouv.data[0].population.toString())
            : (obj.population = "-");
          dataGouv.data[0].surface !== undefined
            ? (obj.surface = dataGouv.data[0].surface.toString())
            : (obj.surface = "-");
          dataGouv.data[0].contour !== undefined
            ? (obj.border = dataGouv.data[0].contour)
            : (obj.border = "-");
          if (dataGouv.data[0].centre !== undefined) {
            obj.longitude = dataGouv.data[0].centre.coordinates[0].toString();
            obj.latitude = dataGouv.data[0].centre.coordinates[1].toString();
          }
        } else {
          obj.population = "-";
          obj.surface = "-";
        }
        return obj;
      } else {
        return null;
      }
    });
};

const georisquesAPI = (insee, codePostal, nomCommuneExact, adresseExact, longitude, latitude, adresse) => {
  const agent = (axios.default.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  }));
  return axios
    .get(
      `https://www.georisques.gouv.fr/api/v1/zonage_sismique?rayon=1000&code_insee=${insee}&page=1&page_size=10`,
      { httpsAgent: agent }
    )
    .then((georisques) => {
      if (georisques.data.data[0] !== undefined) {
        const obj = {
          seisme: georisques.data.data[0].code_zone,
          georisques: adresseExact ? `https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport?form-adresse=true&isCadastre=false&ign=false&codeInsee=${insee}&lon=${longitude}&lat=${latitude}&adresse=${adresse}&CGU-adresse=on`: `https://www.georisques.gouv.fr/mes-risques/connaitre-les-risques-pres-de-chez-moi/rapport?form-commune=true&codeInsee=${insee}&ign=false&CGU-commune=on&commune=${codePostal}+${nomCommuneExact}`,
        };
        return obj;
      } else {
        const obj = {
          seisme: "x",
        };
        return obj;
      }
    });
};

const dataGouvAdresseExact = (adresse) => {
  return axios
    .get(
      `https://api-adresse.data.gouv.fr/search/?q=${adresse}&type=housenumber&autocomplete=1`
    )
    .then((dataGouv) => {
      if (dataGouv.data.features[0] !== undefined) {
        return {
          insee: dataGouv.data.features[0].properties.citycode,
          latitude:
            dataGouv.data.features[0].geometry.coordinates[1].toString(),
          longitude:
            dataGouv.data.features[0].geometry.coordinates[0].toString(),
        };
      } else {
        return {
          insee: "-",
          latitude: "-",
          longitude: "-",
        };
      }
    });
};

const cadastre = (adresse) => {
  return dataGouvAdresseExact(adresse).then((dataGouv) => {
    return axios
      .get(
        `https://geocodage.ign.fr/look4/address/search?q=${adresse}&lonlat=${dataGouv.latitude},${dataGouv.longitude}`
      )
      .then((coordinates) => {
        if (
          coordinates.data.features[0].properties.houseNumberInfos
            .otherPositions !== undefined
        ) {
          const data = coordinates.data.features[0].properties;

          const pos = data.houseNumberInfos.otherPositions[0].geometry;

          const adresse = `${
            data.number !== null ? data.number + " " : ""
          }${toTitleCase(data.street)}, ${
            data.postalCode
          } ${data.city.toUpperCase()}`;
          return axios
            .get(
              `https://geocodage.ign.fr/look4/parcel/reverse?searchGeom=${JSON.stringify(
                pos
              )}`
            )
            .then((res) => {
              if (res.data.features[0] !== undefined) {
                const features = res.data.features[0].properties;
                // console.log(res.data.features);
                // console.log({
                //   insee: dataGouv.insee,
                //   latitude: dataGouv.latitude,
                //   longitude: dataGouv.longitude,
                //   adresse: adresse,
                //   codeParcelle: `${features.codeCommuneAbs}-${
                //     features.section.startsWith("0")
                //       ? features.section.slice(-1)
                //       : features.section
                //   }-${parseInt(features.numero).toString()}`,
                // });
                return {
                  insee: dataGouv.insee,
                  latitude: dataGouv.latitude,
                  longitude: dataGouv.longitude,
                  adresse: adresse,
                  codeParcelle: `${features.codeCommuneAbs}-${
                    features.section.startsWith("0")
                      ? features.section.slice(-1)
                      : features.section
                  }-${parseInt(features.numero).toString()}`,
                };
              } else {
                // console.log({
                //   insee: "-",
                //   latitude: "-",
                //   longitude: "-",
                //   codeParcelle: "-",
                // });
                return {
                  insee: "-",
                  latitude: "-",
                  longitude: "-",
                  adresse: "-",
                  codeParcelle: "-",
                };
              }
            });
        } else if (coordinates.data.features[0].geometry.type !== undefined) {
          const data = coordinates.data.features[0];

          const pos = data.geometry;

          const adresse = `${
            data.properties.number !== null ? data.properties.number + " " : ""
          }${toTitleCase(data.properties.street)}, ${
            data.properties.postalCode
          } ${data.properties.city.toUpperCase()}`;

          return axios
            .get(
              `https://geocodage.ign.fr/look4/parcel/reverse?searchGeom=${JSON.stringify(
                pos
              )}`
            )
            .then((res) => {
              if (res.data.features[0] !== undefined) {
                const features = res.data.features[0].properties;
                // console.log(res.data.features);
                // console.log({
                //   insee: dataGouv.insee,
                //   latitude: dataGouv.latitude,
                //   longitude: dataGouv.longitude,
                //   adresse: adresse,
                //   codeParcelle: `${features.codeCommuneAbs}-${
                //     features.section.startsWith("0")
                //       ? features.section.slice(-1)
                //       : features.section
                //   }-${parseInt(features.numero).toString()}`,
                // });
                return {
                  insee: dataGouv.insee,
                  latitude: dataGouv.latitude,
                  longitude: dataGouv.longitude,
                  adresse: adresse,
                  codeParcelle: `${features.codeCommuneAbs}-${
                    features.section.startsWith("0")
                      ? features.section.slice(-1)
                      : features.section
                  }-${parseInt(features.numero).toString()}`,
                };
              } else {
                // console.log({
                //   insee: "-",
                //   latitude: "-",
                //   longitude: "-",
                //   codeParcelle: "-",
                // });
                return {
                  insee: "-",
                  latitude: "-",
                  longitude: "-",
                  adresse: "-",
                  codeParcelle: "-",
                };
              }
            });
        } else {
          // console.log({
          //   insee: "-",
          //   latitude: "-",
          //   longitude: "-",
          //   codeParcelle: "-",
          // });
          return {
            insee: "-",
            latitude: "-",
            longitude: "-",
            codeParcelle: "-",
          };
        }
      });
  });
};

const argile = (adresse) => {
  return cadastre(adresse).then((cadastre) => {
    return axios
      .get(
        `https://errial.georisques.gouv.fr/api/avis?codeINSEE=${cadastre.insee}&codeParcelle=${cadastre.codeParcelle}@${cadastre.insee}`
      )
      .then((argile) => {
        // console.log({
        //   codeParcelle: cadastre.codeParcelle,
        //   argile: {
        //     niveau: argile.data.niveauArgile,
        //     classe:
        //       argile.data.niveauArgile === 0
        //         ? "Zone a priori non argileuse"
        //         : argile.data.niveauArgile === 1
        //         ? "Exposition faible"
        //         : argile.data.niveauArgile === 2
        //         ? "Exposition moyenne"
        //         : argile.data.niveauArgile === 3
        //         ? "Exposition élevée"
        //         : "-",
        //     adresse: cadastre.adresse,
        //   },
        // });
        return {
          codeParcelle: cadastre.codeParcelle,
          argile: {
            niveau: argile.data.niveauArgile !== undefined ? argile.data.niveauArgile : "-",
            classe:
              argile.data.niveauArgile === 0
                ? "Zone a priori non argileuse"
                : argile.data.niveauArgile === 1
                ? "Exposition faible"
                : argile.data.niveauArgile === 2
                ? "Exposition moyenne"
                : argile.data.niveauArgile === 3
                ? "Exposition élevée"
                : "-",
            adresse: cadastre.adresse,
          },
        };
      });
  });
};

app.get("/", (req, res) => {
  res.send("🌍 Sismo API Work !");
});

// -----------------------------------------------------------------
// --------------------------- GET BY CP ---------------------------
// -------------------- GET /api/v1/city/cp/:id --------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/cp/:id`, (req, res) => {
  const dataCsv = csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id;
      const match = [];
      for (let i = 0; i < jsonObj.length; i++) {
        if (
          jsonObj[i].codePostal === id &&
          jsonObj[i].seisme !== "x" &&
          jsonObj[i].vent !== "x" &&
          jsonObj[i].neige !== "x"
        ) {
          match.push(jsonObj[i]);
        }
      }
      return match;
    });

  dataCsv.then(async (match) => {
    if (match.length === 0) {
      res.send(["Aucune valeur correspondante à votre recherche"]);
      console.log(chalk.bgYellow.black(`No Code_postal Match for ${id}`));
    } else {
      const data = [];
      for (let i = 0; i < match.length; i++) {
        const city = match[i];
        const insee = match[i].insee;
        match[i].border = "-";
        match[i].population = "-";
        match[i].surface = "-";
        match[i].argile = {
          niveau: "-",
          classe: "-",
          adresse: "-",
        };
        match[i].codeParcelle = "-";
        await dataGouv(insee)
          .then((e) => {
            if (e !== null) {
              if (insee === e.insee) {
                match[i].population = e.population;
                match[i].surface = e.surface;
                match[i].border = e.border;
                if (
                  e.latitude !== "-" &&
                  e.insee !== "13055" &&
                  e.insee !== "75056" &&
                  e.insee !== "69123"
                ) {
                  match[i].latitude = e.latitude;
                  match[i].longitude = e.longitude;
                }
              }
            }
            return match[i];
          })
          .then((city) => {
            georisquesAPI(
              city.insee,
              city.codePostal,
              city.nomCommuneExact
            ).then((e) => {
              city.seisme = e.seisme;
              city.georisques = e.georisques;
              city.googleMaps = `https://www.google.fr/maps/place/${city.codePostal}+${city.nomCommuneExact}`;
              data.push(city);
              if (i === match.length - 1) {
                const id = req.params.id;
                res.send(data);
                console.log(chalk.bgBlue.black(`Get by Code_postal : ${id}`));
              }
            });
          })
          .catch((err, e) => {
            switch (err.message) {
              case "Cannot read property 'insee' of null":
                res.send(match);
                console.log(chalk.bgBlue.black(`Get by Code_postal : ${id}`));
                break;

              case "Request failed with status code 504":
                res.send(
                  "Limite du nombre de résultats atteint. Merci de préciser votre recherche."
                );
                console.log(chalk.bgBlue.black(`Get by Code_postal : ${id}`));
                break;

              case "Request failed with status code 500":
                res.send("Aucune valeur correspondante à votre recherche");
                console.log(chalk.bgBlue.black(`Get by Code_postal : ${id}`));
                break;

              default:
                res.send(err.message);
                console.log(chalk.bgBlue.black(`Get by Code_postal : ${id}`));
                break;
            }
            const id = req.params.id;
            console.log(chalk.bgBlue.black(`Get by Code_postal : ${id}`));
          });
      }
    }
  });
});

// -----------------------------------------------------------------
// ------------------------- GET BY INSEE --------------------------
// ------------------- GET /api/v1/city/insee/:id ------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/insee/:id`, (req, res) => {
  const dataCsv = csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id;
      const match = [];
      for (let i = 0; i < jsonObj.length; i++) {
        if (
          jsonObj[i].insee === id &&
          jsonObj[i].seisme !== "x" &&
          jsonObj[i].vent !== "x" &&
          jsonObj[i].neige !== "x"
        ) {
          match.push(jsonObj[i]);
        }
      }
      return match;
    });

  dataCsv.then(async (match) => {
    if (match.length === 0) {
      res.send(["Aucune valeur correspondante à votre recherche"]);
      console.log(
        chalk.bgYellow.black(`No Code_commune_INSEE Match for ${id}`)
      );
    } else {
      const data = [];
      for (let i = 0; i < match.length; i++) {
        const city = match[i];
        const insee = match[i].insee;
        match[i].border = "-";
        match[i].population = "-";
        match[i].surface = "-";
        match[i].argile = {
          niveau: "-",
          classe: "-",
          adresse: "-",
        };
        match[i].codeParcelle = "-";
        await dataGouv(insee)
          .then((e) => {
            if (e !== null) {
              if (insee === e.insee) {
                match[i].population = e.population;
                match[i].surface = e.surface;
                match[i].border = e.border;
                if (
                  e.latitude !== "-" &&
                  e.insee !== "13055" &&
                  e.insee !== "75056" &&
                  e.insee !== "69123"
                ) {
                  match[i].latitude = e.latitude;
                  match[i].longitude = e.longitude;
                }
              }
            }
            return match[i];
          })
          .then((city) => {
            georisquesAPI(
              city.insee,
              city.codePostal,
              city.nomCommuneExact
            ).then((e) => {
              city.seisme = e.seisme;
              city.georisques = e.georisques;
              city.googleMaps = `https://www.google.fr/maps/place/${city.codePostal}+${city.nomCommuneExact}`;
              data.push(city);
              if (i === match.length - 1) {
                const id = req.params.id;
                res.send(data);
                console.log(
                  chalk.bgMagenta.black(`Get by Code_commune_INSEE : ${id}`)
                );
              }
            });
          })
          .catch((err, e) => {
            switch (err.message) {
              case "Cannot read property 'insee' of null":
                res.send(match);
                console.log(
                  chalk.bgMagenta.black(`Get by Code_commune_INSEE : ${id}`)
                );
                break;

              case "Request failed with status code 504":
                res.send(
                  "Limite du nombre de résultats atteint. Merci de préciser votre recherche."
                );
                console.log(
                  chalk.bgMagenta.black(`Get by Code_commune_INSEE : ${id}`)
                );
                break;

              case "Request failed with status code 500":
                res.send("Aucune valeur correspondante à votre recherche");
                console.log(
                  chalk.bgMagenta.black(`Get by Code_commune_INSEE : ${id}`)
                );
                break;

              default:
                res.send(err.message);
                console.log(
                  chalk.bgMagenta.black(`Get by Code_commune_INSEE : ${id}`)
                );
                break;
            }
            const id = req.params.id;
            console.log(
              chalk.bgMagenta.black(`Get by Code_commune_INSEE : ${id}`)
            );
          });
      }
    }
  });
});

// -----------------------------------------------------------------
// ------------------------- GET BY NAME ---------------------------
// ------------------- GET /api/v1/city/name/:id -------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/name/:id`, (req, res) => {
  const dataCsv = csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const id = req.params.id;
      const match = [];
      for (let i = 0; i < jsonObj.length; i++) {
        if (
          jsonObj[i].nomCommune === id &&
          jsonObj[i].seisme !== "x" &&
          jsonObj[i].vent !== "x" &&
          jsonObj[i].neige !== "x"
        ) {
          match.push(jsonObj[i]);
        }
      }
      return match;
    });

  dataCsv.then(async (match) => {
    if (match.length === 0) {
      res.send(["Aucune valeur correspondante à votre recherche"]);
      console.log(chalk.bgYellow.black(`No Nom_commune Match for ${id}`));
    } else {
      const data = [];
      for (let i = 0; i < match.length; i++) {
        const city = match[i];
        const insee = match[i].insee;
        match[i].border = "-";
        match[i].population = "-";
        match[i].surface = "-";
        match[i].argile = {
          niveau: "-",
          classe: "-",
          adresse: "-",
        };
        match[i].codeParcelle = "-";
        await dataGouv(insee)
          .then((e) => {
            if (e !== null) {
              if (insee === e.insee) {
                match[i].population = e.population;
                match[i].surface = e.surface;
                match[i].border = e.border;
                if (
                  e.latitude !== "-" &&
                  e.insee !== "13055" &&
                  e.insee !== "75056" &&
                  e.insee !== "69123"
                ) {
                  match[i].latitude = e.latitude;
                  match[i].longitude = e.longitude;
                }
              }
            }
            return match[i];
          })
          .then((city) => {
            georisquesAPI(
              city.insee,
              city.codePostal,
              city.nomCommuneExact
            ).then((e) => {
              city.seisme = e.seisme;
              city.georisques = e.georisques;
              city.googleMaps = `https://www.google.fr/maps/place/${city.codePostal}+${city.nomCommuneExact}`;
              data.push(city);
              if (i === match.length - 1) {
                const id = req.params.id;
                res.send(data);
                console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`));
              }
            });
          })
          .catch((err, e) => {
            switch (err.message) {
              case "Cannot read property 'insee' of null":
                res.send(match);
                console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`));
                break;

              case "Request failed with status code 504":
                res.send(
                  "Limite du nombre de résultats atteint. Merci de préciser votre recherche."
                );
                console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`));
                break;

              case "Request failed with status code 500":
                res.send("Aucune valeur correspondante à votre recherche");
                console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`));
                break;

              default:
                res.send(err.message);
                console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`));
                break;
            }
            const id = req.params.id;
            console.log(chalk.bgYellow.black(`Get by Nom_commune : ${id}`));
          });
      }
    }
  });
});

// -----------------------------------------------------------------
// ------------------------- GET BY Adresse --------------------------
// ------------------- GET /api/v1/city/adresse/:id ------------------
// -----------------------------------------------------------------
app.get(`${APIversion}/city/adresse/:id`, (req, res) => {
  const dataCsv = csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      dataGouvAdresseExact(req.params.id)
        .then((data) => {
          const id = data.insee;
          const match = [];
          for (let i = 0; i < jsonObj.length; i++) {
            if (
              jsonObj[i].insee === id &&
              jsonObj[i].seisme !== "x" &&
              jsonObj[i].vent !== "x" &&
              jsonObj[i].neige !== "x"
            ) {
              match.push(jsonObj[i]);
            }
          }
          if (match.length !== 0) {
            match[0].latitude = data.latitude;
            match[0].longitude = data.longitude;
            // console.log(match);
          }

          return match;
        })

        .then(async (match) => {
          if (match.length === 0) {
            res.send(["Aucune valeur correspondante à votre recherche"]);
            console.log(
              chalk.bgYellow.black(`No Adress Match for ${req.params.id}`)
            );
          } else {
            const data = [];
            for (let i = 0; i < match.length; i++) {
              const city = match[i];
              const insee = match[i].insee;
              match[i].border = "-";
              match[i].population = "-";
              match[i].surface = "-";
              await dataGouv(insee)
                .then((e) => {
                  if (e !== null) {
                    if (insee === e.insee) {
                      match[i].population = e.population;
                      match[i].surface = e.surface;
                      match[i].border = e.border;
                    }
                  }
                  return match[i];
                })
                .then((city) => {
                  georisquesAPI(
                    city.insee,
                    city.codePostal,
                    city.nomCommuneExact,
                    true,
                    city.longitude,
                    city.latitude,
                    req.params.id
                  )
                    .then((e) => {
                      city.seisme = e.seisme;
                      city.georisques = e.georisques;
                      city.googleMaps = `https://www.google.fr/maps/place/${req.params.id}/@${city.latitude},${city.longitude}`;
                      data.push(city);
                      return city;
                    })
                    .then((city) => {
                      argile(req.params.id).then((e) => {
                        // console.log(e);
                        city.argile = e.argile;
                        city.codeParcelle = e.codeParcelle;
                        const id = req.params.id;
                        res.send(data);
                        console.log(
                          chalk.bgMagenta.black(`Get by Adresse : ${id}`)
                        );
                      });
                    });
                })
                .catch((err, e) => {
                  switch (err.message) {
                    case "Cannot read property 'insee' of null":
                      res.send(match);
                      console.log(
                        chalk.bgMagenta.black(
                          `Get by Code_commune_INSEE : ${id}`
                        )
                      );
                      break;

                    case "Request failed with status code 504":
                      res.send(
                        "Limite du nombre de résultats atteint. Merci de préciser votre recherche."
                      );
                      console.log(
                        chalk.bgMagenta.black(`Get by Adresse : ${id}`)
                      );
                      break;

                    case "Request failed with status code 500":
                      res.send(
                        "Aucune valeur correspondante à votre recherche"
                      );
                      console.log(
                        chalk.bgMagenta.black(`Get by Adresse : ${id}`)
                      );
                      break;

                    default:
                      res.send(err.message);
                      console.log(
                        chalk.bgMagenta.black(`Get by Adresse : ${id}`)
                      );
                      break;
                  }
                  const id = req.params.id;
                  console.log(chalk.bgMagenta.black(`Get by Adresse : ${id}`));
                });
            }
          }
        });
    });
});

// Server listening on port 3000
app.listen(PORT, () => {
  console.log(chalk.bgGreen.black("Server listening on port " + PORT));
  console.log(chalk.bgGreen.black("Server run at http://localhost:" + PORT));
});
