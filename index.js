const express = require('express');
const app = express();
const port = 5000;
const bodyparser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/User');
const mongoose = require('mongoose');

//application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));
//application json
app.use(bodyparser.json());

mongoose
   .connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('MongoDB Connected'))
   .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.post('/register', async (req, res) => {
   const user = new User(req.body);
   try {
      await user.save();
      return res.status(200).json({ success: true });
   } catch (error) {
      return res.json({ success: false, error });
   }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
