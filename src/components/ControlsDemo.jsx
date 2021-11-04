//npm install react-bootstrap@next bootstrap@5.1.1

import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch, 
    useLocation,
    NavLink
} from "react-router-dom";

import AlertsDemo from './AlertsDemo';
import ButtonsDemo from './ButtonsDemo';
import CarouselsDemo from './Carousel';
import FormsDemo from './FormsDemo';
import ModalsDemo from './ModalsDemo';
import FlipCards from './flipcards/FlipCards';
import InfiniteScroll from './infinite/InfiniteScroll';

// const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
export default (props) => {
let { path, url } = useRouteMatch();
return (
    <>
    <ul>
    <li><Link to={`${url}/alerts`}>Bootstrap Alerts and Toasts</Link></li>
    <li><Link to={`${url}/buttons`}>BreadCrumbs and Buttons</Link></li>
    <li><Link to={`${url}/carousel`}>Carousel</Link></li>
    <li><Link to={`${url}/forms`}>Form components</Link></li>
    <li><Link to={`${url}/modals`}>Modals</Link></li>
    <li><Link to={`${url}/images`}>Images and Figures</Link></li>
    <li><Link to={`${url}/flipCards`}>Flip cards</Link></li>
    <li><Link to={`${url}/infiniteScroll`}>Infinite scroll</Link></li>
    <li><Link to={`${url}/overlays`}>Overlays</Link></li>
    <li><Link to={`${url}/tables`}>Tables</Link></li>
    <li><Link to={`${url}/tabs`}>Tabs</Link></li>
    </ul>
    <hr style={{color:'blue',height:'5px'}}/>
    <Switch>
    <Route exact path={path}>
        <h3>Please select a topic.</h3>
    </Route>
    <Route path={`${path}/:topicId`}>
        <Topic />
    </Route>
    </Switch>
    </>
);
};

const Topic = () => {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams();
    switch(topicId) {
        case 'alerts':
          return <AlertsDemo/>;
          break;
        case 'buttons':
          return <ButtonsDemo/>;
          break;
        case 'carousel':
          return <CarouselsDemo/>;
          break;
        case 'forms':
          return <FormsDemo/>;
          break;
        case 'modals':
          return <ModalsDemo/>;
          break;
        case 'tables':
          return <h2>Not yet implemented, but see example in pagination tab</h2>;
          break;
        case 'flipCards':
          return <FlipCards/>;
          break;
        case 'infiniteScroll':
          return <InfiniteScroll/>;
          break;
        default:
          return <h2>No such component</h2>;
      }
    }



    
    // const [state, setState] = useState([]);

    // useEffect(() => {
    //     // console.log('Do something here');
    //     // fetch(url).then(res=>res.json()).then(data=>{
    //     //     setState(data);
    //     // })
    // }, []);
    // return (
    //     <>
    //         {['primary',
    //             'secondary',
    //             'success',
    //             'danger',
    //             'warning',
    //             'info',
    //             'light',
    //             'dark'].map((variant, idx) => (
    //                 <Alert key={idx} variant={variant}>
    //                     This is a {variant} alert—check it out!
    //                 </Alert>
//     <Toast className="d-inline-block m-1" bg={variant.toLowerCase()} key={idx}>
//     <Toast.Header>
//       <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
//       <strong className="me-auto">Bootstrap</strong>
//       <small>11 mins ago</small>
//     </Toast.Header>
//     <Toast.Body className={variant === 'Dark' && 'text-white'}>
//       Hello, world! This is a toast message.
//     </Toast.Body>
//   </Toast>
    //             ))}
    //     </>);