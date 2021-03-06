const express = require('express');
const router = express.Router();
const pool = require('../../mysql');

//GRT methods
// -------------------------------------------------------------------------------------------------------------------------------------

// GET all products
router.get('/product',(req,res)=>{
    pool.getConnection(function(err,connection){
        if(err) throw err; // Not connected!

        // Query SQL
        const query = `
        SELECT * FROM 
        product
        `

        // Use connection
        connection.query(query,function (error,results,fields) { 

            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;

            res.json(results);
         })

    })
    
})


// -------------------------------------------------------------------------------------------------------------------------------------


// GET products by id
router.get('/product/:id',(req,res)=>{
    pool.getConnection(function(err,connection){
        if(err) throw err; //Not connected!

        const id = req.params.id

        // Query SQL
        const query = `
        SELECT * FROM 
        product
        WHERE 
        id = ${connection.escape(id)}
        `

        // Use connection
        connection.query(query,function (error,results,fields) { 

            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;

            // Validations
            if (results.length > 0) {
                res.status(200)
                res.json(results[0]);
            } else {
                res.status(404)
                res.send({
                    errors:[
                        `Product ${id} not found`
                    ]
                }) 
            }

         })

    })
    
})


//POST methods
// -------------------------------------------------------------------------------------------------------------------------------------


router.post('/product',(req,res)=>{

    pool.getConnection(function (err,connection) { 
  
      if(err) throw err // Not connected!
  
        const id = req.body.id
        const name = req.body.name
        const quantity = req.body.quantity
        const price = req.body.price
        const total = price * quantity
        const order_id = req.body.order_id

          // Query SQL
          const query = `
          INSERT INTO
            product
            (
              id,
              name,
              quantity,
              price,
              total,
              order_id
            )
          VALUES
            (
              ${connection.escape(id)},
              ${connection.escape(name)},
              ${connection.escape(quantity)},
              ${connection.escape(price)},
              ${connection.escape(total)},
              ${connection.escape(order_id)}
            )
          `
          //Use connection
          connection.query(query,function (error,results,fields) { 
  
            // When done with the connection, release it.
            connection.release;
  
            // Handle error after the release.
            if(error) throw error;
  
            // Response
            res.status(200)
            res.send('Success')
           })
  
     })
  
  })
module.exports = router;