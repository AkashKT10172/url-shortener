const express = require('express');
const app = express();

//connect to databse
const connectToMongo = require('./db');
connectToMongo()

//import routes
const urlRoute = require('./routes/url');
const redirectRoute = require('./routes/redirect');
//middlewares
app.use(express.json());

//route middleware
app.use('/url', urlRoute);
app.use('/redirect', redirectRoute);

app.listen(5000, () => console.log('server is ON!'))