'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Deck.associate = function(models) {
    Deck.hasMany(models.Card, {
      foreignKey: 'deckId',
      as: 'deckCards'
    });

    Deck.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Deck;
};