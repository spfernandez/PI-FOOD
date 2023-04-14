const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('diets', {
   
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },{ 
    timestamps: false,
    freezeTableName: true
  });
};