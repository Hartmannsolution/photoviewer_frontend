//npm install react-bootstrap@next bootstrap@5.1.1
// import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react';
import Gallery from "react-photo-gallery";
import ModalsDemo from '../ModalsDemo';
import './images.css';

export default (props) => {
    const [modalShow, setModalShow] = useState(false);
    // const baseUrl = 'https://edu.bugelhartmann.dk/photoviewer/api/photo/property/location/';
    const [images, setImages] = useState([]);
    const [image, setImage] = useState({name:'',title:'',description:'',viewno:''});
    
    useEffect(()=>{
        console.log('Do something here');
        fetch(props.baseUrl+props.locationUrl+props.set).then(res=>res.json()).then(data=>{
            // const photos = data.map(photo=>{return {src:photo.location+photo.name, width:1, height:1}}); // To use with react-photo-gallery
            //setState(photos);
            setImages(data);
        });
    },[]);
    const handleClick = (evt) => {
        console.log('Handle ccccccclick',evt.currentTarget.getAttribute('name'), evt.currentTarget);
        const name = evt.currentTarget.getAttribute('name');
        const location = evt.currentTarget.getAttribute('location');
        const viewNo = evt.currentTarget.getAttribute('viewno');
        const title = evt.currentTarget.getAttribute('title');
        const description = evt.currentTarget.getAttribute('description');
        const tags = evt.currentTarget.getAttribute('tags');
        setImage({name, location, viewNo, title, description, tags});
        setModalShow(true);
    };
    return (
        <>
        {/* <Gallery photos={state}/> */}
        {images.map(image=>{
            image.viewno = image.viewNo; 
            delete image.viewNo['viewNo']; //delete viewNo since react will not allow capital letters in props
        return (
        <SingleImage key={image.name} image={image} src={image.location+image.name} handleClick={handleClick} />
        )
    })}
        <ModalsDemo setModalShow={setModalShow} modalShow={modalShow} image={image} baseUrl={props.baseUrl}/>
        </>);
};

const SingleImage = (props) => <span onClick={props.handleClick} {...props.image}><img src={props.src} /></span> // onLoad={(evt)=>{console.log(evt.target.id, evt.target.width)}}/>)}