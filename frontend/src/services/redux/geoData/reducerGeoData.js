import { LOAD_GEO_API, LOAD_GEO_API_SUCCESS, LOAD_GEO_API_ERROR, LOAD_GEO_API_RESET } from './typeGeoData'

const initialStateCitiesData = {
  isLoading: false,
  city: [],
  error: '',
}

const geoDataReducer = (state = initialStateCitiesData, action) => {
  switch (action.type) {
    case LOAD_GEO_API:
      return {
        ...state,
        isLoading: true,
        city: [],
        error: ''
      }

      case LOAD_GEO_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        city: action.payload,
        error: ''
      }
      
      case LOAD_GEO_API_ERROR:
      return {
        ...state,
        isLoading: false,
        city: [],
        error: `💥 Failed to call Geo API : ${action.payload}`
      }
      
      case LOAD_GEO_API_RESET:
      return {
        ...state,
        isLoading: false,
        city: [],
        error: ''
      }

    default:
      return state
  }
}

export default geoDataReducer