import { SET_INDEX } from './typeIndexSelected'

const initialStateIndexSelected = {
  indexSelected: -1
}

const indexSelectedReducer = (state = initialStateIndexSelected, action) => {
  switch (action.type) {
    case SET_INDEX:
      return {
        ...state,
        indexSelected : action.payload
      }
    
    default:
      return state
  }
}

export default indexSelectedReducer