'use strict';
var async = require('async');

var availablePhoneNumbers = require('../available-phone-numbers');

module.exports = function(Phonenumber) {
    Phonenumber.getAvailableNumbers = function(cb) {
        process.nextTick(async function() {
            cb(null,availablePhoneNumbers);
        });
    }

    Phonenumber.getMyNumbers = function(email,cb){
        process.nextTick(async function() {
            console.log('get my numbers via '+email);
            cb(null, 'get my numbers via ' + email);
        })
    }

    Phonenumber.acquireNumber = function(email,number,cb){
        process.nextTick(async function() {
            console.log('acquire number : email '+email+' , number '+number);
            cb(null,'acquire number : email '+email+' , number '+number);
        })
    }
};
