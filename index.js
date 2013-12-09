
// We need this to build our post string
var https = require('https');
var fs = require('fs');
var request = require('request');
var jar = request.jar();

login();


function login(username, password) {
    
    var login_data = '{"username": "' + username + '","password":"' + password + '"}';

    request({
            uri: "https://www.hivehome.com/login",
            jar: jar,
            json: true,
            method: "POST",
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': login_data.length,
                'X-Requested-With': 'XmlHttpRequest'
            },
            body: login_data
        }, function(error, response, body) {
            console.log('error: ' + error);
            console.log('response: ' + response);
            console.log('body: ' + body);
         
        });
}

function getTarget() {
    request({
            uri: "https://www.hivehome.com/myhive/heating/target",
            jar: jar,
            cookie: jar,
            method: "GET",
            timeout: 10000,
            followRedirect: true,
            maxRedirects: 10,
            headers: {
                'X-Requested-With': 'XmlHttpRequest'
            }
        }, function(error, response, body) {
            console.log('error: ' + error);
            console.log('response: ' + response);
            console.log('body: ' + body);
        });

}
