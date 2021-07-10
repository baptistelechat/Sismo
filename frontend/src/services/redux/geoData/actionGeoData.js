import axios from "axios";
import toast from "react-hot-toast";
import {
  LOAD_GEO_API,
  LOAD_GEO_API_SUCCESS,
  LOAD_GEO_API_ERROR,
  LOAD_GEO_API_RESET,
} from "./typeGeoData";

export const loadGeoApi = () => {
  return {
    type: LOAD_GEO_API,
  };
};
export const loadGeoApiSuccess = (city) => {
  return {
    type: LOAD_GEO_API_SUCCESS,
    payload: city,
  };
};
export const loadGeoApiError = (errorMessage) => {
  return {
    type: LOAD_GEO_API_ERROR,
    payload: errorMessage,
  };
};

export const geoApiReset = () => {
  return {
    type: LOAD_GEO_API_RESET,
  };
};

export const geoApiCall = () => {
  return (dispatch) => {
    dispatch(loadGeoApi());
    const geoToast = toast.loading("🌍 Géolocalisation ...", {
      style: {
        background: "#90a4ae",
        color: "#FFFFFF",
      },
      iconTheme: {
        primary: "#263238",
        secondary: "#FFFFFF",
      },
    });

    const successGeolocation = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      axios
        .get(
          `https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=code,contour,nom,codesPostaux`
        )
        .then((res) => {
          const data = {
            insee: res.data[0].code,
          };
          return data;
        })
        .then((data) => {
          // axios.get(`https://sismo-api.vercel.app/api/v1/city/insee/${data.insee}`)
            axios.get(`http://localhost:8000/api/v1/city/insee/${data.insee}`)
            .then((res) => {
              const city = {
                ...res.data[0],
                latitude: latitude.toString(),
                longitude: longitude.toString(),
              };

              console.log(city);

              dispatch(loadGeoApiSuccess(city));
              toast.dismiss(geoToast);
              toast.success(`📍 Vous êtes à ${city.nomCommuneExact}`, {
                duration: 5000,
                style: {
                  background: "#81c784",
                  color: "#FFFFFF",
                },
                iconTheme: {
                  primary: "#1b5e20",
                  secondary: "#FFFFFF",
                },
              });
            });
        })
        .catch((err) => {
          dispatch(loadGeoApiError(err.message));
          console.log(err.message);
        });
    };

    navigator.geolocation.getCurrentPosition(successGeolocation, () => {
      console.log("Accès refusé ...");
    });
  };
};
