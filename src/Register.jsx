import React, { useState} from 'react'
import Http from './api/Http';

const Register = (props) => {
    const [user, setUser] = useState({
        name: '',
        mail: '',
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
        const {name, pass, mail} = user;
    
        async function doRegister() {
          
            const data = {
                _links: {
                    type: {
                      href: `http://janari.in/drupal/rest/type/user/user`,
                    },
                  },
                "name": [{ "value": name }],
                "mail": [{ "value": mail }],
                "pass": [{ "value": pass }],
              }
            const res = await Http.post(`/user/register?_format=json`, data)
        .then((res) => {
     
          console.log("RESPONSE RECEIVED: ", res.data);
          setSpinner(false);
          props.history.push('/login');
        //   const basicAuthCredential = window.btoa(name + ":" + pass);
        //   localStorage.setItem("token", basicAuthCredential);
        //   localStorage.setItem("csrf", res.data.csrf_token); 
          // props.history.push('/node/add');
         })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
          setSpinner(false);
        });
    
        }
    
        doRegister();
        
      };

    return (
        <>
        <div className="my-5">
        <h1 className="text-center">Register Page</h1>
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
                  <label >Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="mail"
                    value={user.mail}
                    onChange={InputEvent}
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
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
}

export default Register;