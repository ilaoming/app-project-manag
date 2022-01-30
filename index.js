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
        SELECT 
          service_order.id,
          entity_name,
          s_date,
          e_date,
          e_days,
          p_days,
          phone,
          mail,
          delivery_address,
          assignee_name,
          product.name AS product_name,
          service_state.name AS state,
          product.quantity AS quantity,
          product.quantity * product.price AS total
        FROM
          service_order
        INNER JOIN
          product , service_state
        WHERE 
          product.order_id = service_order.id
        AND
          service_state.id = service_order.state_id
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

