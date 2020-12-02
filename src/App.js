import React, { useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Menu from './Menu';
import Home from './Home';
import CreateNode from './CreateNode';
import Login from './Login'
import Logout from './Logout'
import ListNodes from './ListNodes';
import Footer from './Footer';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./auth/auth";

const App = (props) => {
  const existingTokens = localStorage.getItem("token");
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", data);
    setAuthTokens(data);
  }

return (
  <>
  <Menu />
  <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
  <Switch>
  <Route exact path='/' component={Home} />
  <Route exact path='/login' component={Login} />
  <Route exact path='/logout' component={Logout} />
  <PrivateRoute exact path='/node/add' component={CreateNode} />
  <PrivateRoute exact path='/node/list' component={ListNodes} />
  <Redirect to="/" />
  </Switch>
  </AuthContext.Provider>
  <Footer />
  </>
);
}

export default App;
