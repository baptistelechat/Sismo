import { SET_CITY_CHOICE } from './typeCityChoice'

export const setChoice = (city) => {
  return {
    type: SET_CITY_CHOICE,
    payload: city,
  }
}