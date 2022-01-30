require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./mysql');

//Home
app.get('/', (req, res) => {
  res.send('Hello World!, Heroku');
})


//GET all service order
app.get('/service-order', (req,res) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        //Query SQL
        const query = `
         SELECT * FROM
         service_order
         INNER JOIN
         product
         WHERE 
         product.order_id = service_order.id
        `


        // Use the connection
        connection.query(query, function (error, results, fields) {
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

