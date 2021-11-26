// ################### IMPORTS #################
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container} from 'react-bootstrap';
import ShowImages from './components/showimages/ShowImages';
import Admin from './components/Admin';
import config from './properties';
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { withRouter } from "react-router";

import utils from "./utils";
import LogIn from "./components/Login";

// ################# LoggedIn Component #################
const LoggedIn = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = utils.getToken();
    try {
      const content = JSON.parse(atob(token.split('.')[1])); // Skip first and last part of token (algorithm and issuer).
      setUser(content.username + ' ')
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
// ################### HOME ###################
const Home = () => {
  return (
    <div>
      <h2>Photo collection site</h2>
      <p>This is a site for showing images with text for different family photo collections. Each collection has its own tab.</p>
    </div>
  );
}
// ################### NOMATCH #################
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
// ################### APP #################
const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(utils.getToken);
  const logout = () => { utils.logout(setLoggedIn); };
  const login = (user, pass) => {
    utils.login(user, pass, setLoggedIn);
  };
  return (
    <div>
      <RouterHeader login={login} loggedIn={loggedIn} logout={logout} />
      <Switch>
        <Route exact path="/">
          <Home msg="Home" />
        </Route>
        {/* %%%%%%%%%%%%%%%%%%%%%%% Joergensen %%%%%%%%%%%%%%%%%%%%%%% */}
        <Route path="/joergensen">
          <ShowImages baseUrl={config.cloudURL} locationUrl={config.locationPart} set="joergensen" loggedIn={loggedIn} />
        </Route>
        {/* %%%%%%%%%%%%%%%%%%%%%%% Admin %%%%%%%%%%%%%%%%%%%%%%% */}
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
};

// ################### HEADER #################
const Header = ({ loggedIn, login, logout, location }) => {
  console.log('LOOGED IN: ', loggedIn);
  console.log('location: ', location);
  return (
    <Navbar bg="dark" variant="dark"> {/* expand="lg"> */}
      <Container>
        <Navbar.Brand href="/">Photo Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* %%%%%%%%%%%%%%%%% Navigation %%%%%%%%%%%%%%%%%%%% */}
          <Nav className="me-auto" activeKey={`/familyphotos${location.pathname}`} className="mr-auto">
            <Nav.Link href="/familyphotos/">Home</Nav.Link>
            <Nav.Link href="/familyphotos/joergensen">Joergensen</Nav.Link>
            {loggedIn && <Nav.Link href="/familyphotos/admin">Admin</Nav.Link>}
          </Nav>

          {/* %%%%%%%%%%%%%%%%% Login %%%%%%%%%%%%%%%%%%%% */}
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {
                !loggedIn ? (<LogIn login={login} />) :
                  (<div>
                    <LoggedIn />
                    <Button variant="outline-light" size="sm" onClick={logout}>Logout</Button>
                  </div>)
              }
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
// TODO: Find out why this causes a reload of page
const RouterHeader = withRouter(Header);

export default App;
