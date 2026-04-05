const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db');

const Paso = sequelize.define('Paso', {
  id: {
    type:          DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:    true,
  },
  id_receta: {
    type:      DataTypes.INTEGER,
    allowNull: false,
  },
  numero_paso: {
    type:      DataTypes.INTEGER,
    allowNull: false,
  },
  instruccion: {
    type:      DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La instrucción no puede estar vacía' },
    },
  },
  duracion_minutos: {
    type:      DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: { args: [1], msg: 'La duración debe ser mayor a 0' },
    },
  },
}, {
  tableName:  'Paso',
  timestamps: false,
});

module.exports = Paso;
