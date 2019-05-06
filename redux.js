export function createStore(reducer, initialState) {

  let currentState = initialState
  let listeners = []

  function dispatch(action) {
    console.log('dispatch: ', action)
    currentState = reducer(currentState, action)
    listeners.forEach(listener => listener(action))
  }

  function getStore() {
    return currentState
  }

  function subscribe(cb) {
    listeners.push(cb)
    return function() {
      listeners.splice(listeners.indexOf(cb), 1)
    }
  }

  dispatch('default')

  return {
    getStore: getStore,
    subscribe: subscribe,
    dispatch: dispatch
  }
}

export function combineReducers(reducersObj) {

  return function rootReducer(state = {}, action) {
    const res = state
    for(const key in reducersObj) {
       res[key] = reducersObj[key](state[key], action)
    }
    return res
  }
}