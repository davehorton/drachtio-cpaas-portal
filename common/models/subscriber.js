'use strict';
const bcrypt = require('bcryptjs');
const md5 = require('md5');

module.exports = function(Subscriber) {
    Subscriber.login = function(email,pwd, cb) {
        console.log(email,pwd);
        process.nextTick(async function() {
            var response = "";
            console.log('log in data is ',email,' ',pwd);
            await Subscriber.findOne(
                {
                    where:{
                        email: email
                    }
                },
                function(err,userInstance){
                    console.log(err);
                    console.log(userInstance);
                    if(userInstance == null || err != undefined){
                        //login failed
                        response = "failed";
                    }
                    else{
                        var u_pwd = userInstance.pwd;
                        console.log(u_pwd);
                        let result = bcrypt.compareSync(pwd,u_pwd);
                        if(result == true)
                            response = "successed";
                        else
                            response = "failed";
                    }
                    cb(null,response);
                }
            );
        });
    };

    Subscriber.signup = function(email,pwd, cb) {
        process.nextTick(async function() {
            var response = "";
            response = "try to sign up : "+email+" "+pwd;
            await Subscriber.findOne({where:{email:email}},function(err,userInstance){
                console.log(err);
                console.log(userInstance);
                if(userInstance == null || err != undefined){
                    //doesn't exist
                    let confirmURL = md5(new Date());
                    console.log('confirm url is ',confirmURL);

                    let data = {
                        email : email,
                        pwd : pwd,
                        confirm_url : confirmURL
                    }
                    Subscriber.create(data,function(err,userInstance){
                        console.log('err : ',err);
                        console.log('data : ', userInstance);
                        if(userInstance){
                            let emailText = 'CPAAS Thanks for your registration. To activate your account please click here.<br>Click this link '+Subscriber.app.get('url').replace(/\/$/, '')+'/verify/'+confirmURL+' Or Copy the following link';
                            Subscriber.app.models.Email.send({
                                to: email,
                                from: 'noreply@cpaas.com',
                                subject: 'Confirm your email',
                                text: 'CPAAS Thanks for your registration. To activate your account please click here.<br>Click this link http://localhost:3001/verify/'+confirmURL+' Or Copy the following link'
                            }, function(err, mail) {
                                console.log('email sent!');
                                console.log(mail);
                            });
                            response = "successed";
                        }
                        else
                            response = "failed";
                    })
                }
                else{
                    response = "exist";
                }
                cb(null,response);
            });
        });
    };

    Subscriber.verifyEmail = function(url, cb){
        process.nextTick(async function(){
            await Subscriber.findOne({
                where : {
                    confirm_url : url
                }
            },function(err,instance){
                console.log(instance);
                let result = ""
                if(instance)
                {
                    instance.status = "ACTIVE";
                    instance.confirm_url = "";
                    Subscriber.replaceById(instance.id, instance, function(err, instance){
                        
                    })
                    result = {
                        exist : true,
                        data : instance
                    };
                }
                else
                    result = {
                        exist : false
                    };
                cb(null,result);
            })
        })
    }

    Subscriber.signupWithThirdParty = function(email,name,social, cb) {
        process.nextTick(async function() {
            var response = "successed";
            await Subscriber.findOne({where:{email:email}},function(err,userInstance){
                console.log(err);
                console.log(userInstance);
                if(userInstance == null || err != undefined){
                    //doesn't exist
                    let data = {
                        email : email,
                        name : name,
                        status : 'ACTIVE',
                        third_party_connect : social
                    }
                    Subscriber.create(data,function(err,userInstance){
                        console.log('err : ',err);
                        console.log('data : ', userInstance);
                        if(!err){
                            console.log('sign up successed');
                            response = "successed";
                        }
                        else
                            response = "failed";
                    })
                }
                else{
                    response = "exist";
                }
                cb(null,response);
            });
        });
    };

    Subscriber.getMyInfo = function(email, cb){
        process.nextTick(async function(){
            Subscriber.findOne(
                {
                    where : {
                        email : email
                    }
                },
                function(err,instance){
                    console.log(instance);
                    let response = {};
                    if(instance){
                        response.email = instance.email;
                        response.name = instance.name;
                        response.current_plan = "Free Trial Plan";
                        response.subscriberID = instance.id;
                    }
                    cb(null,response);
                }
            )
        })
    }

    Subscriber.addMyNumber = function(email, number, cb){
        process.nextTick(async function(){
            Subscriber.findOne(
                {
                    where : {
                        email : email
                    }
                },
                function(err,instance){
                    console.log(instance);
                    if(instance){
                        instance.my_number = number;
                        console.log('try to change my number '+email+' '+number);
                        Subscriber.replaceById(instance.id, instance, function(err, instance){
                            if(instance)
                                cb(null, "successed");
                        })
                    }
                }
            )
        })
    }
    Subscriber.getMyNumber = function(email, cb){
        process.nextTick(async function(){
            Subscriber.findOne(
                {
                    where : {
                        email : email
                    }
                },
                function(err,instance){
                    console.log(instance);
                    if(instance){
                        cb(null,instance.my_number);
                    }
                }
            )
        })
    }
};
  

