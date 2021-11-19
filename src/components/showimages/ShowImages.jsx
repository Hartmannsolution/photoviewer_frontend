//npm install react-bootstrap@next bootstrap@5.1.1
import React, { useState, useEffect } from 'react';
import ModalsDemo from '../ModalsDemo';
import './images.css';

const ShowImages = (props) => {
    const [modalShow, setModalShow] = useState(false);
    // const baseUrl = 'https://edu.bugelhartmann.dk/photoviewer/api/photo/property/location/';
    const imageUrl = props.baseUrl + props.locationUrl + props.set;
    const [images, setImages] = useState([]);
    const [image, setImage] = useState({ name: '', title: '', description: '', viewno: '', tags: [] });

    useEffect(() => {
        fetch(imageUrl).then(res => res.json()).then(data => {
            setImages(data);
        });
    },[imageUrl]);

    const handleClick = (evt) => {
        const name = evt.currentTarget.getAttribute('name');
        const currentImage = images.filter(img=>img.name === name)[0];
        setImage({...currentImage });
        setModalShow(true);
    };

    const updateImages = (image) => {
        const idx = images.findIndex(img=>img.name === image.name);
        console.log('IDX: ',idx);
        images[idx] = image;
    };

    return (
        <>
            {images.map(image => {
                return (
                    <SingleImage key={image.name} image={image} src={image.location + image.name} handleClick={handleClick} />
                )
            })}
            <ModalsDemo setModalShow={setModalShow} modalShow={modalShow} image={image} updateImages={updateImages} baseUrl={props.baseUrl} />
        </>);
};
export default ShowImages;
const SingleImage = (props) => <span onClick={props.handleClick} name={props.image.name}><img src={props.src} alt=""/></span>