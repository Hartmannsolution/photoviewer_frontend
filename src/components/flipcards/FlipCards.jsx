//npm install react-bootstrap@next bootstrap@5.1.1
import {Row, Col} from 'react-bootstrap';

import React, { useState} from 'react';
import './FlipCards.css'
const images = [
    { 'src': 'lotus1.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'First image' },
    { 'src': 'lotus2.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Second image' },
    { 'src': 'lotus3.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Third image' },
    { 'src': 'lotus4.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Fourth image' },
    { 'src': 'lotus5.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Fifth image' },
    { 'src': 'lotus6.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Sixth image' }
];
export default (props) => {
    // const [state, setState] = useState([]);

    return (
        <>
            {/* <Row xs={1} md={2} lg={4} xl={5} xxl={6} className="g-4"> */}
            <Row xs="auto" md="auto" lg="auto" xl="auto" xxl="auto" className="g-4">
            {images.map(image=>(
                <Col>
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img className=".img-fluid" src={require(`../../images/${image.src}`).default} alt="Avatar" />
                        </div>
                        <div class="flip-card-back">
                            <h1>{image.header}</h1>
                            <p>{image.caption}</p>
                        </div>
                    </div>
                </div>
                </Col>
            ))}
        </Row>
        </>);
};