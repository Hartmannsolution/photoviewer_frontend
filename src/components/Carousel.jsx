//npm install react-bootstrap@next bootstrap@5.1.1
import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from 'react';
import lotus from '../images/lotus2.jpg';

const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
export default (props) => {
    const [state, setState] = useState([]);
    const images = [
        { 'src': 'lotus1.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'First slide image' },
        { 'src': 'lotus2.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Second slide image' },
        { 'src': 'lotus3.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Third slide image' },
        { 'src': 'lotus4.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Fourth slide image' },
        { 'src': 'lotus5.jpg', 'caption': 'Nulla vitae elit libero, a pharetra augue mollis interdum.', 'header': 'Fifth slide image' }
    ];
    useEffect(() => {
        console.log('Do something here');
        fetch(url).then(res => res.json()).then(data => {
            setState(data);
        })
    }, []);
    return (
        <>
            <Carousel>  
                <Carousel.Item>
                    <img style={{ 'height': "700px" }}
                        className="d-block w-100"
                        src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{ 'height': '700px' }}
                        className="d-block w-100"
                        src={require('../images/lotus3.jpg').default} 
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{ 'height': '700px' }}
                        className="d-block w-100"
                        src={lotus} />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                {images.map((imgObj) =>
                    <Carousel.Item>
                        <img style={{ 'height': '700px' }}
                            className="d-block w-100"
                            src={require(`../images/${imgObj.src}`).default} />
                        <Carousel.Caption>
                            <h3>{imgObj.header}</h3>
                            <p>{imgObj.caption}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}

            </Carousel>
        </>);
};