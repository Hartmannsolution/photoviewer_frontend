//npm install react-bootstrap@next bootstrap@5.1.1
import {Modal, Container, Row, Col, Button, Form} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import utils from '../utils';
const Main = (props) => {
  return (
    <>
      <MyModal show={props.modalShow} onHide={() => props.setModalShow(false)} image={props.image}/>
    </>
  );
};

const MyModal = (props) => {

  const getLargeLocation = (name) => {
    const large = name.replace('TN','WEB');
    console.log('LARGE',large);
    return large;
  };
  const [image, setImage] = useState(props.image);
  
  useEffect(()=>{
    console.log('USEEFFECT',image);
    const large = getLargeLocation(props.image.location+props.image.name);
    setImage({largeLocation:large,...props.image});
  },[props.image]);
  
  const handleChange = (evt) => {
      // if(evt.target.type === 'radio'){
      //     setState({...state, [evt.target.name]:evt.target.id});
      // }
      // else if (evt.target.type === 'checkbox')
      //     setState({ ...state, [evt.target.id]: evt.target.checked });
      // else
          setImage({...image, [evt.target.id]: evt.target.value });
  }

  const handleSubmit = (evt) => {
      evt.preventDefault();
      if (image.name && image.description) {
        utils.fetchAny(props, (response)=>{console.log(response);}, 'POST',true, image);
        props.setModalShow(false);
      }
  }
    return (
      <Modal 
      {...props} // essential for  
      aria-labelledby="contained-modal-title-vcenter" 
      centered //Try these 2 settings out
    // fullscreen
    //backdrop="static" // no longer closes when clicked outside
        //keyboard={false} //escape key wont work
        size="xl"
      >
        {props.image.name && 
        <>
        <Modal.Header closeButton>
        
          <Modal.Title id="contained-modal-title-vcenter">
          {/* {props.image.name.split('_')[1]} */}
          {props.image.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
          <img src={image.largeLocation} className="img-centered" /> 
          <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={image.title} placeholder="Enter Title" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="viewno">
                        <Form.Label>View No</Form.Label>
                        <Form.Control type="text" value={image.viewNo} placeholder="Change the view no" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={image.description} placeholder="Enter full name" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Row>
              <Col xs={12} md={8}>
                .col-xs-12 .col-md-8
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
  <hr/>
            <Row>
                {/* xs is for very small screen size (6 means 18/6 = a column takes up 1/3 of the width). md is medium to large size (4/12) means 1/3 of the space*/}
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </>}
      </Modal>
    );
  }
const FormModal = (props) => {
    console.log('This modal uses grid for layout')
    const emptyState = {'name':'','email':''};
    const [state, setState] = useState({});
    const handleChange = (evt) => {
        if(evt.target.type === 'radio'){
            setState({...state, [evt.target.name]:evt.target.id});
        }
        else if (evt.target.type === 'checkbox')
            setState({ ...state, [evt.target.id]: evt.target.checked });
        else
            setState({ ...state, [evt.target.id]: evt.target.value });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (state.email && state.name) {
            console.log('Got It', state);
        }
        else {
            console.log('Missed it', state);
        }
        // utils.fetchAny(URL, (response)=>{console.log(response);}, 'POST', state);
        setState(emptyState);
        console.log('STATE',state);
    }
    return (
      <Modal 
      {...props} 
      aria-labelledby="contained-modal-title-vcenter" 
    // centered //Try these 2 settings out
    // fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Using Form Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
          <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={state.name} placeholder="Enter full name" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={state.email} placeholder="Enter email" onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  export {Main as default, MyModal, FormModal};