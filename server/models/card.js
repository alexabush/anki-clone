'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    'Card',
    {
      question: {
        type: DataTypes.STRING,
        allowNull: false
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      easy: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      medium: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      hard: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {}
  );
  Card.associate = function(models) {
    Card.belongsTo(models.Deck, {
      foreignKey: 'deckId',
      onDelete: 'CASCADE'
    });
  };
  return Card;
};
