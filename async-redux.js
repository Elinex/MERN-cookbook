const fetch = require('node-fetch')
const {
  createStore,
  applyMiddleware,
  combineReducers,
  bindActionCreators,
} = require('redux')

// Define three kinds of status. Each status represents the state of an 
// asynchronous operation:
const STATUS = {
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
}

// Define two action types:
const TYPE = {
  FETCH_TIME: 'FETCH_TIME',
  FETCH_DATE: 'FETCH_DATE',
}

// Define action creators. Notice that the value property is an asynchronous 
// function in the first two action creators. Your, later defined, middleware 
// function will be responsible for making Redux understand these actions:
const actions = {
  fetchTime: () => ({
    type: TYPE.FETCH_TIME,
    value: async () => {
      const time = await fetch('http://localhost:1337/time')
      .then((res) => res.text())
      return time 
    }
  }),
  fetchDate: () => ({
    type: TYPE.FETCH_DATE,
    value: async () => {
      const date = await fetch('http://localhost:1337/date').
      then((res) => res.text())
      return date 
    }
  }),
  setTime: (time) => ({
    type: TYPE.FETCH_TIME,
    value: time,
  })
}

// Define a common function for setting values from an action object 
// that will be used in your reducer:
const setValue = (prevState, action) => ({
  ...prevState,
  value: action.value || null,
  error: action.error || null,
  status: action.status || STATUS.RESOLVED,
})

// Define the initial state of your application:
const iniState = {
  time: {
    value: null,
    error: null,
    status: STATUS.RESOLVED,
  }, 
  date: {
    value: null,
    error: null,
    status: STATUS.RESOLVED,
  } 
}

// Define a reducer function. Notice that it is only one reducer that 
// handles two slices of the state, the time and the date:
const timeReducer = (state = iniState, action) => {
  switch (action.type) {
    case TYPE.FETCH_TIME: return {
      ...state,
      time: setValue(state.time, action)
    }
    case TYPE.FETCH_DATE: return {
      ...state,
      date: setValue(state.date, action)
    }
    default: return state
  }
}

// Define a middleware function that will check whether a dispatched 
// action type has a function as the value property. If that is so, assume 
// that the value property is an async function. First, we dispatch an 
// action to set the status as PENDING. Then, when the async function is 
// resolved, we dispatch another action to set the status as RESOLVED or 
// in case of an error as REJECTED:
const allowAsync = ({ dispatch }) => next => action => {
  if (typeof action.value === 'function') {
    dispatch({
      type: action.type,
      status: STATUS.PENDING,
    })
    const promise = Promise
      .resolve(action.value())
      .then((value) => dispatch({
        type: action.type,
        status: STATUS.RESOLVED,
        value,
      }))
      .catch((error) => dispatch({
        type: action.type,
        status: STATUS.REJECTED,
        error: error.message,
      }))
    return promise
  }
  return next(action)
}

// Create a new store and apply your defined middleware function to 
// extend the functionality of the dispatch method:
const store = createStore(
  timeReducer,
  applyMiddleware(allowAsync),
)

// Bind action creators to the dispatch method of the store:
const {
  setTime,
  fetchTime,
  fetchDate,
} = bindActionCreators(actions, store.dispatch)

// Subscribe a function listener to the store and display in terminal 
// the state tree, as a JSON string, every time there is a change in the 
// state:
store.subscribe(() => {
  console.log('x1b[1;34m%sx1b[0m', 'State has changed')
  console.dir(
    store.getState(),
    { colors: true, compact: false },
  )
})

// Dispatch a synchronous action to set the time:
setTime(new Date().toTimeString())

// Dispatch an asynchronous action to fetch and set the time:
fetchTime()

// Dispatch another asynchronous action to fetch and try to set the date. 
// Remember that this operation is supposed to fail and it's intentional:
fetchDate()