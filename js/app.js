/*jslint vars: true, plusplus: true, white: true */
/*global require, module, Framework7, Dom7, console, cordova, phonegap, $ */

(function () {
    'use strict';
    
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
            App.receivedEvent('deviceready');
        },
        
        authorize: function (options) {
            
            var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
                client_id: options.client_id,
                redirect_uri: options.redirect_uri,
                response_type: 'code',
                scope: options.scope
            });
            
            //Open the OAuth consent page in the InAppBrowser
            var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');
            
            $(authWindow).on('loadstart', function(e) {
                
                var url = e.originalEvent.url;
                var code = /\?code=(.+)$/.exec(url);
                var error = /\?error=(.+)$/.exec(url);

                if (code || error) {
                    //Always close the browser when match is found
                    authWindow.close();
                }

                if (code) {                    
                    
                    $.post('https://accounts.google.com/o/oauth2/token', {
                        code: code[1],
                        client_id: options.client_id,
                        client_secret: options.client_secret,
                        redirect_uri: options.redirect_uri,
                        grant_type: 'authorization_code'
                    }).done(function(data) {
                        $("#login p").html("OAuth code: " + data.access_token);
                    });
                } else if (error) {
                    $("#login p").html("OAuth error....");
                }
            });
            
        },
        
        receivedEvent: function (event) {
            
            switch (event) {

                case 'deviceready':
                    
                    this.initFramework7();
                    
                    $("#login a").on('click', $.proxy(function () {
                        
                        this.authorize({
                            client_id: "1070900723620-n6pf5q8ha6tfart5rkr6eaavqf1cvu7e.apps.googleusercontent.com",
                            client_secret: "RL4Y12AkuDlr3wiQ3BzoNKrO",
                            redirect_uri: 'http://localhost',
                            scope: 'https://www.googleapis.com/auth/gmail.readonly'
                        });
                        
                    }, this));
                    
                    break;
                    
            }
        }
    };

    App.initialize();
    
}());