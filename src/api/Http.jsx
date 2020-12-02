import axios from 'axios';


const Http = axios.create({
  baseURL: "http://janari.in/drupal",
  headers : {
    'Content-Type' : 'application/hal+json',
    'Accept':'application/json',
    'X-CSRF-Token': localStorage.getItem('csrf')
  }
});


Http.interceptors.request.use((config) =>{
  let token = localStorage.getItem('token');
  let csrfToken = localStorage.getItem('csrf');
  
  if(token){
    console.log("Interceptors..." + token);
    config.headers.Authorization = `Basic ${token}`;
    // config.withCredentials = true; 
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});


Http.interceptors.response.use((config) =>{
  // console.log("Config Response" + JSON.stringify(config));
//   if(config.status == 403){
//     props.history.push('/login');
//  }
  return config
});

// const formatBasicAuth = (props) => {
//   return basicAuthCredential = window.btoa(props.name + ":" + props.pass);
// }


export default Http;
