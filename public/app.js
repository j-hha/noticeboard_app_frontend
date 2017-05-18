var app = angular.module('noticeboard', []);

app.controller('mainController', ['$http', function($http) {
  // initialize variables
  this.notices = [];
  this.formdata = {};
  this.URL = 'http://localhost:3000/notices';

  // Get all notices
  $http({
    method: 'GET',
    url: this.URL
  }).then(
    function(result) {
      console.log(result);
      this.notices = result.data;
    }.bind(this),
  function(error) {
    console.log(error);
  });

  this.processForm = function () {
    console.log('Form data from browser: ');
    console.log(this.formdata);
    $http({
      method: 'POST',
      url: this.URL,
      data: this.formdata
    }).then(
      function(result) {
        console.log('Data from server:');
        console.log(result);
        this.formdata = {};
        this.notices.unshift(result.data);
      }.bind(this),
      function(error) {
        console.log(error);
      });
  };

  this.createAccount = function () {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users',
      data: {
        name: this.createAccount.username,
        password: this.createAccount.password
      }
    }).then(
        function(response) {
          console.log(response);
        },
        function(error) {
          console.log(error);
        });
  };

  this.login = function () {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/sessions/create',
      data: {
        username: this.login.username,
        password: this.login.password
      },
      config: {
        withCredentials: true
      }
    }).then(
        function(response) {
          console.log(response);
        },
        function(error) {
          console.log(error);
        });
  };

  this.getCurrentUser = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/sessions/show',
      config: {
        withCredentials: true
      }
    }).then(
        function(response) {
          console.log(response);
        },
        function(error) {
          console.log(error);
        });
  };

  this.logout = function() {
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/sessions/destroy',
      config: {
        withCredentials: true
      }
    }).then(
        function(response) {
          console.log(response);
        },
        function(error) {
          console.log(error);
        });
  };

}]);
