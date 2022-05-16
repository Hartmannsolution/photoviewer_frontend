// ################### IMPORTS #################
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container} from 'react-bootstrap';
import ShowImages from './components/showimages/ShowImages';
import Admin from './components/Admin';
import Home from './Home';
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
          <Home />
        </Route>
        {/* %%%%%%%%%%%%%%%%%%%%%%% Joergensen %%%%%%%%%%%%%%%%%%%%%%% */}
        <Route path="/joergensen">
          <ShowImages url={config.cloudURL + config.locationPart + "joergensen"} loggedIn={loggedIn} tags={[]} logout={logout} />
        </Route>
        <Route path="/bugelhartmann">
          <ShowImages url={config.cloudURL + config.locationPart + "bugelhartmann"} loggedIn={loggedIn} tags={[]} logout={logout} />
        </Route>
        <Route path="/bendixmadsen">
          <ShowImages url={config.cloudURL + config.locationPart + "bendixmadsen-BMFotoArkiv-Thumbnail"} // dash is replaced with slash on the server to represent sub folders
          loggedIn={loggedIn} tags={[]} logout={logout} />
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
  return (
    <Navbar bg="dark" variant="dark"> {/* expand="lg"> */}
      <Container>
        <Navbar.Brand href="/">Photo Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* %%%%%%%%%%%%%%%%% Navigation %%%%%%%%%%%%%%%%%%%% */}
          <Nav className="me-auto" activeKey={`/familyphotos${location.pathname}`} >
            <Nav.Link href="/familyphotos/">Home</Nav.Link>
            <Nav.Link href="/familyphotos/joergensen">Joergensen</Nav.Link>
            <Nav.Link href="/familyphotos/bugelhartmann">Bugel Hartmann</Nav.Link>
            <Nav.Link href="/familyphotos/bendixmadsen">Bendix Madsen</Nav.Link>
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
