import React, { useState, useEffect } from 'react';
import ModalsDemo from '../ModalsDemo';
import './images.css';

// #################### SHOWIMAGES #############################
const ShowImages = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [allImages, setAllImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [image, setImage] = useState({ name: '', title: '', description: '', viewno: '', tags: [] });

    const filterImages = (images, tags) => {
        return images.filter(image=>{
            for(const imageTag of image.tags){

               if(tags.some(tag=>tag.name === imageTag.name))
                    return true;

            } 
            return false;
           });
    };

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
        console.log(sorted)
        const sortedImages = [...sorted.keys()]; 
        console.log(sortedImages)
        return sortedImages;
    } 

    useEffect(() => {
        if(props.tags.length > 0){
            const filtered = filterImages(allImages, props.tags);
            const sorted = sortImagesByTagAmount(filtered, props.tags);
            setFilteredImages([...sorted]);
        }
        else { // First page load:
            fetch(props.url).then(res => res.json()).then(data => {
                setAllImages(data);
                setFilteredImages(data);
            });
        }
    }, [props.tags]);

    const handleClick = (evt) => {
        const name = evt.currentTarget.getAttribute('name');
        const currentImage = allImages.filter(img => img.name === name)[0];
        setImage({ ...currentImage });
        setModalShow(true);
    };

    const updateImages = (image) => {
        const idx = allImages.findIndex(img => img.name === image.name);
        console.log('IDX: ', idx);
        allImages[idx] = image;
    };

    const setNextImage = () => {
        const found = allImages.findIndex((element) => element.name === image.name);
        const next = found < allImages.length - 1 ? found + 1 : 0
        // console.log('INDEX', next, { ...images[next] });
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
                        loggedIn={props.loggedIn}
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
const SingleImage = (props) => {

    return (
        <span onClick={props.handleClick} name={props.name} style={{ position: 'relative', textAlign: 'center' }}>
            <img src={props.src} alt="" />
            {props.loggedIn && 
            <span style={{ position: 'absolute', bottom: '4px', right: '16px', color: 'white' }}>
                {props.viewno}
            </span>}

        </span>);
}