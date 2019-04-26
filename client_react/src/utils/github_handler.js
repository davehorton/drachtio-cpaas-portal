import axios from 'axios';
import {subscriberApiUrl} from '../constant';
import {login} from './login';

export default function(successFn, obj) {

  console.log(`github access code: ${obj.code}`);

  let email, password;

  // (1) exchange code for a github access token
  // (2) use github access token to get user info from github (name and email)
  // (3) create a new subscriber
  // (4) log in the subscriber and get an access token to use in the portal
  axios.get(subscriberApiUrl + 'github_access_token', {params: {code: obj.code}})
    .then((res) => res.data.access_token)
    .then((accessToken) => axios.get('https://api.github.com/user?access_token=' + accessToken))
    .then((res) => {
      email = res.data.email;
      password = '' + res.data.id;
      let first, last;
      const arr = /^(.*)\s+(.*)$/.exec(res.data.name);
      if (arr) {
        first = arr[1];
        last = arr[2];
      }
      return axios.post(subscriberApiUrl+'signup_with_social', {
        email,
        password,
        social: 'github',
        first, 
        last
      });
    })
    .then((response) => {
      console.log('successfully signed up, data is', response.data);
      if(['success', 'exist'].includes(response.data.status)) {
        login(email, password )
          .then((accessToken) => {
            if (successFn) {
              successFn({email, accessToken, social: 'github', password});
            }
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.status === 401) {
                return console.log('TODO: subscriber with that email and different password/id provider already exists in the database');
              }
            }
            console.log(`Error logging in ${err}`); 
          });
    }
  })
    .catch((err) => {
      console.error(`error trying to get access token from github: ${err}`);
    });
};
