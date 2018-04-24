
var app=angular.module("orderApp",[]);
app.controller('orderCtrl', function($scope,$http){
    // Q1) add two more pizza objects 
    $scope.orderDate=new Date()
    
    $http({
      method: 'GET',
      url: '/showOrders',
      params:{date:$scope.orderDate},
    }).then(function successCallback(response) {
      $scope.orders=response.data
    }, function errorCallback(response) {
      $scope.orders=[]
    });

    $scope.msg="Orders"


    $scope.searchByDate=function(){
     orderDate=new Date(($scope.orderDate))
     $http({
      method: 'GET',
      url: '/showOrders',
      params:{date:$scope.orderDate},
    }).then(function successCallback(response) {
      $scope.orders=response.data

    }, function errorCallback(response) {
      $scope.orders=[]
    });
  }

  $scope.removeOrder=function(item){
    $http({
      method: 'POST',
      url: '/deleteOrder',
      data:item
    }).then(function successCallback(response) {

      $scope.msg="Deleted!"
      $http({
        method: 'GET',
        url: '/showOrders',
        params:{date:$scope.orderDate},
      }).then(function successCallback(response) {
        $scope.orders=response.data

      }, function errorCallback(response) {
        $scope.orders=[]
      });

    }, function errorCallback(response) {
      $scope.msg="Sorry, server problem, try again!"
    });

  }
  



})