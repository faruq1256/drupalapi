import React from 'react';
import ReactDOM from 'react-dom';
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

const App = () => {

return (
  <>
  <Menu />
  <Switch>
  <Route exact path='/' component={Home} />
  <Route exact path='/login' component={Login} />
  <Route exact path='/logout' component={Logout} />
  <Route exact path='/node/add' component={CreateNode} />
  <Route exact path='/node/list' component={ListNodes} />
  <Redirect to="/" />
  </Switch>
  <Footer />
  </>
);
}

export default App;
