import { createStore } from 'redux'
import indexSelectedReducer from './indexSelected/reducerIndexSelected'

const store = createStore(indexSelectedReducer)

export default store