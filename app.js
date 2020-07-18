const express = require('express')
const app = express()
var morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
var cors = require('cors')

dotenv.config()
// Conect Mongosse database
mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
mongoose.Promise = global.Promise;

// access view URL

app.use('/uploads', express.static('uploads'))

// Midleware
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// CROS Cross-origin resource sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
      }
    next();
});


//Import Router 
const productRouter = require('./api/routes/products')
const orderRouter = require('./api/routes/orders')
const userRouter = require('./api/routes/users')
const categoryRouter = require('./api/routes/categories')
const addressRouter = require('./api/routes/address')
const shipmentRouter = require('./api/routes/shipment')
const paymentRouter = require('./api/routes/payment')
const searchRouter = require('./api/routes/search')
const attributeRouter = require('./api/routes/attributes')

// Use Router 
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter )
app.use('/api/auth', userRouter)
app.use('/api/categories', categoryRouter )
app.use('/api/address', addressRouter )
app.use('/api/shipment', shipmentRouter )
app.use('/api/payment', paymentRouter )
app.use('/api/search', searchRouter )
app.use('/api/attributes', attributeRouter )


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })
})

module.exports = app