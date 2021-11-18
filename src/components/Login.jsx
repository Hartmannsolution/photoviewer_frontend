import { useState } from "react";
import { Button, Form} from 'react-bootstrap';

const LogIn = ({ login }) => {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    console.log('Credentials: ',loginCredentials);
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  }

  return (
    <Form className='d-flex' onChange={onChange}>
      <Form.Control size="sm" placeholder="User Name" id="username" />
      <Form.Control size="sm" placeholder="Password" id="password" />
      <Button variant="outline-light" size="sm" onClick={performLogin}>Login</Button>
    </Form>
  )
}

export default LogIn;