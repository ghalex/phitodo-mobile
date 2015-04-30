/*jslint vars: true, plusplus: true */
/*global module, require, console */

(function () {
    "use strict";
    
    var SmartListsCtrl = function ($scope, $rootScope) {
        
        // region #Vars
        
        $scope.todos = [];
        $scope.selectedList = null;
        $scope.selectedSmartList = null;
        $scope.smartlists = [
            {
                id: 1,
                title: 'Inbox',
                icon: 'archive',
                filter: function (todo) {
                    return !todo.attributes.list;
                }
            },
            {
                id: 2,
                title: 'Today',
                icon: 'calendar',
                filter: function (todo) {
                    return todo.isToday() || todo.daysLeft() < 0;
                }
            },
            {
                id: 3,
                title: 'Tomorrow',
                icon: 'android-alarm-clock',
                filter: function (todo) {
                    return todo.isTomorrow();
                }
            },
            {
                id: 4,
                title: 'Starred',
                icon: 'android-star-half',
                filter: function (todo) {
                    return todo.attributes.isStarred;
                }
            }
        ];
        
        // endregion
        
        // region #Public function
        
        $scope.count = function (todos, filter) {
            return todos.filter(filter).filter(function (todo) { return !todo.get('isDone'); }).length;
        };
        
        $scope.deselectAllLists = function () {
            
            // Deselect lists
            $rootScope.$broadcast('listSelected', null);
            $rootScope.$broadcast('smartListSelected', null);
            
            // Deselect todo
            $rootScope.$broadcast('todoSelected', null);
        };
        
        $scope.selectSmartList = function (list) {
            
            $scope.deselectAllLists();
            
            $scope.selectedSmartList = list;
            $rootScope.$broadcast('smartListSelected', list);
        };
        
        // endregion
        
        // region #Events
        
        $rootScope.$on('listSelected', function (event, data) {
            $scope.selectedList = data;
        });
        
        $rootScope.$on('smartListSelected', function (event, data) {
            $scope.selectedSmartList = data;
        });
        
        $rootScope.$on('newTodos', function (event, data) {
            $scope.todos = data;
        });
        
        // endregion
    };
    
    SmartListsCtrl.$inject = ["$scope", "$rootScope"];
    module.exports = SmartListsCtrl;
    
}());