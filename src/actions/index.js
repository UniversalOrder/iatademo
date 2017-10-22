import BackendFactory from "../utils/BackendFactory";

let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})


const loadRuleRequest = () => ({
    type: 'LOAD_SQUADS_REQUES'
})

const loadRuleSuccess = (json) => ({
    type: 'LOAD_SQUADS_SUCCESS',
    payload: json
})

const loadRuleFailure = (error) => ({
    type: 'LOAD_SQUADS_FAILURE',
    payload: error
})

function loadRules(){
  return dispatch => {
    dispatch(loadRuleRequest())
    return BackendFactory().
    loadRules()
      .then(function(json){
            dispatch(loadRuleSuccess(json))
          })
      .catch((error) => {
        dispatch(loadRuleFailure(error))
      })
    }
  }