import React, { useState, useEffect } from 'react';
import ModalsDemo from '../ModalsDemo';
import './images.css';

// #################### SHOWIMAGES #############################
const ShowImages = ({ tags, url, loggedIn, baseUrl, logout }) => {

    const [modalShow, setModalShow] = useState(false);
    const [allImages, setAllImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [image, setImage] = useState({ name: '', title: '', description: '', viewno: '', tags: [] });
    const [startIndex, setStartIndex] = useState(0);
    const [hasMore, setHasMore] = useState(false);


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

    const getPaginated = (index, number) => {
        // get the paginated data to only load when last element crosses the thresshold.
        if (hasMore) {
            setHasMore(index * number < filteredImages.length);
            const result = filteredImages.slice(index * number, number * index + number);
            // setStartIndex(index + 1);
            return result
        }
    }
    const loadMore = () => {
        // run when scrolling gets to end of images
        //check if hasMore
        // rerender by updating start index
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
                </span>}
        </span>
    </>);
}