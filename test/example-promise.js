/** section: github, internal
 *  Example
 * 
 *  Github API usage example.
 * 
 *  Copyright 2012 Cloud9 IDE, Inc.
 *
 *  This product includes software developed by
 *  Cloud9 IDE, Inc (http://c9.io).
 *
 *  Author: Mike de Boer <mike@c9.io>
 **/

"use strict";

var Client = require("./../index");
var Promise = require("bluebird");

var github = new Client({
    debug: true,
    version: "3.0.0"
});

github.authenticate({
    type: "basic",
    username: "sonyl",
    password: "xxxxxxxx"
});

var result = github.licenses.getAll({}).
    then(function(result){
        var licRes = [];
        if(result instanceof Array && result.length > 0){
            result.forEach(function(license) {
                licRes.push(github.licenses.get({key: license.key}));
            });
        }
        return Promise.all(licRes);
    }).
    then(function(result){
        if(result instanceof Array && result.length > 0){
            result.forEach(function (license) {
                console.log("GOT license", license.name);
            });
        }
    }).
    catch(function(error) {
        console.log("GOT ERR?", error);
    });



//github.licenses.get({key: "lgpl-3.0"}, function(err, res){
//    console.log("GOT ERR?", err);
//    console.log("GOT RES?", res);
//});


