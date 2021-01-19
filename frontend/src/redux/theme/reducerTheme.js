import {
  SET_INDIGO_PINK_THEME,
  SET_CYAN_AMBER_THEME,
  SET_RED_BROWN_THEME,
  SET_LIGHT_GREEN_BLUE_THEME,
  SET_PERSO_THEME,
} from './typeTheme'

const initialStateTheme = {
  name: "indigo_pink",
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
        name: "indigo_pink",
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: "#3f51b5",
        mainSecondaryColor: action.darkmode ? "#f06292" : "#e91e63",
        toastColor: "#7986cb"
      }

    case SET_CYAN_AMBER_THEME:
      return {
        ...state,
        name: "cyan_amber",
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: "#00acc1",
        mainSecondaryColor: action.darkmode ? "#ffca28" : "#ffb300",
        toastColor: "#4dd0e1"
      }

    case SET_RED_BROWN_THEME:
      return {
        ...state,
        name: "red_brown",
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: "#d32f2f",
        mainSecondaryColor: action.darkmode ? "#a1887f" : "#795548",
        toastColor: "#e57373"
      }

    case SET_LIGHT_GREEN_BLUE_THEME:
      return {
        ...state,
        name: "light_green_blue",
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: "#8bc34a",
        mainSecondaryColor: action.darkmode ? "#64b5f6" : "#2196f3",
        toastColor: "#aed581"
      }
    
    case SET_PERSO_THEME:
      return {
        ...state,
        name: "perso",
        type: action.darkmode ? "dark" : "light",
        background: action.darkmode ?  "#303030": "#fafafa",
        mainPrimaryColor: action.primaryColorLight,
        mainSecondaryColor: action.darkmode ? action.secondaryColorDark : action.secondaryColorLight,
        toastColor: action.toastColor
      }
      
    default:
      return state
  }
}

export default themeReducer