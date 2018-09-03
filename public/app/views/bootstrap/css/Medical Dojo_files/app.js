//, 'storyService', 'storyCtrl', 'reverseDirective'
angular
    .module('AngLucuma', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService','consultorCtrl','consultorService','storyCtrl','storyService', 'reverseDirective' ])
    .config(function($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');
    });
