const mongoose = require('mongoose')
const { connection, Schema } = mongoose

mongoose.connect(
  'mongodb://localhost:27017/test'
).catch(console.error)

// Define a schema:
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

// Define pre and post hooks for the insertMany model method:
UserSchema.pre('insertMany', async function prMany() {
  console.log('Preparing docs...')
})
UserSchema.post('insertMany', async function psMany(docs) {
  console.log('The following docs were created:n', docs)
})

// Compile the schema into a model:
const User = mongoose.model('User', UserSchema)

// Once a connection to the database was established, use the insertMany 
// method to insert two documents at once:
connection.once('connected', async () => {
  try {
    await User.insertMany([
      { firstName: 'Leo', lastName: 'Smith' },
      { firstName: 'Neo', lastName: 'Jackson' },
    ])
  } 
  catch (error) {
    console.dir(error, { colors: true })
  } 
  finally {
    await connection.close()
  }
})