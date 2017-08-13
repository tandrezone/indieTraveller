var app = angular.module('indie',['ngCookies']);

app.controller("login", function($scope,$http){

	$scope.signupUser = function signupUser() {
		$http({
		  method: 'POST',
		  url: 'http://192.168.1.71:3000/user/login',
		  params: {"name": $scope.name,"password": $scope.password}
		}).then(function successCallback(response) {
		    console.log(response);
		    if(response.data == null) {
		    	alertify.set('notifier','position', 'bottom-center');
		    	alertify.error("Username ou password errada");
		    } else {
		    	var storage = window.localStorage;
		    	alertify.set('notifier','position', 'bottom-center');
		    	alertify.success('Login efectuado com sucesso!');
		    	storage.setItem('id', response.data.id);
		    	storage.setItem('name', response.data.name);
		    	storage.setItem('token', response.data.token);
		    	setTimeout(function() {
		    		window.location.replace("booking.html");
		    	}, 1000);
		    }
		  }, function errorCallback(response) {
		    alertify.error("Falha em ligacao ao servidor");
		});
	}
});

app.controller('myCtrl', function($scope,$http) {
		$scope.changeBook = function changeBook(bookingId) {
			for(var i = 0; i< $scope.names.length; i++){
				if($scope.names[i].id == bookingId){
					break;
				}
			}
			console.log(bookingId);
			$scope.booking = $scope.names[i].id;
    		$scope.bookingName = $scope.names[i].name;
    		$scope.city = $scope.names[i].city;
    		$scope.country = $scope.names[i].country;
    		$scope.car = $scope.names[i].car;
		}
		var storage = window.localStorage;
		$scope.username = storage.getItem('name');
		$http({
		  method: 'GET',
		  url: 'http://192.168.1.71:3000/user/'+storage.getItem('id')+'/items',
		}).then(function successCallback(response) {
		    console.log(response);
		    if(response.data.length == 0) {
		    	alertify.set('notifier','position', 'bottom-center');
		    	alertify.error("Nao ha booking para este user");
		    } else {
		    	$scope.names = [];
		    	for(var i=0 ; i < response.data.length; i++){
		    		$scope.names.push({name: response.data[i].name, id: response.data[i].id, city: response.data[i].city, country: response.data[i].country, car: response.data[i].car});
		    		$scope.booking = $scope.names[0].id;
		    		$scope.bookingName = $scope.names[0].name;
		    		$scope.city = $scope.names[0].city;
		    		$scope.country = $scope.names[0].country;
		    		$scope.car = $scope.names[0].car;
		    	}
		    	console.log($scope.name);
		    }
		  }, function errorCallback(response) {
		    alertify.error("Falha em ligacao ao servidor");
		});
    
});