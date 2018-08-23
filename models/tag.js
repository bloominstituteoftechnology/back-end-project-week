'use strict'
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  Tag.associate = models => {
    // associations can be defined here
    Tag.belongsTo(models.Note, {
      foreignKey: 'noteId',
      onDelete: 'CASCADE'
    })
  }
  return Tag
}
