const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('landingNode', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('conectamos ao banco')
} catch (err) {
    console.log(err)
}

module.exports = sequelize