'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class airtportdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  airtportdata.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    cleanliness: DataTypes.INTEGER,
    ranking: DataTypes.INTEGER,
    traffic: DataTypes.INTEGER,
    airlines: DataTypes.INTEGER,
    image: DataTypes.STRING,
    recommendation: DataTypes.TEXT,
    service: DataTypes.INTEGER,
    taxi: DataTypes.TEXT,
    foodchains: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'airtportdata',
  });
  return airtportdata;
};