const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    // ingredients: {
    //   type: DataTypes.ARRAY(DataTypes.STRING(250)),
    // },
    // cookWare:{
    //   type: DataTypes.ARRAY(DataTypes.STRING(250))
    // },
    image: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT
    },
    // time: {
    //   type: DataTypes.INTEGER,
    // },
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
