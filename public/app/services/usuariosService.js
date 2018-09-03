angular.module('usuarioService', [])
    .factory('Usuario', function($http) {
        var usuarioFactory = {};


        usuarioFactory.allUsuarios = function() {
            return $http.get('/api/all_usuarios');
        };

        usuarioFactory.create = function(usuarioData) {
            return $http.post('/api/usuario', usuarioData);
        };
        usuarioFactory.delete = function(usuarioDelData) {
            return $http.delete('/api/usuario/'+usuarioDelData._id, usuarioDelData);
        };
        usuarioFactory.update = function(usuarioUpData) {
           return $http.put('/api/usuario/'+usuarioUpData._id, usuarioUpData);
        };

        usuarioFactory.allUsuario = function() {
          //console.log('Service usuario all usuario');
            return $http.get('/api/usuario');
        };
        return usuarioFactory;
    })

.factory('socketio', function($rootScope) {
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },

        emit: function(eventName, data, callback) {
            var args = arguments;
            $rootScope.apply(function() {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        }
    };
});
