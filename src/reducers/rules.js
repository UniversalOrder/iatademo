const rule = (state, action) => {
    switch (action.type) {
      case 'ADD_RULE':
        return {
          id: action.id,
          text: action.text,
          completed: false
        }
      default:
        return state
    }
  }
  
  const rules = (state = [], action) => {
    switch (action.type) {
      case 'ADD_RULES':
        return [
          ...state,
          rule(undefined, action)
        ]
      default:
        return state
    }
  }
  
  export default rules
  