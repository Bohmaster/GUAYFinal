module.exports = function(Noticia) {

  Noticia.observe('before save', function(ctx, next) {


    next();

  })

};
