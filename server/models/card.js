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
      easy: DataTypes.INTEGER,
      medium: DataTypes.INTEGER,
      hard: DataTypes.INTEGER,
      priority: DataTypes.INTEGER
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
