// Define action-types as constants:
const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

// Define two action creators for generating two kinds of actions to 
// increment and decrement the counter:
const increment = (by) => ({
  type: INCREMENT_COUNTER,
  by,
})
const decrement = (by) => ({
  type: DECREMENT_COUNTER,
by, })

// Initialize the initial accumulator to 0, then reduce it by passing 
// several actions. The reducer function will decide which kind of action 
// to perform based on the action type:
const reduced = [
  increment(10),
  decrement(5),
  increment(3),
].reduce((accumulator, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return accumulator + action.by
    case DECREMENT_COUNTER:
      return accumulator - action.by
    default:
      return accumulator
  } 
}, 0)

// Log the resulting value:
console.log(reduced)