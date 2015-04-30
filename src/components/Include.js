/*jslint vars: true, plusplus: true */
/*global require, module, console, angular */

(function () {
    "use strict";

    var IncludeDirective = function ($http, $templateCache, $compile) {
        
        return {
            
            restrict: 'A',
            link: function (scope, element, attributes) {
            
                var templateUrl = scope.$eval(attributes.include);

                $http.get(templateUrl, {cache: $templateCache}).success(
                    function (tplContent) {
                        element.replaceWith($compile(tplContent)(scope));
                    }
                );
            }
        };
    };

    IncludeDirective.$inject = ["$http", "$templateCache", "$compile"];
    
    module.exports = IncludeDirective;
    
}());