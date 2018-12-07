import axios from 'axios';
import {subscriberApiUrl} from '../constant';


export function login(email, password) {
  return axios.request({
    method: 'post',
    url: subscriberApiUrl + '/login',
    data: {
      email,
      password
    }
  }).then(res => {
    console.log('subscriber log in res', res);
    return res.data.id;
  });  
}