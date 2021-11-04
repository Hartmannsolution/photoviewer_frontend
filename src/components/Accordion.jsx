import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react';

const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
export default (props) => {
    const [state, setState] = useState([{id:0,title:'',url:''}]);
    useEffect(()=>{
        console.log("Do something here");
        fetch(url).then(res=>res.json()).then(data=>{
            setState(data);
        });
    },[]);
    return (
        <>
            <Accordion>
                {state.map((el,idx)=>{
                    const img = 'https://images.unsplash.com/photo-1556388275-bb5585725aca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c21va2V8ZW58MHx8MHx8&w=1000&q=80';
                    return (
                        <Accordion.Item eventKey={el.id} key={el.id}>
                    <Accordion.Header>{el.title}</Accordion.Header>
                    <Accordion.Body>
                        <a href={el.url}>Show image</a><br/>
                        <img src={img} width="100" height="120" alt="new"/><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                    );
                })}
            </Accordion>
        </>);
};