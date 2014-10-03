var https = require('https');
var fs = require('fs');
var request = require('request');
var jar = request.jar();


exports.login = function(username, password, callback) {

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
        if (callback) {
            callback(response);
        }
    });
};

exports.getTarget = function(callback) {
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
        if (error == null) {
            callback(JSON.parse(body).target);
        }
    });
};
exports.setTarget = function(target, callback) {
    var target_data = '{"id":1, "target": ' + target + '}';

    request({
        uri: "https://www.hivehome.com/myhive/heating/target",
        jar: jar,
        cookie: jar,
        method: "PUT",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        headers: {
            'X-Requested-With': 'XmlHttpRequest',
            'Content-Type': 'application/json'
        },
        body: target_data
    }, function(error, response, body) {
        if (error == null) {
            callback(JSON.parse(body).target);
        }
    });
};