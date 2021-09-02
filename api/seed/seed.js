import mongoose from 'mongoose'
import User from '../models/User.js'
import Record from '../models/Record.js'
import faker from 'faker'


// Delete all users
(async function () {

  // connect to the DB
  mongoose.connect('mongodb://localhost:27017/record-shop-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('Connection to DB established!'))
  .catch(err => console.log('[ERROR] We can not connect to the DB =>', err))

  // Delete all users
  try {
    await User.deleteMany({})
    console.log(`All users were deleted`)
  } catch (err) {
    console.log(err)
  }

  // Delete all records
  try {
    await Record.deleteMany({})
    console.log(`All records were deleted`)
  } catch (err) {
    console.log(err)
  }

  // Create 20 fake users
  const userPromises = Array(20)
    .fill(null)
    .map(() => {
      const userData = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        username: faker.internet.userName(),
        password: 'asd123',
        birthday: faker.date.between('1965', '2000'),
        address: {
          street: faker.address.streetName(),
          streetNum: faker.datatype.number(),
          city: faker.address.city(),
          zipCode: faker.address.zipCode(),
          country: faker.address.country()
        }
      }

      console.log(`User with email ${userData.email} and password ${userData.password} has been created`)

      const user = new User(userData)
      return user.save()
    });
  
  try {
    await Promise.all(userPromises)
    console.log('**************************************************')
    console.log(`All 20 fake users have been stored to the DB`)
    console.log('**************************************************')
  } catch (err) {
    console.log(err)
  }

  // Create 20 fake records
  const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      const recordData = {
        cover: faker.image.image(400, 400),
        title: faker.address.streetName(),
        artist: faker.animal.dog(),
        price: faker.commerce.price(10, 25),
        year: faker.date.future(2021, 3000).getFullYear()
      }

      console.log(`Record with title ${recordData.title} by ${recordData.artist} has been created but not yet released`)

      const record = new Record(recordData)
      return record.save()
    })

  try {
    await Promise.all(recordPromises)
    console.log('**************************************************')
    console.log(`All 20 fake records have been stored to the DB`)
    console.log('**************************************************')
  } catch (err) {
    console.log(err)
  }

  mongoose.connection.close()
})();