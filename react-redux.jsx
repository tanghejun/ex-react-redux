import * as React from 'react'
import PropType from 'prop-types'

const StoreContext = React.createContext()

export function connect(mapStateToProps, mapDispatchToProps) {
  return function connectTo(Contained) {
    return class Container extends React.Component {
      static contextType = StoreContext

      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.forceUpdate()
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        const stateProps = mapStateToProps(this.context.getStore(), this.props)
        const dispatchProps = mapDispatchToProps(this.context.dispatch, this.props)

        return (
          <Contained {...stateProps} {...dispatchProps} {...this.props} />
        )
      }
    }
  }
}

export class Provider extends React.Component {
  render() {
    const {store, children} = this.props
    return (
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    )
  }
}