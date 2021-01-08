import { LOAD_CITIES_API, LOAD_CITIES_API_SUCCESS, LOAD_CITIES_API_ERROR } from './typeCitiesData'

const initialStateCitiesData = {
  isLoading: false,
  cities: [],
  error: ''
}

const citiesDataReducer = (state = initialStateCitiesData, action) => {
  switch (action.type) {
    case LOAD_CITIES_API:
      return {
        ...state,
        isLoading: true,
        cities: [],
        error: ''
      }

      case LOAD_CITIES_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        error: ''
      }
      
      case LOAD_CITIES_API_ERROR:
      return {
        ...state,
        isLoading: false,
        cities: [],
        error: `💥 Failed to call Sismo API : ${action.payload}`
      }
    
    default:
      return state
  }
}

export default citiesDataReducer