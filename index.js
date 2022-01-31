require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const service_order = require('./routes/api/service-order')
const product = require('./routes/api/product')


//Home
app.get('/', (req, res) => {
  res.send('Hello World!, Heroku');
})

app.use(service_order)
app.use(product)






app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
})

