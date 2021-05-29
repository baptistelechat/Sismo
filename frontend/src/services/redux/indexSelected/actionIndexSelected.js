import { SET_INDEX } from './typeIndexSelected'

export const setIndex = (index) => {
  return {
    type: SET_INDEX,
    payload: index,
  }
}