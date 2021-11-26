// ################### IMPORTS #################
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col, Form } from 'react-bootstrap';
import config from '../properties';
import { Link, useParams } from "react-router-dom";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import utils from "../utils";

// ################### ADMIN #################
const Admin = (props) => {
    let { path, url } = useRouteMatch();
    return (
      <>
        <ul>
          <li><Link to={`${url}/edittags`}>Edit tags</Link></li>
          <li><Link to={`${url}/adduser`}>Add user</Link></li>
        </ul>
        <hr style={{ color: 'blue', height: '5px' }} />
        <Switch>
          {/* <Route exact path={path}>
          <h3>Please select a topic.</h3>
      </Route> */}
          <Route path={`${path}/:topicId`}>
            <Topic />
          </Route>
        </Switch>
      </>
    );
  }
export default Admin;

  // ################### TOPIC COMPONENT for ADMIN #########################
  const Topic = () => {
    let { topicId } = useParams();
    switch (topicId) {
      case 'edittags':
        return <EditTags />;
      case 'adduser':
        return <AddUser />;
        break;
      default:
        return <h2>No such component</h2>;
    }
  }
  
  // ################### EDIT TAG COMPONENT #########################
  const EditTags = () => {
    const [txt, setTxt] = useState("");
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState({ name: '', description: '' });
    const updateTags = () => {
      utils.fetchAny(config.cloudURL + 'tag', (data) => {
        const tags = data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setTags(tags);
      }, 'GET');
    };
    useEffect(() => {
      updateTags();
    }, []);
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      utils.fetchAny(config.cloudURL + 'tag/' + tag.name, (data) => {
        updateTags();
        console.log('svar fra server: ', data);
      }
        , 'PUT'
        , true
        , tag);
    };
    const handleChange = (evt) => {
      setTag({ ...tag, description: evt.target.value })
    };
  
    return (
      <>
        {console.log('TAGTAG:', tag)}
        {tags.map((t, idx) => <span id={t.name} style={{ color: 'blue' }} onClick={() => { setTag(t); }}>{idx > 0 && ', '}{t.name}</span>)}
        <Form onSubmit={handleSubmit}>
          {/* <Row className="mb-3">
                      <Form.Group as={Col} controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" value={state.email} placeholder="Enter email" onChange={handleChange} />
                      </Form.Group> */}
  
          <Row className="mb-3">
            <Form.Group as={Col} controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={tag.description || ''} placeholder="Enter description" onChange={handleChange} />
            </Form.Group>
          </Row>
          {/* </Row> */}
  
  
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" type="reset" onClick={evt => setTag({ name: '', description: '' })}>
            Reset
          </Button>
        </Form>
      </>
    );
  };
  
  //################### ADD USER COMPONENT #########################
  const AddUser = () => <h2>Not implemented yet</h2>;
  
  //TODO: Find out why this causes a total page reload.
  // const Header = Header2;