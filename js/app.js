

var app = angular.module('Aplikacija', ['ngRoute','angularUtils.directives.dirPagination']);
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
  	
  	$scope.autori = [];
    $scope.ukupnoAutora = 0;
    getAutoriZaStranicu(1,"");

    $scope.pagination = {
        current: 1
    };

    $scope.stranicaPromjenjena = function(novaStranica,uvjet) {
        getAutoriZaStranicu(novaStranica,uvjet);
    };
    
    function getAutoriZaStranicu(brojStranice,uvjet) {
        $http.get('backend/Read.php?uvjet=' + uvjet + "&brojStranice=" + brojStranice)
            .then(function(response) {
                angular.forEach(response.data.autori, function(value, key) {
				    value.datumrodenja = new Date(value.datumrodenja);
				 });	
		        $scope.autori = response.data.autori; 
                $scope.ukupnoAutora = response.data.ukupno;
            });
    }
  	
  	$scope.Read_Autor = function(uvjet){
      getAutoriZaStranicu(1,uvjet);
    };
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
          $http.post('backend/Update.php', autor).success(function(data) {
            $scope.reset();
            $scope.activePath = $location.path('/');
        });
        $scope.reset = function() {
            $scope.autor = angular.copy($scope.master);
        };
        $scope.reset();
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