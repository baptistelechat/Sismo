import { SET_PRIMARY_COLOR_PICKER, SET_SECONDARY_COLOR_PICKER } from './typeColorPicker'

export const setPrimaryColorPicker = (primaryColor) => {
  return {
    type: SET_PRIMARY_COLOR_PICKER,
    primaryColor: primaryColor,
  }
}

export const setSecondaryColorPicker = (secondaryColor) => {
  return {
    type: SET_SECONDARY_COLOR_PICKER,
    secondaryColor: secondaryColor
  }
}
