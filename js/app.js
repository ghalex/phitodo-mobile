/*jslint vars: true, plusplus: true, white: true */
/*global require, module, Framework7, Dom7, console, cordova, phonegap, $ */

(function () {
    'use strict';
    
    var PROJECT_ID      = 'todo-gmail-1986',
        CLIENT_ID       = '1070900723620-n6pf5q8ha6tfart5rkr6eaavqf1cvu7e.apps.googleusercontent.com',
        CLIENT_SECRET   = 'RL4Y12AkuDlr3wiQ3BzoNKrO',
        API_KEY         = 'AIzaSyCEbDkQOJR626_SWtkpZM1ridtbossk40Y',
        API_KEY_ANDROID = 'AIzaSyCZbZTd4-gStEiCUys-6mai6-atO0yRZKU',
        REDIRECT_URI    = 'http://localhost';
    
    var App = {

        /**
         * App constructor
         */
        initialize: function () {
            this.bindEvents();
        },

        initFramework7: function () {
            this.f7 = new Framework7();
            this.mainView = this.f7.addView(".view-main");
        },

        isPhonegap: function () {
            return (typeof (cordova) !== 'undefined' || typeof (phonegap) !== 'undefined');
        },
        
        /**
         * Bind Event Listeners
         * 
         * Bind any events that are required on startup. Common events are:
         * 'load', 'deviceready', 'offline', and 'online'.
         */
        bindEvents: function () {

            if (this.isPhonegap()) {
                document.addEventListener('deviceready', this.onDeviceReady, false);
            } else {
                window.onload = this.onDeviceReady();
            }
        },

        onDeviceReady: function () {
            App.deviceReady();
        },
        
        phonegapAuthorize: function () {
            
            var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
                client_id: CLIENT_ID,
                redirect_uri: REDIRECT_URI,
                response_type: 'code',
                scope: "https://www.googleapis.com/auth/gmail.readonly"
            });
            
            //Open the OAuth consent page in the InAppBrowser
            var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');
            
            $(authWindow).on('loadstart', function(e) {
                
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
                    }).done(function(data) {
                        
                        //alert(JSON.stringify(data));
                        
                        gapi.client.setApiKey(API_KEY_ANDROID);
                        gapi.auth.setToken(data);
                        
                        App.authComplete();
                                                
                    });
                } else if (error) {
                    App.authError();
                }
            });
            
        },
        
        browserAuthorize: function () {
            
            gapi.client.setApiKey(API_KEY);
            gapi.auth.authorize({
                client_id: CLIENT_ID,
                scope: "https://www.googleapis.com/auth/gmail.readonly",
                immediate: false
            }, 
            function(authResult) {
                if (authResult && !authResult.error) {
                    App.authComplete();
                } else {
                    App.authError();
                }
            });
        },
        
        authComplete: function () {
            
            gapi.client.load('gmail', 'v1', function () {
                gapi.client.gmail.users.labels.list({"userId": "ghalex@gmail.com"}).execute(function (resp) {

                    $("#login p").html(resp.labels[0].name);
                    //alert(JSON.stringify(resp));
                });                
            })
        },
        
        authError: function () {
            $("#login p").html("auth error");
        },
        
        deviceReady: function (event) {
            
            this.initFramework7();

            $("#login a").on('click', $.proxy(function () {

                if (this.isPhonegap()) {
                    this.phonegapAuthorize();
                } else {
                    this.browserAuthorize();
                }

            }, this));
        }
    };

    App.initialize();
    
}());