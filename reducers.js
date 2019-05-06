export function todo(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, completed: !state.completed }
    default:
      return state
  }
}

export function filter(state = 'all', action) {
  switch (action.type) {
    case 'ALL':
      return 'all'
    case 'DONE':
      return 'done'
    case 'TODO':
      return 'todo'
    default:
      return state
  }
}