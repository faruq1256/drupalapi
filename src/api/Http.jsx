import axios from 'axios';


const Http = axios.create({
  baseURL: "http://localhost/examples/drupal8",
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

// acR1Gz5kIly2RPWkP-ZT9xWQaL_mDlMh58ijB6qheZ0
// Basic YWRtaW46YWRtaW4xMjU2JA==

// Http.interceptors.response.use((config) =>{
//   console.log("Config Response" + config);
//   //if(config.status == 200){
//    // setTimeout(() =>{
//      // router.push('/login');
//    // },10000)
//  // }
//   return config
// });

// const formatBasicAuth = (props) => {
//   return basicAuthCredential = window.btoa(props.name + ":" + props.pass);
// }


export default Http;
