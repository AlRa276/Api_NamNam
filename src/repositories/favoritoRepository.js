 const { Favorito } = require('../models');
 const obtenerDeUsuario = (id_usuario) =>
    Favorito.findAll({
      where:   { id_usuario },
      include: [{
        model:      Receta,
        attributes: ['id', 'titulo', 'url_imagen', 'tiempo_prep_minutos'],
      }],
      order: [['fecha_guardado', 'DESC']],
    });

  const agregar =  (id_usuario, id_receta) =>
    Favorito.findOrCreate({ where: { id_usuario, id_receta } });

  
  const eliminar = (id_usuario, id_receta) =>
    Favorito.destroy({ where: { id_usuario, id_receta } });

  const existe = async (id_usuario, id_receta) => {
    const fav = await Favorito.findOne({ where: { id_usuario, id_receta } });
    return !!fav;
  };

  module.exports = { obtenerDeUsuario, agregar, eliminar, existe };