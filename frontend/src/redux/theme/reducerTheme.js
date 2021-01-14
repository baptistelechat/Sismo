import { SET_INDIGO_PINK_THEME, SET_CYAN_AMBER_THEME, SET_RED_BROWN_THEME, SET_LIGHT_GREEN_BLUE_THEME } from './typeTheme'

const initialStateTheme = {
  type: "light",
  background: "#fafafa",
  mainPrimaryColor: "#3f51b5",
  mainSecondaryColor: "#e91e63",
  toastColor: "#7986cb"
}

const themeReducer = (state = initialStateTheme, action) => {

  switch (action.type) {

    case SET_INDIGO_PINK_THEME:
      return {
        ...state,
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: "#3f51b5",
        mainSecondaryColor: action.darkmode ? "#f06292" : "#e91e63",
        toastColor: "#7986cb"
      }

    case SET_CYAN_AMBER_THEME:
      return {
        ...state,
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: "#00acc1",
        mainSecondaryColor: action.darkmode ? "#ffca28" : "#ffb300",
        toastColor: "#ffca28"
      }

    case SET_RED_BROWN_THEME:
      return {
        ...state,
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: "#d32f2f",
        mainSecondaryColor: action.darkmode ? "#a1887f" : "#795548",
        toastColor: "#e57373"
      }

    case SET_LIGHT_GREEN_BLUE_THEME:
      return {
        ...state,
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: "#8bc34a",
        mainSecondaryColor: action.darkmode ? "#64b5f6" : "#2196f3",
        toastColor: "#aed581"
      }
      
    default:
      return state
  }

}

export default themeReducer