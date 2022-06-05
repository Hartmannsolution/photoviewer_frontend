import React, { useState, useEffect, useRef, useCallback } from 'react';
import ModalsDemo from '../ModalsDemo';
import './images.css';
import properties from '../../properties';

// #################### SHOWIMAGES #############################
const ShowImages = ({ tags, url, loggedIn, baseUrl, logout }) => {

    const [modalShow, setModalShow] = useState(false);
    const [allImages, setAllImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [imagesToShow, setImagesToShow] = useState([]); // set images paginated
    const [image, setImage] = useState({ name: '', title: '', description: '', viewno: '', tags: [] });
    const [startIndex, setStartIndex] = useState(0);
    // const [hasMore, setHasMore] = useState(false);
    const observer = useRef()                   // useRef is like a “box” that can hold a mutable value in its .current property. It lives as long as the components lifetime.
    const lastImageRef = useCallback(           // The useCallback Hook only runs when one of its dependencies update. Usecase: Stop the inner callback from being updated on re-render (only on changes to dependent array elements)
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => { //observer is a Ref (object with single property: current). Each entry in the list of thresholds is an IntersectionObserverEntry object describing one threshold that was crossed; that is, each entry describes how much of a given element is intersecting with the root element, whether or not the element is considered to be intersecting or not, and the direction in which the transition occurred.
                if (entries[0].isIntersecting && true) {               // If any entry is intersecting and if there are more component/images etc. to load we react.
                    setStartIndex((prev) => prev + 1);
                    // alert('HEY');
                    console.log('SCROLLING',startIndex);
                }
            });
            if (node) observer.current.observe(node);
        }, []
    );

    const filterImages = (images, tags) => {
        // Filters images by tags. To only show those images that have the given tags
        return images.filter(image => {
            for (const imageTag of image.tags) {
                if (tags.some(tag => tag.name === imageTag.name))
                    return true;
            }
            return false;
        });
    };

    const sortImagesByTagAmount = (images, tags) => {
        // Sort images, so that the first images shown are the ones that matches the most tags
        const getNumberOfTags = (image, tags) => {
            let num = 0;
            for (const imgTag of image.tags) {
                if (tags.some(tag => tag.name === imgTag.name))
                    num += 1;
            }
            return num;
        }
        const map = new Map();
        for (const image of images) {
            map.set(image, getNumberOfTags(image, tags));
        }
        const sorted = new Map([...map].sort((a, b) => b[1] - a[1]));
        const sortedImages = [...sorted.keys()];
        return sortedImages;
    }

    const sortImagesByViewNo = (images) => {
        // Sort images, so that they can be shown in appropriate sequence
        return [...images.sort((a, b) => a.viewno - b.viewno)];
    };

    const getAllImages = () => {
        // Sets both allImages and filteredImages to the full collection of images sorted by viewno. 
        fetch(url).then(res => res.json()).then(data => {
            const sortedByViewNo = sortImagesByViewNo(data);
            setAllImages([...sortedByViewNo]); // these are the base collection
            setFilteredImages([...sortedByViewNo]); // these are shown
        });
    }

    useEffect(() => {
        if (tags.length > 0) {
            const filtered = filterImages(allImages, tags);
            const sorted = sortImagesByTagAmount(filtered, tags);
            setFilteredImages([...sorted]);
        }
        else { // First page load:
            getAllImages();
        }
    }, [tags]);

    useEffect(() => {
        if (startIndex === 0 && filteredImages.length > 0) {
            setImagesToShow(filteredImages.slice(0, 40));//properties.imagesPrPage));
        } else {
            const firstImageIdx = startIndex * properties.imagesPrPage; // 40
            let lastImageIdx = firstImageIdx + properties.imagesPrPage; // 80
            if (filteredImages.length < firstImageIdx) { return }
            if (filteredImages.length >= firstImageIdx ) {
                if(lastImageIdx > filteredImages.length - 1) { // We are on the last batch
                    lastImageIdx = filteredImages.length;
                }
                const imagesToAdd = filteredImages.slice(firstImageIdx, lastImageIdx - 1);
                setImagesToShow([...imagesToShow, ...imagesToAdd]);
            }
        }
    }, [startIndex, filteredImages])

    const handleClick = (evt) => {
        // send down to SingleImage component to create the Modal with all the data about the image, that was clicked
        const name = evt.currentTarget.getAttribute('name');
        const currentImage = allImages.filter(img => img.name === name)[0];
        setImage({ ...currentImage });
        setModalShow(true);
    };

    const updateImages = (image) => {
        // Is send to Modal to refresh local collection, when image is updated. All images loaded again from server!
        getAllImages();
    };

    const setNextImage = () => {
        // Select the next image in the list to show on the modal.
        const found = allImages.findIndex((element) => element.name === image.name);
        const next = found < allImages.length - 1 ? found + 1 : 0
        setImage({ ...allImages[next] });
    }

    return (
        <>
            
            {imagesToShow.map((image, i) => {
                if (imagesToShow.length === i + 1) {
                    return (
                        // <span ref={lastImageRef}>
                            <SingleImage
                                innerRef={lastImageRef}
                                // key={image.name}
                                key={image.name}
                                name={image.name}
                                viewno={image.viewno}
                                src={image.location + image.name}
                                loggedIn={loggedIn}
                                handleClick={handleClick} />
                        // </span>
                    )
                }
                return (
                    <SingleImage
                        // key={image.name}
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
        <span onClick={props.handleClick} name={props.name} ref={props.ref}
        // style={{ position: 'relative', textAlign: 'center' }}
        >
            {props.innerRef?<img src={props.src} ref={props.innerRef} alt="" />:<img src={props.src} alt="" />}
                        {/* {props.loggedIn &&  */}
            {/* // <span style={{ position: 'absolute', bottom: '4px', right: '16px', color: 'red' }}>
            //     {props.viewno}
            // </span> */}
            {/* } */}

            {props.loggedIn &&
                <span>
                    <b>{props.viewno}</b>
                </span>}
        </span>
    </>);
}