const Movies = (connection, Sequelize) => {
  return connection.define('movies', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
    },
    releaseDate: {
      type: Sequelize.DATE,
    },
    rating: {
      type: Sequelize.ENUM('Rating', 'Not Rated', 'G', 'R', 'Passed', 'PG', 'PG-13', 'Approved'),
    },
    runTime: {
      type: Sequelize.INTEGER,
    },
  }, {
    paranoid: true
  })
}

module.exports = Movies