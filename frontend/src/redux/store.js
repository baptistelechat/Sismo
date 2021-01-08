import { createStore, combineReducers, applyMiddleware } from 'redux'
import indexSelectedReducer from './indexSelected/reducerIndexSelected'
import citiesDataReducer from './citiesData/reducerCitiesData'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  index: indexSelectedReducer,
  cityApi: citiesDataReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store