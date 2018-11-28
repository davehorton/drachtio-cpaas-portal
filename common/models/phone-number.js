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
            
            await Phonenumber.app.models.Subscriber.findOne(
                {
                    where:{
                        email: email
                    }
                },
                async function(err,instance){
                    if(!err){
                        //get userID
                        let subscriber_id = instance.id;
                        await Phonenumber.find(
                            {
                                where:{
                                    subscriber_id : subscriber_id
                                }
                            },
                            function(err,instance){
                                //result exist
                                if(instance)
                                {
                                    var result = [];
                                    for(let i in instance){
                                        var item = instance[i];
                                        
                                        result.push(item);
                                    }
                                    cb(null,result);
                                }
                            }
                        )
                    }
                }
            )
        })
    }

    Phonenumber.acquireNumber = function(email,number,cb){
        process.nextTick(async function() {
            console.log('acquire number : email '+email+' , number '+number);
            let response = "acquire number "+email+' '+number;
            await Phonenumber.app.models.Subscriber.findOne(
                {
                    where:{
                        email: email
                    }
                },
                async function(err,instance){
                    if(instance){
                        await Phonenumber.create({
                            subscriber_id : instance.id,
                            e164 : number,
                            telecom_id : 1
                        },
                        function(err,instance){
                            console.log(err);
                            console.log(instance);
                            if(!err){
                                response="success";
                                return(response);
                            }
                        });
                    }
                }
            );
            cb(null,response);
        })
    }
};
