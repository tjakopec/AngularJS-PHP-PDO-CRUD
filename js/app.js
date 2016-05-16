var app = angular.module('Aplikacija', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/ReadAutor', {templateUrl: 'frontend/Read.html', controller: 'AutorReadController'}).
      when('/CreateAutor', {templateUrl: 'frontend/Create.html', controller: 'AutorCreateController'}).
      when('/UpdateAutor/:sifra', {templateUrl: 'frontend/Update.html', controller: 'AutorUpdateController'}).
      when('/DeleteAutor/:sifra', {templateUrl: 'frontend/Delete.html', controller: 'AutorDeleteController'}).
      otherwise({redirectTo: '/ReadAutor'});
}]);
app.controller ('AutorReadController',[
  '$scope','$http',
  function ($scope, $http) {
      $http.get('backend/Read.php').success(function(data) {
      	
	     angular.forEach(data, function(value, key) {
		    value.datumrodenja = new Date(value.datumrodenja);
		 });
      	
        $scope.autori = data;  
      });
  }    
]),
app.controller ('AutorCreateController',[
  '$scope','$http','$location',
  function ($scope, $http, $location) {
      $scope.master = {};
      $scope.activePath = null;
      $scope.Create_Autor = function(autor, FormaDodajNovi) {
          $http.post('backend/Create.php', autor).success(function(vratioServer){
              $scope.reset();
              $scope.activePath = $location.path('/');
          });
          $scope.reset = function() {
              $scope.autor = angular.copy($scope.master);
          };
          $scope.reset();
      };
  }
]),
app.controller('AutorUpdateController',[
  '$scope','$http','$location','$routeParams',
  function ($scope, $http, $location, $routeParams) {	
      $scope.activePath = null;
	  var sifra = $routeParams.sifra;
      $http.get('backend/Read.php?sifra=' + sifra).success(function(data) {
      	data.datumrodenja = new Date(data.datumrodenja);
        $scope.autor = data;
      });
      $scope.Update_Autor = function(autor) {
      	console.log(autor);
          $http.put('backend/Update.php', autor).success(function(data) {
          $scope.activePath = $location.path('/');
        });
      };
  }
]);
app.controller('AutorDeleteController',[
  '$scope','$http','$location','$routeParams',
  function ($scope, $http, $location, $routeParams) {	
      $scope.activePath = null;
	  var sifra = $routeParams.sifra;
      $http.get('backend/Read.php?sifra=' + sifra).success(function(data) {
      	data.datumrodenja = new Date(data.datumrodenja);
        $scope.autor = data;
      });
      $scope.Delete_Autor = function(autor) {
          var deleteCustomer = confirm('Sigurno obrisati autora?');
          if (deleteCustomer) {
              $http.put('backend/Delete.php',autor).success(function(data) {
		          $scope.activePath = $location.path('/');
		        });
          }        
      };
  }
]);