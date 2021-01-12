import { SET_DARK_THEME, SET_LIGHT_THEME } from './typeTheme'

const initialStateTheme = {
  type: "light",
  background: "#fafafa",
  mainPrimaryColor: "#3f51b5",
  mainSecondaryColor: "#e91e63",
  toastColor: "#7986cb"
}

const themeReducer = (state = initialStateTheme, action) => {

  switch (action.type) {
    case SET_DARK_THEME:
      return {
        ...state,
        type: "dark",
        background: "#303030",
        mainPrimaryColor: "#3f51b5",
        mainSecondaryColor: "#f06292",
        toastColor: "#7986cb"
      }

    case SET_LIGHT_THEME:
      return {
        ...state,
        type: "light",
        background: "#fafafa",
        mainPrimaryColor: "#3f51b5",
        mainSecondaryColor: "#e91e63",
        toastColor: "#7986cb"
      }

    default:
      return state
  }

}

export default themeReducer