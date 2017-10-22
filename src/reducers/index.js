import { combineReducers } from 'redux'
import todos from './todos'
import rules from './rules'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
