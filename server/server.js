var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();

// storage

var ds = loopback.createDataSource({
  connector: require('loopback-component-storage'),
  provider: 'filesystem',
  root: path.join(__dirname, 'storage')
});

var container = ds.createModel('container');
app.model(container);

// facebook fix

app.get('/noticia/:id', function(req, res, next){
  console.log("noticia", req.params);

  var Noticia = req.app.models.Noticia;

  var element = [];

  Noticia.findById(req.params.id, function(err, result) {

    if (err) {
      console.log(err);
      return next(err);
    }

    element = result;

    console.log(element);

    res.send('<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
    '<meta property="og:title" content="' + element.titulo + '" />' +
    '<meta property="og:description" content="' + element.descripcion + '" />' +
    '<meta property="og:image" content="http://localhost:3000/api/containers/images/download' + element.foto_principal + '" />'+
    '</head>'+
    '<body>'+
    '<p>' + element.titulo + '</p>'+
    '</body>'+
    '</html>');

    next();

  });


});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
