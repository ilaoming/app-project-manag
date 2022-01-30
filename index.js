require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./mysql');

app.get('/', (req, res) => {
  res.send('Hello World!, Heroku');
})

app.get('/product', (req,res) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query('SELECT * FROM product', function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;

          //results
          res.json(results);
        });
    });
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
})

