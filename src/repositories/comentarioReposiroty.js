const { Comentario, Usuario } = require('../models');
const obtenerDeReceta = (id_receta) =>
  Comentario.findAll({
    where:   { id_receta },
    include: [{ model: Usuario, as: 'usuario', attributes: ['id', 'nombre_mostrar', 'url_foto'] }],
    order:   [['fecha_creacion', 'ASC']],
  });


const crear = (datos) => Comentario.create(datos);

const eliminar = (id) => Comentario.destroy({ where: { id } });

module.exports = { obtenerDeReceta, crear, eliminar };