const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2] || '8c7p46alCk2p66qy';

const url =
  `mongodb+srv://vercel-admin-user:${password}@cluster0.qfcsvkk.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('strictQuery',false);

const personSchema = new mongoose.Schema({
  content: String,
  content: String
})

module.exports = mongoose.model('Person', personSchema);
