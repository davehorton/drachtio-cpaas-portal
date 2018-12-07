import axios from 'axios';
import {subscriberApiUrl} from '../../constant';
import {login} from '../../utils/login';

export default function(successFn, googleUser) {
  const googleId = googleUser.getId();
  const id_token = googleUser.getAuthResponse().id_token;
  const profile = googleUser.getBasicProfile();
  const first = profile.getGivenName();
  const last = profile.getFamilyName();

  console.log(googleUser);
  console.log('googleId: ' + googleId);
  console.log('id_token: ' + id_token);
  console.log('profile: ' + JSON.stringify(profile));

  let email = googleUser.w3.U3;
  if(!email){
      console.log('fail');
  }
  else {
      console.log('success');
      console.log('try to sign up with google account');
      let data = {
        email : email,
        social : "google",
        password: googleId,
        first,
        last
      };
      axios.request({
        method : 'post',
        url : subscriberApiUrl+'signup_with_social',
        data : data
      }).then(response => {
        console.log('data is',response.data);
        if(['success', 'exist'].includes(response.data.status)) {
          login(email, googleId )
            .then((accessToken) => {
              if (successFn) {
                successFn({email, accessToken, social: 'google', password: googleId});
              }
            });
        }
      });
    }
};
