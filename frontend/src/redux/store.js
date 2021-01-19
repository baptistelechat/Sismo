import { createStore, combineReducers, applyMiddleware } from 'redux'
import indexSelectedReducer from './indexSelected/reducerIndexSelected'
import citiesDataReducer from './citiesData/reducerCitiesData'
import themeReducer from './theme/reducerTheme'
import colorPickerReducer from './colorPicker/reducerColorPicker'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  index: indexSelectedReducer,
  cityApi: citiesDataReducer,
  theme: themeReducer,
  colorPicker: colorPickerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store