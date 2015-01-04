/*jslint plusplus: true, node: true, vars: true */
/*global require, module */

'use strict';

var GoogleService = function ($q, device) {
    
    var PROJECT_ID      = 'todo-gmail-1986',
        CLIENT_ID       = '1070900723620-n6pf5q8ha6tfart5rkr6eaavqf1cvu7e.apps.googleusercontent.com',
        CLIENT_SECRET   = 'RL4Y12AkuDlr3wiQ3BzoNKrO',
        API_KEY         = 'AIzaSyCEbDkQOJR626_SWtkpZM1ridtbossk40Y',
        API_KEY_ANDROID = 'AIzaSyCZbZTd4-gStEiCUys-6mai6-atO0yRZKU',
        REDIRECT_URI    = 'http://localhost',
        gapi = require('gapi'),
        $ = require('jquery');
    
    var $log = $('.log');
    
    /**
     * Sign In with google on the phone 
     * using InAppBrowser
     *
     * @param success
     * @param error
     */
    this.phonegapLogin = function (success, error) {
            
        var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: 'code',
            scope: "email"
        });

        //Open the OAuth consent page in the InAppBrowser
        var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no'),
            deferred = $q.defer();

        $(authWindow).on('loadstart', function (e) {

            var url = e.originalEvent.url;
            var code = /\?code=(.+)$/.exec(url);
            var error = /\?error=(.+)$/.exec(url);

            if (code || error) {
                authWindow.close();
            }

            if (code) {

                $.post('https://accounts.google.com/o/oauth2/token', {
                    code: code[1],
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    redirect_uri: REDIRECT_URI,
                    grant_type: 'authorization_code'
                }).done(function (data) {

                    gapi.client.setApiKey(API_KEY_ANDROID);
                    gapi.auth.setToken(data);

                    deferred.resolve(data);

                });
            } else if (error) {
                deferred.reject(error);
            }
        });
        
//        var deferred = $q.defer();
//        
//        phonegapi.signIn({
//            client_id: CLIENT_ID,
//            client_secret: CLIENT_SECRET,
//            scope: "email",
//            callback: function(error, tokens) {
//                
//                if (error) {
//                    $log.append("error");
//                } else {
//                    $log.append("success");
//                    deferred.resolve(tokens);
//                }
//            }
//        });
//        
//        return deferred.promise;
    };
      
    /**
     * Sign In usig gapi
     */
    this.browserLogin = function () {

        var deferred = $q.defer();
        
        gapi.client.setApiKey(API_KEY);
        gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: "email",
            immediate: false
        }, function (authResult) {
            if (authResult && !authResult.error) {
                deferred.resolve(authResult);
            } else {
                deferred.reject(authResult);
            }
        });
        
        return deferred.promise;
    };
    
    /**
     * Choose 'browserLogin' or 'phonegapLogin' depending
     * on the platform.
     */
    this.login = function () {
        
        if (!device.isPhonegap()) {
            return this.browserLogin();
        } else {
            return this.phonegapLogin();
        }
    };
    
    /**
     * Load user information, like
     * email, display name, etc...
     */
    this.getUserInfo = function () {
        if (!gapi.client.oauth2) {
            throw new Error('OAuth2 api not loaded!');
        }
        
        var deferred = $q.defer();
        
        gapi.client.oauth2.userinfo.get().execute($.proxy(function (resp) {
            
            this.user = {};
            this.user.id = resp.id;
            this.user.email = resp.email;
            this.user.displayName = resp.family_name + " " + resp.given_name;
            this.user.picture = resp.picture;
            
            deferred.resolve(this.user);
            
        }, this));
        
        return deferred.promise;
    };
    
    /**
     * Load all Google Api's required.
     */
    this.loadAPIs = function () {
        var gmailPromise = $q.defer(),
            oAuthPromise = $q.defer(),
            all;
                
        gapi.client.load('gmail', 'v1', function () {
            gmailPromise.resolve(gapi);
        });
        
        gapi.client.load('oauth2', 'v2', function () {
            oAuthPromise.resolve(gapi);
        });
        
        all = $q.all([gmailPromise.promise, oAuthPromise.promise]);
        
        return all;
    };
    
    this.loadTodos = function (userId, labels) {
        
        var i = 0,
            todos = [],
            deferred = $q.defer(),
            request = gapi.client.gmail.users.messages.list({'userId': userId, 'labelIds': ['Label_41']});
      
        request.execute(function (result) {
            
            for (i = 0; i < result.messages.length; i++) {
                
                gapi.client.gmail.users.messages.get({'userId': userId, 'id': result.messages[i].id, 'format': 'metadata'}).execute(function (todo) {
                    todos.push({
                        id: todo.id,
                        subject: todo.payload.headers[12].value,
                        from: todo.payload.headers[10].value,
                        date: todo.payload.headers[15].value,
                        snippet: todo.snippet
                    });
                    
                    if (todos.length == result.messages.length) {
                        deferred.resolve(todos);
                    }
                });
            }
        });
        
        return deferred.promise;
    };
    
    this.loadLabels = function (userId) {
        
        var deferred = $q.defer(),
            request = gapi.client.gmail.users.labels.list({'userId': userId});
        
        request.execute(function (result) {
            deferred.resolve(result.labels);
        });
        
        return deferred.promise;
    };
};
    
GoogleService.$inject = ['$q', 'device'];

module.exports = GoogleService;