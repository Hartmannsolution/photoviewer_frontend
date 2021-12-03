import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';

import TagSelect from './TagSelect';
import utils from '../utils';
import properties from '../properties';
// ############################## MODALS DEMO COMPONENT ###################################
const Main = (props) => {

  return (
    <>
      <MyModal
        show={props.modalShow}
        onHide={() => props.setModalShow(false)}
        image={props.image}
        updateImages={props.updateImages}
        baseUrl={props.baseUrl}
        setModalShow={props.setModalShow}
        loggedIn={props.loggedIn}
        logout={props.logout}
        setNextImage={props.setNextImage}
      />
    </>
  );
};
// ################################# MYMODAL COMPONENT #################
const MyModal = (props) => {
  const [image, setImage] = useState(props.image);
  const [options, setOptions] = useState([]);

  /**
   * 
   * @param {string} name 
   * @returns The location of the image in large resolution.
   */
  const getLargeLocation = (name) => {
    return name.replace('TN', 'WEB');
  };

  useEffect(() => {
    const large = getLargeLocation(props.image.location + props.image.name);
    setImage({ largeLocation: large, ...props.image });
    // fetch the tags to choose from
    utils.fetchAny(`${properties.cloudURL}tag`, data => {
      const tags = data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setOptions(tags.map(tag => { return { value: tag.name, label: tag.name } })); //convert tags to options for the dropdown
    });
  }, [props.image]);

  /**
   * 
   * @param {input element event} evt 
   * Updates the image with the new information as it is entered into the form elements.
   */
  const handleChange = (evt) => {
    setImage({ ...image, [evt.target.id]: evt.target.value });
    console.log(evt.target, 'VALUE: ', evt.target.value, ' ID: ', evt.target.id);
  }

  /**
   * Updates current image on server
   */
  const updateImage = () => {
    if (image.name) {
      delete image.largeLocation;
      //TODO: add logout to below statment
      utils.fetchAny(`${properties.cloudURL}photo/${image.name}`,
        (response) => {

          props.updateImages(image);
          console.log('PUT response: ', response);
        },
        'PUT',
        true,
        image,
        props.logout);
      console.log('UPDATE', image);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    updateImage();
    props.setModalShow(false);
  }

  /**
   * Update image on server and then loads the next image into the modal. 
   */
  const handleNext = () => {
    updateImage();
    props.setNextImage();
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
              {props.image.title ? image.title : props.image.name.split('_').slice(0, -1).join('')}

            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <img src={image.largeLocation} className="img-centered" alt="" />
              {props.loggedIn ?

                <ImageForm
                  handleSubmit={handleSubmit}
                  image={image}
                  handleChange={handleChange}
                  setImage={setImage}
                  options={options}
                  handleNext={handleNext}
                  clickNext={props.setNextImage}
                />
                :
                <ImageInfo image={image} />}

            </Container>
          </Modal.Body>
          {/* <Modal.Footer><Button onClick={props.onHide}>Close</Button> </Modal.Footer> */}
        </>}
    </Modal>
  );
}

export { Main as default, MyModal };

// ################### IMAGE INFO COMPONENT (Not logged in) #########################
const ImageInfo = ({ image }) => {
  const [tag, setTag] = useState(undefined);
  console.log('tag: ', tag);
  return (<>
    <h2>{image.title ? image.title : image.name}</h2>
    <p>{image.description}</p>
    <p>{image.tags && image.tags.map((tag, idx) => <span key={idx}>{idx > 0 && ", "}<Tag name={tag.name} handleClick={() => setTag(tag)} /></span>)}</p>
    <p>{tag && tag.name + ': '}{tag && tag.description ? tag.description : ''}</p>
  </>);
}

// ################### TAG COMPONENT #####################
const Tag = ({ name, handleClick }) => {
  return (<span onClick={handleClick} style={{ color: 'blue' }}>
    {name}
  </span>);
}

// ################### IMAGE FORM COMPONENT (when logged in) #########################
const ImageForm = ({ handleSubmit, image, handleChange, options, handleNext }) => {

  /**
   * Set focus on title input field when form is loaded. (see: https://stackoverflow.com/questions/58830133/autofocus-on-input-when-opening-modal-does-not-work-react-bootstrap).
   */
  const innerRef = useRef();
  const [tags, setTags] = useState(image.tags);
  useEffect(
    () => innerRef.current && innerRef.current.focus()
    , []);

  /**
   * Connect the chosen tags to the current image whenever tags changes.
   */
  useEffect(() => {
    image.tags = tags;
  }, [tags]);
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
            <TagSelect isMulti tags={tags} setTags={setTags} options={options} />
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
        </Button><span> </span>
        <Button variant="primary" type="button" onClick={handleNext} >
          Submit and next
        </Button>
      </Form>
      <hr />
    </>
  );
}



// ################### END #################