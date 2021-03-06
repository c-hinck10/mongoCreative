angular.module('sneaker', [])
  .controller('MainCtrl', [
    '$scope', '$http',
    function($scope, $http) {
      $scope.sneakers = [];
      $scope.addSneaker = function() {
        var newsneaker = { name: $("#shoeName").val(), url: $("#url").val(), upvotes: 0};
        $scope.formContent = '';
        $http.post('/sneakers', newsneaker).success(function(data) {
          $scope.sneakers.push(data);
        });
      };
      $scope.delete = function (sneaker) {
        $http.delete('/sneakers/' + sneaker._id)
          .success(function(data) {
            console.log("delete worked");
          });
          $scope.getAll();
      };
      
      $scope.upvote = function(sneaker) {
        return $http.put('/sneakers/' + sneaker._id + '/upvote')
          .success(function(data) {
            console.log("upvote worked");
            sneaker.upvotes = data.upvotes;
          });
      };
      
      $scope.downvote = function(sneaker) {
        return $http.put('/sneakers/' + sneaker._id + '/downvote')
          .success(function(data) {
            console.log("downvote worked");
            sneaker.upvotes = data.upvotes;
          });
      };
      
      $scope.incrementUpvotes = function(sneaker) {
        $scope.upvote(sneaker);
      };
      
      $scope.decrementUpvotes = function(sneaker) {
        $scope.downvote(sneaker);
      };
      
      $scope.dovote = function() {
        angular.forEach($scope.sneakers, function(value,key) {
          if(this.selected) {
            $scope.incrementUpvotes(this);
          }
        });
      };

      $scope.getAll = function() {
        return $http.get('/sneakers').success(function(data) {
          angular.copy(data, $scope.sneakers);
          
        });
      };

    }
  ]);
  
