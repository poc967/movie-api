const Movies_Directors = (connection, Sequelize, Movies, Directors) => {
  return connection.define('movies_directors', {
    movieId: {
      type: Sequelize.INTEGER,
      reference: {
        model: Movies,
        key: 'id'
      },
      primaryKey: true
    },
    directorId: {
      type: Sequelize.INTEGER,
      reference: {
        model: Directors,
        key: 'id'
      },
      primaryKey: true
    },
  }, {
    paranoid: true
  })
}

module.exports = Movies_Directors