import vanillaAxios from 'axios' ;

let axios = null;

export default function getInstance() { 
  if (null == axios) {
    const token = sessionStorage.getItem('cpaas-access-token');
    if (!token) throw new Error('access token not set!');
    axios = vanillaAxios.create({
      headers: {
        'Authorization': token
      }
    });
  }
  return axios; 
}
