const Pool = require('pg').Pool
const pool = new Pool({
  user: 'getaroom',
  host: 'localhost',
  database: 'getaroom',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { username } = request.body

  pool.query('INSERT INTO users (username) VALUES ($1)', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username } = request.body

  pool.query(
    'UPDATE users SET username = $1 WHERE id = $3',
    [username, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const getResponses = (request, response) => {
  pool.query('SELECT * FROM responses ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createResponse = (request, response) => {
  pool.query('INSERT INTO responses (question, correct, userid1, userid2, difficulty) VALUES ($1, $2, $3, $4, $5)', 
    [question, correct, userid1, userid2, difficulty], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send('Response added with ID: ${result.insertId')
    })
}

module.exports = {
  getUsers,
  getResponses,
  createUser,
  createResponse,
  updateUser,
  deleteUser
}