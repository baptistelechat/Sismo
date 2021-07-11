//REACT
import React from "react";
// OTHER
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

// WIND
import wind_default from "../../img/wind/wind-default.png";
import wind_1 from "../../img/wind/wind-1.png";
import wind_2 from "../../img/wind/wind-2.png";
import wind_3 from "../../img/wind/wind-3.png";
import wind_4 from "../../img/wind/wind-4.png";
import wind_5 from "../../img/wind/wind-5.png";
// import wind_error from "../../img/wind/wind-error.png";
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
// import snow_error from "../../img/snow/snow-error.png";
// SEISM
import seism_default from "../../img/seism/seism-default.png";
import seism_1 from "../../img/seism/seism-1.png";
import seism_2 from "../../img/seism/seism-2.png";
import seism_3 from "../../img/seism/seism-3.png";
import seism_4 from "../../img/seism/seism-4.png";
import seism_5 from "../../img/seism/seism-5.png";
// import seism_error from "../../img/seism/seism-error.png";
// STYLE
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
  paragraph: {
    fontFamily: "Open Sans",
    fontSize: "13pt",
  },
});

const DocumentPDF = ({ apiData, geoData, indexSelected, screenshot }) => {
  const nomCommune =
    geoData.length !== 0
      ? geoData.nomCommune
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].nomCommune;
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
  const georisques =
    geoData.length !== 0
      ? geoData.georisques
      : apiData[indexSelected] === undefined
      ? "-"
      : apiData[indexSelected].georisques;

  const today = () => {
    const today = Date.now();
    const date = new Date(today);
    const formatDate = date.toLocaleDateString();
    return formatDate;
  };

  return (
    <Document title={`${nomCommune} (${codePostal}) - Sismo`} author="Sismo">
      <Page size="A4" style={styles.page}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: "5mm",
            borderStyle: "solid",
            borderWidth: "1mm",
            border: "1mm solid #3f51b5",
          }}
        >
          <Image
            src="/icons/manifest-icon-192.png"
            style={{ height: "50mm" }}
          />
          <View style={{ textAlign: "right", flexGrow: 1, padding: "5mm" }}>
            <Text
              style={{
                fontWeight: "extrabold",
                fontSize: 25,
                color: "#3f51b5",
              }}
            >
              Rapport Sismo
            </Text>
            <Text style={{ fontStyle: "italic", color: "#e91e63" }}>
              {nomCommune} - {codePostal}
            </Text>
            <Text style={{ fontStyle: "italic", color: "#e91e63" }}>
              Édité le {today()}
            </Text>
          </View>
        </View>
        <Image
          style={{
            objectFit: "contain",
            maxHeight: "105mm",
            paddingBottom: "5mm",
          }}
          src={screenshot}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: "12mm",
            height: "40mm",
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "extrabold",
                color: "#3f51b5",
                marginBottom: "5mm",
              }}
            >
              Vent
            </Text>
            <Image
              style={{ marginRight: "10mm" }}
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
                  : wind_default
              }
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "extrabold",
                color: "#3f51b5",
                marginBottom: "5mm",
              }}
            >
              Neige
            </Text>
            <Image
              style={{ marginRight: "5mm" }}
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
                  : snow_default
              }
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "extrabold",
                color: "#3f51b5",
                marginBottom: "5mm",
              }}
            >
              Séisme
            </Text>
            <Image
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
                  : seism_default
              }
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.paragraph}>
            <Text style={{ fontWeight: "extrabold", color: "#3f51b5" }}>
              {nomCommune}
            </Text>
            <Text>Code Postal : {codePostal}</Text>
            <Text>Code INSEE : {codeInsee}</Text>
            <Text>
              Département : {departement} ({codeDepartement})
            </Text>
            <Text>Région : {region}</Text>
            <Text>Latitude : {latitude}</Text>
            <Text>Longitude : {longitude}</Text>
            <Text>
              Coordonnées : {latitude}, {longitude}
            </Text>
          </View>
          <View style={{ textAlign: "right", flexGrow: 1 }}>
            <View style={styles.paragraph}>
              <Text
                style={[
                  styles.paragraph,
                  {
                    fontStyle: "italic",
                    textDecoration: "underline",
                    color: "#e91e63",
                  },
                ]}
              >
                Se rendre sur Géorisques pour plus d'informations ...
              </Text>

              <Link
                src={georisques}
              >
                {georisques}
              </Link>
              <Text
                style={{
                  marginTop: "10mm",
                  fontStyle: "italic",
                  textDecoration: "underline",
                  color: "#e91e63",
                }}
              >
                Informations issues de Sismo :
              </Text>
              <Link>https://sismo.vercel.app/</Link>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentPDF;
