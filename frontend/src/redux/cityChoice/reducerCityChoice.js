import { SET_CITY_CHOICE } from './typeCityChoice'

const initialStateCityChoice = {
  cityChoice: {
    nomCommune: "-",
    nomCommuneExact: "-",
    region: "-",
    codeDepartement: "-",
    departement: "-",
    codePostal: "-",
    insee: "-",
    latitude: "-",
    longitude: "-",
    neige: "-",
    seisme: "-",
    vent: "-"
  }
}

const cityChoiceReducer = (state = initialStateCityChoice, action) => {
  switch (action.type) {
    case SET_CITY_CHOICE:
      return {
        ...state,
        cityChoice : action.payload
      }
    
    default:
      return state
  }
}

export default cityChoiceReducer