import { LOAD_GOUV_API, LOAD_GOUV_API_SUCCESS, LOAD_GOUV_API_ERROR } from './typeGouvData'

const initialStateGouvData = {
  isLoading: false,
  borders: [],
  error: '',
}

const gouvDataReducer = (state = initialStateGouvData, action) => {
  switch (action.type) {
    case LOAD_GOUV_API:
      return {
        ...state,
        isLoading: true,
        borders: [],
        error: ''
      }

      case LOAD_GOUV_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        borders: action.payload,
        error: ''
      }
      
      case LOAD_GOUV_API_ERROR:
      return {
        ...state,
        isLoading: false,
        borders: [],
        error: `💥 Failed to call Gouvernement API : ${action.payload}`
      }
    
    default:
      return state
  }
}

export default gouvDataReducer