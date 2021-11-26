import { Modal, Container, Row, Col, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import CreatableSelect from 'react-select/creatable';
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
        setNextImage={props.setNextImage}
      />
    </>
  );
};
// ################################# MYMODAL COMPONENT #################
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
      const tags = data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setTags(tags.map(tag => { return { value: tag.name, label: tag.name } })); //convert tags to options for the dropdown
    });
  }, [props.image]);

  const handleChange = (evt) => {
    setImage({ ...image, [evt.target.id]: evt.target.value });
  }
  const updateImage = () => {
    if (image.name) {
      delete image.largeLocation;
      console.log('IMAGE before submit: ', JSON.stringify(image));
      const postUrl = `${properties.cloudURL}photo`;
      console.log(postUrl);
      utils.fetchAny(`${properties.cloudURL}photo/${image.name}`, (response) => { console.log('PUT response: ', response); }, 'PUT', true, image);
      props.updateImages(image);
      
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    updateImage();
    props.setModalShow(false);
  }
const handleNext = (evt) => {
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
              {props.image.title ? image.title : image.name}

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
                  tags={tags}
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
const ImageForm = ({ handleSubmit, image, handleChange, setImage, tags, handleNext}) => {
  const innerRef = useRef();
  useEffect(
    () => innerRef.current && innerRef.current.focus()
    , []); // to set focus on title input field (see: https://stackoverflow.com/questions/58830133/autofocus-on-input-when-opening-modal-does-not-work-react-bootstrap).
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
        </Button><span> </span>
        <Button variant="primary" type="button" onClick={handleNext} >
          Submit and next
        </Button>
      </Form>
      <hr />
    </>
  );
}

// ################### MY SELECT COMPONENT #########################
const MySelect = ({ isMulti, image, setImage, items }) => {
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
      key={image.tags} //needed to get a rerender to show the tags for some reason
    />
  );
};

// ################### END #################