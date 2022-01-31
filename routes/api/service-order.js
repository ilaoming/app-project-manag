const express = require('express');
const router = express.Router();
const pool = require('../../mysql')

// GET methods
// -------------------------------------------------------------------------------------------------------------------------------------


// GET all service order
router.get('/service-order', (req,res) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        // Query SQL
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
          service_state.name AS service_state,
          product.name AS product_name,
          product.price AS product_price,
          product.quantity AS product_quantity,
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

          // Data processing
          service_order = []
          end_service_order = undefined

          results.forEach(data => {
            if (data.id != end_service_order){
              end_service_order = data.id

              service_order.push({
                id: data.id,
                entity_name: data.entity_name,
                s_date: data.s_date,
                e_date: data.e_date,
                e_days: data.e_days,
                p_days: data.p_days,
                phone:  data.phone,
                mail:   data.mail,
                delivery_address: data.delivery_address,
                assignee_name: data.assignee_name,
                service_state: data.service_state,
                product: []
              })

            }
            service_order[service_order.length-1].product.push({
              product_name: data.product_name,
              product_price: data.product_price,
              product_quantity: data.product_quantity,
              total: data.total
            })
          });

          // results
          res.json(service_order);
        });
    });
});


// -------------------------------------------------------------------------------------------------------------------------------------


// GET service order by id
router.get('/service-order/:id', (req,res) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        const id = req.params.id;

        // Query SQL
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
          service_state.name AS service_state,
          product.name AS product_name,
          product.price AS product_price,
          product.quantity AS product_quantity,
          product.quantity * product.price AS total
        FROM
          service_order
        INNER JOIN
          product , service_state
        WHERE 
          product.order_id = service_order.id
        AND
          service_state.id = service_order.state_id
        AND
          service_order.id = ${connection.escape(id)} 
        `

        // Use the connection
        connection.query(query, function (error, results, fields) {

          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;

          // Data processing
          if (results.length > 0) {
            service_order = []
            end_service_order = undefined

            results.forEach(data => {
              if (data.id != end_service_order){
                end_service_order = data.id

                service_order.push({
                  id: data.id,
                  entity_name: data.entity_name,
                  s_date: data.s_date,
                  e_date: data.e_date,
                  e_days: data.e_days,
                  p_days: data.p_days,
                  phone:  data.phone,
                  mail:   data.mail,
                  delivery_address: data.delivery_address,
                  assignee_name: data.assignee_name,
                  service_state: data.service_state,
                  product: []
                })

              }
              service_order[service_order.length-1].product.push({
                product_name: data.product_name,
                product_price: data.product_price,
                product_quantity: data.product_quantity,
                total: data.total
              })
            });

            // results
            res.json(service_order);

          }else{

            // errors
            res.status(404)
            res.send({
                errors:[
                    `order ${id} not found`
                ]
            })
          }
        });
    });
});


//POST methods
// -------------------------------------------------------------------------------------------------------------------------------------

router.post('/service-order',(req,res)=>{

  pool.getConnection(function (err,connection) { 

    if(err) throw err // Not connected!

      const id = req.body.id
      const entity_name = req.body.entity_name
      const s_date = req.body.s_date
      const e_date = req.body.e_date
      const e_days = req.body.e_days
      const p_days = req.body.p_days
      const phone = req.body.phone
      const mail = req.body.mail
      const delivery_address = req.body.delivery_address
      const assignee_name = req.body.assignee_name
      const state_id = req.body.state_id
    

        // Query SQL
        const query = `
        INSERT INTO
          service_order
          (
            id,
            entity_name,
            s_date,
            e_date,
            e_days,
            p_days,
            phone,
            mail,
            delivery_address,
            assignee_name,
            state_id
          )
        VALUES
          (
            ${connection.escape(id)},
            ${connection.escape(entity_name)},
            ${connection.escape(s_date)},
            ${connection.escape(e_date)},
            ${connection.escape(e_days)},
            ${connection.escape(p_days)},
            ${connection.escape(phone)},
            ${connection.escape(mail)},
            ${connection.escape(delivery_address)},
            ${connection.escape(assignee_name)},
            ${connection.escape(state_id)}
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