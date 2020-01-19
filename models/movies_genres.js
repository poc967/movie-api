const Movies_Genres = (connection, Sequelize, Movies, Genres) => {
  return connection.define('movies_genres', {
    movieId: {
      type: Sequelize.INTEGER,
      reference: {
        model: Movies,
        key: 'id'
      },
      primaryKey: true
    },
    genreId: {
      type: Sequelize.INTEGER,
      reference: {
        model: Genres,
        key: 'id'
      },
      primaryKey: true
    },
  }, {
    paranoid: true
  })
}

module.exports = Movies_Genres