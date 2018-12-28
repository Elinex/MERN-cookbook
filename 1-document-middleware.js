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

// Add a pre and post hook for the init document method:
UserSchema.pre('init', async function preInit() {
  console.log('A document is going to be initialized.')
})
UserSchema.post('init', async function postInit() {
  console.log('A document was initialized.')
})

// Add a pre and post hook for the validate document method:
UserSchema.pre('validate', async function preValidate() {
  console.log('A document is going to be validated.')
})
UserSchema.post('validate', async function postValidate() {
  console.log('All validation rules were executed.')
})

// Add a pre and post hook for the save document method:
UserSchema.pre('save', async function preSave() {
  console.log('Preparing to save the document')
})
UserSchema.post('save', async function postSave() {
  console.log(`A doc was saved id=${this.id}`)
})

// Add a pre and post hook for the remove document method:
UserSchema.pre('remove', async function preRemove() {
  console.log(`Doc with id=${this.id} will be removed`)
})
UserSchema.post('remove', async function postRemove() {
  console.log(`Doc with id=${this.id} was removed`)
})

// Compile the schema into a model:
const User = mongoose.model('User', UserSchema)

// Once a new connection is established, create a document and perform 
// some basic operations such as saving, retrieving, and deleting the 
// document:
connection.once('connected', async () => {
  try {
    const user = new User({
      firstName: 'John',
      lastName: 'Smith',
    })
    await user.save()
    await User.findById(user.id)
    await user.remove()
    await connection.close()
  } 
  catch (error) {
    await connection.close()
    console.dir(error.message, { colors: true })
  } 
})