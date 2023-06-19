const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;

(async () => {
    try {
      await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Database is now successfully connected');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  })();

mongoose.set('strictQuery', false);

console.log(process.env.PORT)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

module.exports = mongoose.model('Persons', personSchema);
