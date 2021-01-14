import { SET_INDIGO_PINK_THEME, SET_CYAN_AMBER_THEME, SET_RED_BROWN_THEME, SET_LIGHT_GREEN_BLUE_THEME } from './typeTheme'

export const setIndigoPinkTheme = (darkmode) => {
  return {
    type: SET_INDIGO_PINK_THEME,
    darkmode: darkmode
  }
}

export const setCyanAmberTheme = (darkmode) => {
  return {
    type: SET_CYAN_AMBER_THEME,
    darkmode: darkmode
  }
}

export const setRedBrownTheme = (darkmode) => {
  return {
    type: SET_RED_BROWN_THEME,
    darkmode: darkmode
  }
}

export const setLightGreenBlueTheme = (darkmode) => {
  return {
    type: SET_LIGHT_GREEN_BLUE_THEME,
    darkmode: darkmode
  }
}

// export const setPersoTheme = (primary, secondary, darkmode) => {
//   return {
//     type: SET_PERSO_THEME,
//     payload: a
//     payload: b
//     payload: c
//   }
// }