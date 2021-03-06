import React, { useState } from "react";
import {Redirect} from 'react-router-dom';
import Http from './api/Http';
import { useAuth } from "./auth/auth";


const Login = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();
  const [user, setUser] = useState({
      name: '',
      pass: ''
  });
  const [spinner, setSpinner] = useState(false);

  const InputEvent = (event) => {
      let name = event.target.name;
      let value = event.target.value;
      setUser(
          (preValue) => {
             return {
                ...preValue,
                [name]: value
             }

          }
      );
  }
  const submitEvent = (event) => {
    event.preventDefault();
    setSpinner(true);
    console.log(user);
    const {name, pass} = user;

    async function getLogin() {
      
        const data = {'name':name, 'pass':pass}
        const res = await Http.post(`/user/login?_format=json`, data)
    .then((res) => {
 
      console.log("RESPONSE RECEIVED: ", res.data);
      const basicAuthCredential = window.btoa(name + ":" + pass);
      localStorage.setItem("token", basicAuthCredential);
      localStorage.setItem("csrf", res.data.csrf_token); 
      setAuthTokens(res.data); 
      setLoggedIn(true);
      // props.history.push('/node/add');
     })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });

    }

    return getLogin();
    
  };

  if (isLoggedIn) {
    return <Redirect to="/node/add" />;
  }

  return (
    <>
      <div className="my-5">
        <h1 className="text-center">Login Page</h1>
      </div>

      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 max-auto max_auto">
            <div className="row">
              <form onSubmit={submitEvent}>
                <div className="form-group">
                  <label >User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={user.name}
                    onChange={InputEvent}
                    aria-describedby="emailHelp"
                    placeholder="Enter username"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input
                    type="password"
                    name='pass'
                    value={user.pass}
                    onChange={InputEvent}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                { (spinner) ? <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div> : ''
                  
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
