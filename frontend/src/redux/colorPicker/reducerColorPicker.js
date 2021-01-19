import { SET_PRIMARY_COLOR_PICKER, SET_SECONDARY_COLOR_PICKER } from './typeColorPicker'

const initialStateTheme = {
  primaryColor: "#3f51b5",
  secondaryColor: "#e91e63"
}

const colorPickerReducer = (state = initialStateTheme, action) => {

  switch (action.type) {

    case SET_PRIMARY_COLOR_PICKER:
      return {
        ...state,
        primaryColor: action.primaryColor,
      }

      case SET_SECONDARY_COLOR_PICKER:
        return {
          ...state,
          secondaryColor: action.secondaryColor
        }
    default:
      return state
  }

}

export default colorPickerReducer