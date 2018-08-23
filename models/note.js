'use strict'
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'No Title Provided'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'No Content Provided'
    }
  })
  Note.associate = models => {
    // associations can be defined here
    Note.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })

    Note.hasMany(models.Tag, {
      foreignKey: 'noteId',
      onDelete: 'CASCADE',
      as: 'tags'
    })
  }
  return Note
}
