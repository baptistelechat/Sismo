import { SET_DARK_THEME, SET_LIGHT_THEME } from './typeTheme'

export const setDarkTheme = () => {
  return {
    type: SET_DARK_THEME,
  }
}

export const setLightTheme = () => {
  return {
    type: SET_LIGHT_THEME,
  }
}