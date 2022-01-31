require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const service_state = require('./routes/api/service-state')
const service_order = require('./routes/api/service-order')
const product = require('./routes/api/product')

const PORT = process.env.PORT || 3000;




//Home
app.get('/', (req, res) => {
  res.send('Hello World!, Heroku');
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(service_state)
app.use(service_order)
app.use(product)






app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
})

