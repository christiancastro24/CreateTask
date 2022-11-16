const { DataTypes } = require('sequelize');

const User = require('./User')

const db = require('../db/conn')

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING
    },

    description: {
        type: DataTypes.STRING
    }
})

Task.belongsTo(User)
User.hasMany(Task)

module.exports = Task