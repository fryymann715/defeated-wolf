const DATABASE_NAME = 'defeated-wolf'
const connection_string = `postgres://${process.env.USER}@localhost:5432/${DATABASE_NAME}`
const knex = require( 'knex' )({
                                client: 'pg',
                                connection: connection_string,
                                searchPath: 'knex,public'
                              })


const Test_Suite = {

  handle: ( request, response, next ) => {
    knex.select().from('transaction')
    .then( data => response.send(data))
    .catch( error => next(error))
  },

  handlePizza: ( request, response, next ) => {
    knex.select().from('custom_pizza')
    .then( data => {
      response.status(200)
      .json({
              status: 'succes',
              data: data,
              message: 'Retrieved all data from custom_pizza.'
            })
    })
    .catch( error => next( error ))
  },

  add: ( request, response, next ) => {
    const { name, price } = request.body
    knex('pizza').insert({
                          name: name,
                          price: price
                        })
    .then(
      response.status(200)
      .json({ status: 'success', message: 'Added new pizza.' }) )
    .catch( error => next( error ))
  },

  delete: ( request, response, next ) => {
    const { id } = request.params
    knex('pizza').del().where({ id: id })
    .then( () => {
      response.status(200)
      .json({
              status: 'success',
              message: 'Deleted pizza.'
            })
    } )
    .catch( error => next( error ))

  }
}

module.exports = Test_Suite
