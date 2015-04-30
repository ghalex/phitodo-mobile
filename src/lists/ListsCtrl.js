/*jslint vars: true, plusplus: true */
/*global module, require, console */

(function () {
    "use strict";
    
    var ListsCtrl = function ($scope, $rootScope) {
        
        // region #Vars
        
        $scope.lists = [];
        $scope.selectedList = null;
        $scope.currentUser = null;
        $scope.todos = [];
        
        // endregion
        
        // region #Public Functions
        
        $scope.selectList = function (list) {
            $rootScope.$broadcast('listSelected', list);
            
            $rootScope.$broadcast('smartListSelected', null);
            $rootScope.$broadcast('todoSelected', null);
        };
        
        $scope.editList = function (list) {
            $rootScope.$broadcast('editList', list);
        };
        
        $scope.newList = function () {
            $rootScope.$broadcast('newList');
        };
        
        $scope.deleteList = function (list) {
            
            /*$alert.open({
                message: "Are you sure do you want to delete <br/> list <b>'" + list.attributes.title + "'</b> ?",
                yes: function () {
                    list.destroy().then(function () {
                        $scope.todos.fetch();
                        
                        $rootScope.$broadcast('listSelected', null);
                        $rootScope.$apply();
                    });
                }
            });*/
        };
        
        // endregion
        
        // region #Events
        
        $rootScope.$on('newLists', function (event, data) {
            $scope.lists = data;
        });
        
        $rootScope.$on('listSelected', function (event, data) {
            $scope.selectedList = data;
        });
        
        $rootScope.$on('userLogIn', function (event, data) {
            $scope.currentUser = data;
        });
        
        $rootScope.$on('newTodos', function (event, data) {
            $scope.todos = data;
        });
        
        // endregion
    };
    
    ListsCtrl.$inject = ["$scope", "$rootScope"];
    
    module.exports = ListsCtrl;
    
}());