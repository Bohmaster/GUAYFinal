'use strict';
angular.module('guay-news')
  .controller('NoticiasController',
    function($scope, $http, $stateParams, $modal, Noticia, Categoria) {

      if ($stateParams.articuloId) {

        console.log($stateParams.articuloId);

        $scope.noticia = [];

        Noticia.find({
          filter: {
            where: {
              id: $stateParams.articuloId
            }
          }
        }, function(art) {
          $scope.noticia = art[0];
          console.log("sabE", art);
        });


      }

      if ($stateParams.categoriaId) {

        $scope.noticiasS = [];
        $scope.categoriaS = null;

        Noticia.find({
          filter: {
            where: {
              categoriaId : $stateParams.categoriaId
            }
          }
        }, function(data) {
          console.log("state", data);
          $scope.noticiasS = data;
        });

        Categoria.find({
          filter: {
            where: {
              id: $stateParams.categoriaId
            }
          }
        }, function(data) {
          $scope.categoriaS = data;
          console.log(99, data);
        }, function(err) {
          console.log(88, data);
        });

      }

      $scope.noticias = [];

      $scope.categorias = [];

      function loadNoticias() {
        Noticia.find({
          filter: {
            limit: 5
          }
        }, function(data) {
          $scope.noticias = data;
          console.log(data);
        })
      }

      function loadCategorias() {
        Categoria.find(function(data) {
          $scope.categorias = data;
          console.log(data);
        })
      }

      loadNoticias();
      loadCategorias();

      $scope.noticia = {
        destacada: false,
        esVideo: false
      };

      /**
       * Agregar noticia
       */
      $scope.agregarNoticia = function() {
        Noticia.create({
          volanta: $scope.noticia.volanta,
          titulo: $scope.noticia.titulo,
          foto_principal: $scope.files[0].name || '',
          foto_miniatura: ($scope.files.length > 1) ? $scope.files[1].name : '',
          imagenes: [],
          descripcion: $scope.noticia.descripcion,
          cuerpo: $scope.noticia.cuerpo,
          categoriaId: $scope.noticia.categoriaId,
          destacada: $scope.noticia.destacada,
          esVideo: $scope.noticia.esVideo
        }, function(data) {
          console.log(data);
        });
        $scope.upload();
        loadNoticias();
      };

      /**
       * Editar noticia
       */
      $scope.editarNoticia = function(modelId, categoriaId) {
        console.log(categoriaId);
        $modal.open({
          templateUrl: 'js/modules/news/views/editar_noticia.html',
          resolve: {
            noticia: function(Noticia) {
              return Noticia.findById({id: modelId});
            }
          },
          controller: function($scope, $rootScope, noticia, Noticia, Categoria, $http) {
            $scope.noticia = noticia;

            $('#categoria').on('input', function() {
              var x = $('#categoria').val();
              var z = $('#categorias');
              var val = $(z).find('option[value="' + x + '"]');
              var endVal = val.attr('id');
              console.log(endVal);
              $scope.noticia.categoriaId = endVal;
            });

            $scope.upload = function() {
              var fd = new FormData();
              angular.forEach($scope.files, function(file) {
                fd.append('file', file);
              });
              $http.post('/api/containers/images/upload',
                fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
                }
              ).success(function(d){
                  console.log(d);
                  console.log(1, $scope.files);
                })
                .error(function(e) {
                  console.log(e);
                });
            };

            $scope.editarNoticia = function() {
              if ($scope.files) {

                $http.put('/api/noticia/' + modelId, {
                  volanta: $scope.noticia.volanta,
                  titulo: $scope.noticia.titulo,
                  foto_principal: $scope.files[0].name || $scope.noticia.foto_principal,
                  foto_miniatura: ($scope.files.length > 1) ? $scope.files[1].name : $scope.noticia.foto_miniatura,
                  imagenes: [],
                  descripcion: $scope.noticia.descripcion,
                  cuerpo: $scope.noticia.cuerpo,
                  categoriaId: $scope.noticia.categoriaId
                })
                  .success(function(data) {
                    console.log(data);
                    $rootScope.$broadcast('noticia.editada');
                    $scope.upload();
                    $scope.$close(data);
                  })
                  .error(function(err) {
                    console.log(err);
                  });

              } else {

                $http.put('/api/noticia/' + modelId, {
                  volanta: $scope.noticia.volanta,
                  titulo: $scope.noticia.titulo,
                  foto_principal: $scope.noticia.foto_principal,
                  foto_miniatura: $scope.noticia.foto_miniatura,
                  imagenes: [],
                  descripcion: $scope.noticia.descripcion,
                  cuerpo: $scope.noticia.cuerpo,
                  categoriaId: $scope.noticia.categoriaId
                })
                  .success(function(data) {
                    console.log(data);
                    $rootScope.$broadcast('noticia.editada');
                    $scope.upload();
                    $scope.$close(data);
                  })
                  .error(function(err) {
                    console.log(err);
                  });

              }
            }
          }
        });
      };

      /**
       * Borrar noticia
       */
      $scope.borrarNoticia = function(id) {
        Noticia.deleteById({
          id: id
        }, function(data) {
          console.log('Noticia borrada');
          loadNoticias();
        })
      };

      /**
       * Upload method
       *
       */
      $scope.upload = function() {
        var fd = new FormData();
        angular.forEach($scope.files, function(file) {
          fd.append('file', file);
        });
        $http.post('/api/containers/images/upload',
          fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          }
        ).success(function(d){
            console.log(d);
            console.log(1, $scope.files);
          })
          .error(function(e) {
            console.log(e);
          });
      };

      $scope.$on('noticia.editada', function(event) {

        loadNoticias();

      });

      /**
       * Obtener categoriaId
       */
      $('#categoria').on('input', function() {
        var x = $('#categoria').val();
        var z = $('#categorias');
        var val = $(z).find('option[value="' + x + '"]');
        var endVal = val.attr('id');
        console.log(endVal);
        $scope.noticia.categoriaId = endVal;
      });

      /**
       * tinyMCE Options
       */

      $scope.tinyMCEOptions = {
        onChange: function(e) {

        },
        inline: false,
        plugins : 'advlist autolink link image lists charmap print preview media',
        skin: 'lightgray',
        theme : 'modern'
      };

    });
