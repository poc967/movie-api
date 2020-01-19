const Sequelize = require('sequelize')
const moviesModel = require('./movies')
const directorsModel = require('./directors')
const genresModel = require('./genres')
const movies_genresModel = require('./movies_genres')
const movies_directorsModel = require('./movies_directors')
const allConfigs = require('../config/sequelize')

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const {
  host,
  database,
  username,
  password,
  dialect
} = allConfigs[environment]

const connection = new Sequelize(database, username, password, {
  host,
  dialect
})

const movies = moviesModel(connection, Sequelize)
const directors = directorsModel(connection, Sequelize)
const genres = genresModel(connection, Sequelize)
const movies_genres = movies_genresModel(connection, Sequelize)
const movies_directors = movies_directorsModel(connection, Sequelize)

movies.belongsToMany(directors, {
  through: movies_directors
})
directors.belongsToMany(movies, {
  through: movies_directors
})
movies.belongsToMany(genres, {
  through: movies_genres
})
genres.belongsToMany(movies, {
  through: movies_genres
})

module.exports = {
  movies,
  directors,
  genres,
  movies_genres,
  movies_directors
}