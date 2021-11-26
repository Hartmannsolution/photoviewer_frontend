//npm install react-bootstrap@next bootstrap@5.1.1
import React, { useState, useEffect } from 'react';

// import Accordion from 'react-bootstrap/Accordion';
import { Button, Row, Col, Form } from 'react-bootstrap';
// import config from './properties';
// import { Link } from "react-router-dom";
// import {
//   Switch,
//   Route,
//   useLocation,
//   useRouteMatch
// } from "react-router-dom";
// import { withRouter } from "react-router";
// import utils from "./utils";

// const url = '';
// export default (props) => {
//     const handleSubmit = () => { };
//     const handleChange = () => { };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//                 <InputGroup id="title" label="TITEL" value={ } onChange={ } />
//                 <InputGroup id="view" label="view no" value={ } onChange={ } />
//                 <InputSelect id="tags" label="view no" value={ } onChange={ } />
//             </Row>
//             <Row className="mb-3">
//                 <Form.Group as={Col} controlId="description">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control as="textarea" value={image.description || ''} placeholder="Enter description" onChange={handleChange} />
//                 </Form.Group>
//             </Row>
//             <Button variant="primary" type="submit">
//                 Submit
//             </Button>
//         </Form>
//     );
// };

// const InputGroup = ({ id, label, value, handleChange, focus }) => {
//     return (
//         <Form.Group as={Col} controlId={id}>
//             <Form.Label>{label}</Form.Label>
//             <Form.Control ref={focus && innerRef} type="text" value={value || ''} placeholder="Enter Title" onChange={handleChange} />
//         </Form.Group>
//     );
// }


// const InputSelect = ({ id, label, }) => {
//     return (
//         <Form.Group as={Col} controlId={id}>
//             <Form.Label>{label}</Form.Label>
//             <MySelect isMulti handleChange={handleChange} options={options} value={value} />
//         </Form.Group>
//     );
// };

// const MySelect = ({ handleChange, options, value }) => {
//     const selectedTags = image.tags.map(tag => { return { label: tag.name, value: tag.name } });

//     return (
//         <CreatableSelect
//             isMulti
//             onChange={evt => {
//                 //onChange callback (in react-select CreateableSelect component) automatically updates a selected array with: [{value: "My Tag", label: "My Tag"}]
//                 handleChange();
//             }}
//             options={options}
//             value={value}
//             key={value} //needed to get a rerender to show the tags for some reason
//         />
//     );
// };