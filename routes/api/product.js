const express = require("express");
const router = express.Router();
const pool = require('../../mysql')

//GET all products
router.get('/product',(req,res)=>{
    pool.getConnection(function(err,connection){
        if(err) throw err; //Not connected!

        //Query SQL
        const query = `
        SELECT * FROM 
        product
        `

        //Use connection
        connection.query(query,function (error,results,fields) { 

            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;

            res.json(results);
         })

    })
    
})

//GET all products
router.get('/product/:id',(req,res)=>{
    pool.getConnection(function(err,connection){
        if(err) throw err; //Not connected!

        const id = req.params.id

        //Query SQL
        const query = `
        SELECT * FROM 
        product
        WHERE 
        id = ${connection.escape(id)}
        `

        //Use connection
        connection.query(query,function (error,results,fields) { 

            // When done with the connection, release it.
            connection.release();

            // Handle error after the release.
            if (error) throw error;

            //Validations
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

module.exports = router