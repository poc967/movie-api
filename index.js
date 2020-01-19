const express = require('express')
const bodyParser = require('body-parser')
const models = require('./models')
const app = express()

app.get('/movies', async (request, response) => {
  const movies = await models.movies.findAll({
    include: [{
      all: true
    }]
  })
  response.send(movies)
})

app.get('/movies/:identifier', async (request, response) => {
  const movies = await models.movies.findAll({
    include: [{
      all: true
    }],
    where: {
      id: request.params.identifier
    }
  })
  response.send(movies)
})

app.get('/directors/:identifier', async (request, response) => {
  const director = await models.directors.findAll({
    include: {
      model: models.movies
    },
    where: {
      id: request.params.identifier
    }
  })
  response.send(director)
})

app.get('/genres/:identifier', async (request, response) => {
  const genre = await models.genres.findAll({
    include: {
      model: models.movies
    },
    where: {
      genre: request.params.identifier
    }
  })
  response.send(genre)
})

app.post('/movies', bodyParser.json(), async (request, response) => {
  const {
    title,
    directors,
    releaseDate,
    rating,
    runTime,
    genres
  } = request.body

  const names = directors.split(', ')
  const genresArray = genres.split(', ')

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    response.status(400).send('The following attributes are required: title, directors, releaseDate, rating, runTime, genres')
  } else {
    const newMovie = await models.movies.create({
      title,
      releaseDate,
      rating,
      runTime
    })
    response.status(201).send(newMovie)

    await names.forEach(async (name) => {
      const directorId = await models.directors.findOrCreate({
        where: {
          name: name
        }
      })
      await models.movies_directors.create({
        movieId: newMovie.id,
        directorId: directorId[0].dataValues.id
      })
      response.status(201)
    })

    await genresArray.forEach(async (genre) => {
      const genreId = await models.genres.findOrCreate({
        where: {
          genre: genre
        }
      })
      await models.movies_genres.create({
        movieId: newMovie.id,
        genreId: genreId[0].dataValues.id
      })
      response.status(201)
    })
  }
})

app.all('*', (request, response) => {
  response.sendStatus(404)
})

const server = app.listen(1337, () => {
  console.log('Listening on port 1337...')
})

module.exports = server