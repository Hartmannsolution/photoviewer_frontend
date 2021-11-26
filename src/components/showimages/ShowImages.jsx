import React, { useState, useEffect } from 'react';
import ModalsDemo from '../ModalsDemo';
import './images.css';

// #################### SHOW IMAGES #############################
const ShowImages = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [images, setImages] = useState([]);
    const [image, setImage] = useState({ name: '', title: '', description: '', viewno: '', tags: [] });
    
    const imageUrl = props.baseUrl + props.locationUrl + props.set;

    useEffect(() => {
        fetch(imageUrl).then(res => res.json()).then(data => {
            setImages(data);
        });
    }, [imageUrl]);

    const handleClick = (evt) => {
        const name = evt.currentTarget.getAttribute('name');
        const currentImage = images.filter(img => img.name === name)[0];
        setImage({ ...currentImage });
        setModalShow(true);
    };

    const updateImages = (image) => {
        const idx = images.findIndex(img => img.name === image.name);
        console.log('IDX: ', idx);
        images[idx] = image;
    };

    const setNextImage = () => {
        const found = images.findIndex((element) => element.name === image.name);
        const next = found < images.length - 1 ? found + 1: 0
        // console.log('INDEX', next, { ...images[next] });
        setImage({ ...images[next] });
    }

    return (
        <>
            {images.map(image => {
                return (
                    <SingleImage
                        key={image.name}
                        name={image.name}
                        src={image.location + image.name}
                        handleClick={handleClick} />
                )
            })}
            <ModalsDemo
                setModalShow={setModalShow}
                modalShow={modalShow}
                image={image}
                updateImages={updateImages}
                baseUrl={props.baseUrl}
                loggedIn={props.loggedIn}
                setNextImage={setNextImage}
                key={image.name} />
        </>);
};
export default ShowImages;

// #################### SINGLE IMAGE #############################
const SingleImage = (props) => <span onClick={props.handleClick} name={props.name}><img src={props.src} alt="" /></span>