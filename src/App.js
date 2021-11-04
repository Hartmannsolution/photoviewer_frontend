import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Button} from 'react-bootstrap';
import ShowImages from './components/showimages/ShowImages';
import config from './properties';
import {
  Switch,
  Route,
  useLocation,
  NavLink
} from "react-router-dom";

import utils from "./utils";
import LogIn from "./components/Login";


const LoggedIn = () => {
  const [user, setUser] = useState("");
  
  useEffect(() => { 
    // utils.fetchAny('info/user',setDataFromServer,'GET',true);
    const token = utils.getToken();
    try {
      const content = JSON.parse(atob(token.split('.')[1])); //Skip first and last part of token (algorithm and issuer)
      // const content = JSON.parse(token.split('.')[1].toString()); //Skip first and last part of token (algorithm and issuer)
      console.log(content);
      setUser(content.username+' ')
      // set();
    } catch (e) {
      return null;
    }
  }, []);
 
  return (
    <>
      {user}
    </>
  );
}
const Header = ({login,loggedIn,logout}) => <ul className="header">
  <li className="headeritem"><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
  <li className="headeritem"><NavLink activeClassName="active" to="/joergensen">Joergensen</NavLink></li>
  <li className="login">{
  !loggedIn ? (<LogIn login={login} />) :
        (<div>
          <LoggedIn />
          <Button variant="outline-light" size="sm" onClick={logout}>Logout</Button>
        </div>)
  }</li>
</ul>;
const Home = () => {
  return (
    <div>
    <h2>Photo collection site</h2>
    <p>This is a site for showing images with text for different family photo collections. Each collection has its own tab.</p>
    </div>
  );
}
const NoMatch = () => {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code> {location.pathname} </code>
      </h3>
    </div>
  );
}

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const logout = () => { utils.logout(); } 
  const login = (user, pass) => {
  utils.login(user,pass)
.then(res =>setLoggedIn(true));
// setLoggedIn(true);
} 
  return (
    <div>
      <Header login={login} loggedIn={loggedIn} logout={logout}/>
      <Switch>
        <Route exact path="/">
          <Home msg="Home" />
        </Route>
        <Route path="/joergensen">
          <ShowImages baseUrl={config.cloudURL} locationUrl={config.locationPart} set="joergensen"/>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
