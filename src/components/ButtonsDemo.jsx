import {Breadcrumb,Button} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

const MyBreadCrumbs = () => {
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    console.log(pathParts);
    return <div>
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            {pathParts.map((part,idx)=>{
                if(part === '')
                    return '';
                const sambled = pathParts.slice(1,idx+1).join('/');//join the paths up to this one
                return <Breadcrumb.Item href={`/${sambled}`}>{part}</Breadcrumb.Item>
            })}
        </Breadcrumb>
        <p>The bread crumbs component helps the navigation by alowing us to jump anywhere</p>
    </div>
};

const BottonsDemo = () => {
    return (<>
    <MyBreadCrumbs/>
        {['primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'outline-primary',
        'outline-danger'].map((variant, idx) => <Button variant={variant}>{variant}</Button>)}
    </>);
};

export {BottonsDemo as default, MyBreadCrumbs};