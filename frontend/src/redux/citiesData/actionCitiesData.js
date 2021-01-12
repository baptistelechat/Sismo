import axios from 'axios'
import toast from 'react-hot-toast'
import { LOAD_CITIES_API, LOAD_CITIES_API_SUCCESS, LOAD_CITIES_API_ERROR } from './typeCitiesData'

export const loadCitiesApi = () => {
  return {
    type: LOAD_CITIES_API,
  }
}
export const loadCitiesApiSuccess = (cities) => {
  return {
    type: LOAD_CITIES_API_SUCCESS,
    payload: cities,

  }
}
export const loadCitiesApiError = (errorMessage) => {
  return {
    type: LOAD_CITIES_API_ERROR,
    payload: errorMessage,
  }
}

export const citiesApiCall = (param, searchValue) => {
  return (dispatch) => {

    dispatch(loadCitiesApi())
    const searchToast = toast.loading('⏳ Chargement ...',{
      style: {
        background: '#90a4ae',
        color: '#FFFFFF',
      },
      iconTheme: {
        primary: '#263238',
        secondary: '#FFFFFF'
      },
    })

    axios.get(`https://sismo-api.vercel.app/api/v1/city/${param}/${searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("'"," ").toUpperCase().replace("SAINT","ST").replace("SAINTE","STE").split('-').join(' ')}`)
    .then((res) => {
      dispatch(loadCitiesApiSuccess(res.data))

      const apiDataLength = res.data.length

      const successToastText = () => {
        if (apiDataLength>1 && param === 'cp') {
          return `${apiDataLength} résultats trouvés pour le code postal : ${searchValue}`
        }
        if (apiDataLength>1 && param === 'insee') {
          return `${apiDataLength} résultats trouvés pour le code INSEE : ${searchValue}`
        }
        if (apiDataLength>1 && param === 'name') {
          return `${apiDataLength} résultats trouvés pour la valeur : ${searchValue}`
        }
        if (apiDataLength===1 && param === 'cp') {
          return `${apiDataLength} résultat trouvé pour le code postal : ${searchValue}`
        }
        if (apiDataLength===1 && param === 'insee') {
          return `${apiDataLength} résultat trouvé pour le code INSEE : ${searchValue}`
        }
        if (apiDataLength===1 && param === 'name') {
          return `${apiDataLength} résultat trouvé pour la valeur : ${searchValue}`
        }
      }

      if (res.data[0] !== 'Aucune valeur correspondante à votre recherche') {
        toast.dismiss(searchToast)
        toast.success(successToastText(), {
          duration: 5000,
          style: {
            background: '#81c784',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#1b5e20',
            secondary: '#FFFFFF'
          },
        })
      } else {
        toast.dismiss(searchToast)
        toast.error(`Aucune valeur correspondante à votre recherche`, {
          duration: 5000,
          style: {
            background: '#e57373',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#b71c1c',
            secondary: '#FFFFFF'
          },
        })
      }


    })
    .catch((err) => {
      dispatch(loadCitiesApiError(err.message))
      
      toast.dismiss(searchToast)
      
      toast.error(err.message, {
        style: {
          background: '#e57373',
          color: '#FFFFFF',
        },
        iconTheme: {
          primary: '#b71c1c',
          secondary: '#FFFFFF'
        },
      });
    })

  }
}