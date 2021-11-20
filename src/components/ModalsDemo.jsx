//npm install react-bootstrap@next bootstrap@5.1.1
import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import utils from '../utils';
import properties from '../properties';
const Main = (props) => {
  return (
    <>
      <MyModal show={props.modalShow} onHide={() => props.setModalShow(false)} image={props.image} updateImages={props.updateImages} baseUrl={props.baseUrl} setModalShow={props.setModalShow} />
    </>
  );
};

const MyModal = (props) => {
  const [image, setImage] = useState(props.image);
  const [tags, setTags] = useState([]);

  const getLargeLocation = (name) => {
    return name.replace('TN', 'WEB');
  };


  useEffect(() => {
    const large = getLargeLocation(props.image.location + props.image.name);
    setImage({ largeLocation: large, ...props.image });
    utils.fetchAny(`${properties.cloudURL}tag`, data => {
      setTags(data.map(tag => { return { value: tag.name, label: tag.name } })); //convert tags to options for the dropdown
    });
  }, [props.image]);

  const handleChange = (evt) => {
    setImage({ ...image, [evt.target.id]: evt.target.value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //TODO: set updated image back in collection (so when clicking image again changes will show).
    if (image.name) {
      delete image.largeLocation;
      console.log('IMAGE before submit: ',JSON.stringify(image));
      const postUrl = `${properties.cloudURL}photo`;
      console.log(postUrl);
      utils.fetchAny(`${properties.cloudURL}photo/${image.name}`, (response) => { console.log('PUT response: ',response); }, 'PUT', true, image);
      props.updateImages(image);
      props.setModalShow(false);
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
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
              {props.image.name}
              {image.tags.map(tag=>' : '+tag.name)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <img src={image.largeLocation} className="img-centered" alt="" />
              <ImageForm handleSubmit={handleSubmit} image={image} handleChange={handleChange} setImage={setImage} tags={tags} />
            </Container>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
        </>}
    </Modal>
  );
}

export { Main as default, MyModal };

const ImageForm = ({ handleSubmit, image, handleChange, setImage, tags }) => {
  
  const innerRef = useRef();
  useEffect(() => innerRef.current && innerRef.current.focus()); // to set focus on title input field (see: https://stackoverflow.com/questions/58830133/autofocus-on-input-when-opening-modal-does-not-work-react-bootstrap).
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">

          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control ref={innerRef} type="text" value={image.title || ''} placeholder="Enter Title" onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="viewno">
            <Form.Label>View No</Form.Label>
            <Form.Control type="text" value={image.viewno || ''} placeholder="Change the view no" onChange={handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="my_multiselect_field">
            <Form.Label>Tags</Form.Label>
            <MySelect isMulti image={image} setImage={setImage} items={tags} />
          </Form.Group>

        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={image.description || ''} placeholder="Enter description" onChange={handleChange} />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <hr />
    </>
  );
}

const MySelect = ({isMulti,image, setImage, items}) => {
  const selectedTags = image.tags.map(tag => { return { label: tag.name, value: tag.name } });
  
  return (
    <CreatableSelect
      isMulti={isMulti}
      onChange={evt => { 
        //onChange callback (in react-select CreateableSelect component) automatically updates a selected array with: [{value: "My Tag", label: "My Tag"}]
        image.tags = evt.map(el => { return { name: el.label } });
        setImage({ ...image });
      }}
      options={items}
      value={selectedTags}
      key= {image.tags} //needed to get a rerender to show the tags for some reason
    />
  );
};