export default function getNewAccessToken(){
    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://cors-anywhere.herokuapp.com/https://cpaas.auth0.com/oauth/token',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'Access-Control-Allow-Origin'
        },
        body: '{"client_id":"xWi1AeIjAuUdfSKM1lqVeeHpYwYzjf5l","client_secret":"wj_UYsT8hZNaXBk7ZdqROjwHLvfXpUhUUPG8uw-x69jDPpyAQ0N2QuTtQtIQAeXN","audience":"cpaas","grant_type":"client_credentials"}' 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        if(body){
            let data = JSON.parse(body);
            console.log(data);
            console.log(data.access_token)
            sessionStorage.setItem('cpaas-token',data.access_token);
        }
    });
}