const express = require("express");
const router = express.Router();
const pool = require('../../mysql')

//GET all service order
router.get('/service-order', (req,res) =>{
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

          //Data processing
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

          //results
          res.json(service_order);
        });
    });
});

//GET service order by id
router.get('/service-order/:id', (req,res) =>{
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!

        const id = req.params.id;

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

          //Data processing
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

            //results
            res.json(service_order);

          }else{

            //errors
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

module.exports = router