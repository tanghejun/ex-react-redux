import * as React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers} from './redux'
import {connect, Provider} from './react-redux.jsx'

import * as reducers from './reducers'

const rootReducer = combineReducers(reducers)
const store = createStore(rootReducer, {
  todo: {
    id: 1,
    title: 'asdfasdf'
  }
})

// console.log(store.getStore())

class Todo extends React.Component {
  render() {
    const {todo, handleClick} = this.props
    return (
      <div>
        <ul>
          <li style={{textDecoration: todo.completed ? 'line-through': 'none'}} onClick={handleClick}>{todo.title}</li>
        </ul>
      </div>
    )
  }
}

const TodoContainer = connect(
  (state, ownProps) => ({
    todo: state.todo
  }),
  (dispatch, ownProps) => ({
    handleClick: () => {
      dispatch({type: 'TOGGLE'})
    }
  })
)(Todo)

ReactDOM.render(
  <Provider store={store}>
    <TodoContainer />
  </Provider>,
  document.getElementById('root')
)


