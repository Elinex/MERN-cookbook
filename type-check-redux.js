const {
  createStore,
  applyMiddleware,
} = require('redux')

// Define an object containing the allowed action types:
const TYPE = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  SET_TIME: 'SET_TIME',
}

// Create a dummy reducer function that returns its original state 
// whichever action type is called. We don't need it for the purpose of 
// this recipe:
const reducer = (
  state = null,
  action,
) => state

// Define a middleware function that will intercept every action that 
// is being dispatched and check whether the action type exists in the TYPE 
// object. If the action exists allow the action to be dispatched, or 
// otherwise, throw an error and inform the user that an invalid action 
// type was dispatched. Additionally, let's provide the user, as part of 
// the error message, information about which valid types are allowed:
const typeCheckMiddleware = api => next => action => {
  if (Reflect.has(TYPE, action.type)) {
    next(action)
  } 
  else {
    const err = new Error(
      `Type "${action.type}" is not a valid` +
      `action type. ` +
      `did you mean to use one of the following` +
      `valid types? ` +
      `"${Reflect.ownKeys(TYPE).join('"|"')}"n`,
    )
    throw err 
  }
}

// Create a store and apply the defined middleware function:
const store = createStore(
  reducer,
  applyMiddleware(typeCheckMiddleware),
)

// Dispatch two action types. The first action type is valid, and it 
// exists in the TYPE object. However, the second one is an action type 
// that was never defined:
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'MISTAKE' })