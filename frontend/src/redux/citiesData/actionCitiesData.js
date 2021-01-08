import axios from 'axios'
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

    axios.get(`https://sismo-api.vercel.app/api/v1/city/${param}/${searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("'"," ").toUpperCase().replace("SAINT","ST").replace("SAINTE","STE").split('-').join(' ')}`)
    .then((res) => {
      dispatch(loadCitiesApiSuccess(res.data))
    })
    .catch((e) => {
      dispatch(loadCitiesApiError(e.message))
    })

  }
}