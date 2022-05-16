import React, { useState, useEffect } from 'react';
import ModalsDemo from '../ModalsDemo';
import './images.css';

// #################### SHOWIMAGES #############################
const ShowImages = ({tags, url, loggedIn, baseUrl, logout}) => {

const [modalShow, setModalShow] = useState(false);
const [allImages, setAllImages] = useState([]);
const [filteredImages, setFilteredImages] = useState([]);
const [image, setImage] = useState({ name: '', title: '', description: '', viewno: '', tags: [] });

/**
 * 
 * @param {array} images 
 * @param {array} tags 
 * @returns new array with only the images containing the one or more of the given tags. 
 */
const filterImages = (images, tags) => {
    return images.filter(image=>{
        for(const imageTag of image.tags){

            if(tags.some(tag=>tag.name === imageTag.name))
                return true;

        } 
        return false;
        });
};
/**
 * 
 * @param {array} images 
 * @param {array} tags 
 * @returns return a new array where the images are sorted with most matched tags first. 
 */
const sortImagesByTagAmount = (images, tags) => {
    const getNumberOfTags = (image,tags) => {
        let num = 0;
        for(const imgTag of image.tags){
            if(tags.some(tag => tag.name === imgTag.name))
                num += 1;
        }
        return num;
    }
    const map = new Map();
    for (const image of images){
        map.set(image, getNumberOfTags(image, tags));
    }
    const sorted = new Map([...map].sort((a,b)=>b[1] - a[1]));
    const sortedImages = [...sorted.keys()]; 
    return sortedImages;
} 

/**
 * 
 * @param {array} images 
 * @returns returns a new array sorted by image.viewno.  
 */
const sortImagesByViewNo = (images) => {
    return [...images.sort((a,b)=>a.viewno-b.viewno)];
};

/**
 * Sets both allImages and filteredImages to the full collection of images sorted by viewno
 */
const getAllImages = () => {
    fetch(url).then(res => res.json()).then(data => {
        const sortedByViewNo = sortImagesByViewNo(data);
        setAllImages([...sortedByViewNo]);
        setFilteredImages([...sortedByViewNo]);
    });
}

useEffect(() => {
    if(tags.length > 0){
        const filtered = filterImages(allImages, tags);
        const sorted = sortImagesByTagAmount(filtered, tags);
        setFilteredImages([...sorted]);
    }
    else { // First page load:
        getAllImages();
    }
}, [tags]);

/**
 * 
 * @param {html dom event} evt 
 * Selects the image to show on the modal.
 */
const handleClick = (evt) => {
    const name = evt.currentTarget.getAttribute('name');
    const currentImage = allImages.filter(img => img.name === name)[0];
    setImage({ ...currentImage });
    setModalShow(true);
};

const updateImages = (image) => {
    getAllImages();
};

/**
 * Select the next image in the list to show on the modal.
 */
const setNextImage = () => {
    const found = allImages.findIndex((element) => element.name === image.name);
    const next = found < allImages.length - 1 ? found + 1 : 0
    setImage({ ...allImages[next] });
}

return (
    <>
        {filteredImages.map(image => {
            return (
                <SingleImage
                    key={image.name}
                    name={image.name}
                    viewno={image.viewno}
                    src={image.location + image.name}
                    loggedIn={loggedIn}
                    handleClick={handleClick} />
            )
        })}
            <ModalsDemo
                setModalShow={setModalShow}
                modalShow={modalShow}
                image={image}
                updateImages={updateImages}
                baseUrl={baseUrl}
                loggedIn={loggedIn}
                logout={logout}
                setNextImage={setNextImage}
                key={image.name} />
        </>);
};
export default ShowImages;

// #################### SINGLE IMAGE #############################
const SingleImage = (props) => {

    return (<>
        <span onClick={props.handleClick} name={props.name}
        // style={{ position: 'relative', textAlign: 'center' }}
        >
            <img src={props.src} alt="" />
            {/* {props.loggedIn &&  */}
            {/* // <span style={{ position: 'absolute', bottom: '4px', right: '16px', color: 'red' }}>
            //     {props.viewno}
            // </span> */}
            {/* } */}

            {props.loggedIn && 
            <span>
           <b>{props.viewno}</b> 
            </span>   } 
                </span>
        </>);
}