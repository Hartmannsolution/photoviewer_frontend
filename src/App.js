import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import ShowImages from './components/showimages/ShowImages';
import config from './properties';
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { withRouter } from "react-router";

import utils from "./utils";
import LogIn from "./components/Login";


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
  const logout = () => { utils.logout(setLoggedIn); }
  const login = (user, pass) => {
    utils.login(user, pass, setLoggedIn);
  }
  return (
    <div>
      <Header login={login} loggedIn={loggedIn} logout={logout} />
      <Switch>
        <Route exact path="/">
          <Home msg="Home" />
        </Route>
        <Route path="/joergensen">
          <ShowImages baseUrl={config.cloudURL} locationUrl={config.locationPart} set="joergensen" />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
};

const Header2 = ({ loggedIn, login, logout, location }) => {
  console.log('LOOGED IN: ', loggedIn);
  console.log('location: ', location);
  return (
    <Navbar bg="dark" variant="dark"> {/* expand="lg"> */}
      <Container>
        <Navbar.Brand href="/">Photo Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={`/familyphotos${location.pathname}`} className="mr-auto">
          {/* <Nav className="me-auto" className="mr-auto"> */}
            <Nav.Link href="/familyphotos/">Home</Nav.Link>
            <Nav.Link href="/familyphotos/joergensen">Joergensen</Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
          </Nav>
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
//TODO: Find out why this causes a total page reload.

const Header = withRouter(Header2);
// const Header = Header2;
export default App;
