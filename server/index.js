const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

//connect to databse
const connectToMongo = require('./db');
connectToMongo()

//import routes
const urlRoute = require('./routes/url');
const redirectRoute = require('./routes/redirect');

//middlewares
app.use(express.json());
app.use(cors());

//route middleware
app.use('/url', urlRoute);
app.use('/', redirectRoute);

app.listen(PORT, () => console.log('server is ON!'))