module.exports = function(Noticia) {

  Noticia.observe('before save', function(ctx, next) {

    if (!ctx.instance.fecha) {
      ctx.instance.fecha = new Date();
    }

    next();

  })

};
