import { createStore, combineReducers } from 'redux'
import indexSelectedReducer from './indexSelected/reducerIndexSelected'
import cityChoiceReducer from './cityChoice/reducerCityChoice'

const rootReducer = combineReducers({
  index: indexSelectedReducer,
  city: cityChoiceReducer
})

const store = createStore(rootReducer)

export default store