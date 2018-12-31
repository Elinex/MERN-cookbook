const {
  createStore,
  combineReducers,
  bindActionCreators,
} = require('redux')

// Define a store enhancer function that will allow the createStore method 
// to accept a Map object as an argument. It will go through each key-value 
// pair of the Map and add it to an object which will then be used to 
// combine the reducers using the combineReducers method:
const acceptMap = () => createStore => (
  (reducerMap, ...rest) => {
    const reducerList = {}
    for (const [key, val] of reducerMap) {
      reducerList[key] = val
    }
    return createStore( 
      combineReducers(reducerList),
      ...rest,
    )
  }
)

// Define actions types:
const TYPE = {
  INC_COUNTER: 'INC_COUNTER',
  DEC_COUNTER: 'DEC_COUNTER',
  SET_TIME: 'SET_TIME',
}

// Define actions creators:
const actions = {
  incrementCounter: (incBy) => ({
    type: TYPE.INC_COUNTER,
    incBy, 
  }),
  decrementCounter: (decBy) => ({
    type: TYPE.DEC_COUNTER,
    decBy,
  }),
  setTime: (time) => ({
    type: TYPE.SET_TIME,
    time, 
  }),
}

// Define a map constant that will contain an instance of Map:
const map = new Map()

// Add a new reducer function to the map object with a key counter:
map.set('counter', (state = 0, action) => {
  switch (action.type) {
    case TYPE.INC_COUNTER: return state + action.incBy
    case TYPE.DEC_COUNTER: return state - action.decBy
    default: return state
  } 
})

// Add another reducer function to the map object with a key time:
map.set('time', (state = null, action) => {
  switch (action.type) {
    case TYPE.SET_TIME: return action.time
    default: return state
  }
})

// Create a new store providing the map as the first argument and the 
// store enhancer as the second argument to extend the functionality of 
// the createStore method:
const store = createStore(map, acceptMap())

// Bind the previously defined actions creators to the dispatch method of 
// the store:
const {
  incrementCounter,
  decrementCounter,
  setTime,
} = bindActionCreators(actions, store.dispatch)

// To test the code in NodeJS, use the setInterval global method to 
// repeatedly call a function every second. It will first dispatch an 
// action to set the current time, then, based on the criteria, it will 
// decide if to increment or decrement the counter. After, pretty print in 
// the terminal the current value of the store:
setInterval(function() {
  setTime(new Date().toTimeString())
  if (this.shouldIncrement) {
    incrementCounter((Math.random() * 5) + 1 | 0)
  } else {
    decrementCounter((Math.random() * 5) + 1 | 0)
  }
  console.dir(
    store.getState(),
    { colors: true, compact: false },
  )
  this.shouldIncrement = !this.shouldIncrement
}.bind({ shouldIncrement: false }), 1000)