const express = require('express');
const router = express.Router();
const pool = require('../../mysql');

// GET methods
// -------------------------------------------------------------------------------------------------------------------------------------

// GET all services state
router.get('/service-state',(req,res)=>{
    pool.getConnection(function(err,connection){
        if(err) throw err // Not connected!
                // Query SQL
                const query = `
                SELECT * FROM 
                service_state
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


// GET service state by id
router.get('/service-state/:id',(req,res)=>{
    pool.getConnection(function(err,connection){
        if(err) throw err; //Not connected!

        const id = req.params.id

        // Query SQL
        const query = `
        SELECT * FROM 
        service_state
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
                        `Service state ${id} not found`
                    ]
                }) 
            }

         })

    })
    
})


//POST methods
// -------------------------------------------------------------------------------------------------------------------------------------

router.post('/service-state',(req,res)=>{

    pool.getConnection(function (err,connection) { 
  
      if(err) throw err // Not connected!
  
        const name = req.body.name

          // Query SQL
          const query = `
          INSERT INTO
            service_state
            (
              name
            )
          VALUES
            (
              ${connection.escape(name)}
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
