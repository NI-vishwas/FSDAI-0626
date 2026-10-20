import express from 'express';
import connectToMongoDB from './db.js';
import userSchema from './schema.js';


const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = await connectToMongoDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// get all users
app.get('/users', async (req, res) => {
  try {
    const User = mongoose.model('User', userSchema);
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});