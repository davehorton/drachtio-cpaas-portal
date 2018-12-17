const bcrypt = require('bcryptjs');
const md5 = require('md5');
const config = require('config');
const axios = require('axios');

module.exports = function(Subscriber) { 

    Subscriber.signup = function(email,pwd, cb) {
        var response = "";
        response = "try to sign up : "+email+" "+pwd;
        Subscriber.findOne({where:{email:email}},function(err,userInstance){
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
    };

    Subscriber.verifyEmail = function(url, cb){
        Subscriber.findOne({
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
    }

    Subscriber.signupWithSocial = function(email, social, password, first, last, cb) {
      Subscriber.findOne({
        where: {
          email 
        }}, (err, userInstance) => {
          if (err) return cb(err);

          if(!userInstance) {
              let data = {
                  email,
                  social_id_provider: social,
                  password,
                  first,
                  last
              }
              Subscriber.create(data, (err, userInstance) => {
                if (err) return cb(err);
                console.log('successsfully inserted subscriber', userInstance);
                cb(null, 'success');
              })
          }
          else return cb(null, 'exist');
      });
    };

  Subscriber.getGithubAccessToken = function(code, cb) {
    // exchange code for access token
    axios.post('https://github.com/login/oauth/access_token', {
      client_id: config.get('github.client_id'),
      client_secret: config.get('github.client_secret'),
      code: code
    })
      .then((res) => {
        const arr = /access_token=(.*)&scope/.exec(res.data);
        if (arr) {
          const token = arr[1];
          console.log(`received access token ${token}`);
          return cb(null, token);
        }
        cb(new Error(`error parsing github response: ${res.data}`));
      })
      .catch((err) => {
        console.error(`error trying to get access token from github: ${err}`);
        cb(err);
      });
    };
};
  

