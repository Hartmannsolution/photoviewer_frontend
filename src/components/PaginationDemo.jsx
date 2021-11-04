//npm install react-bootstrap@next bootstrap@5.1.1
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

export default (props) => {
    const [state, setState] = useState({ names: [], msg: "" });
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [paginationNumbers, setPaginationNumbers] = useState([1,2,3])
    const pages = count ? count / 20 : 0; //20 elements pr. page
    const columns = ['#', 'Title', 'Url', 'Thumbnail Url', 'Url'];
    // const columns = ['#', 'Gender', 'First Name', 'Last Name', 'Email'];
    const elementsPrPage = 20;

    const loadData = async () => {
        console.time("fetching");
        setState({ msg: "Loading..." });
        // const res = await fetch(`http://localhost:1234/api?_start=${(page-1)*elementsPrPage}&_end=${(page-1)*elementsPrPage + elementsPrPage}`);
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${(page)}&_limit=${elementsPrPage}`);
        https://jsonplaceholder.typicode.com/photos?_page=7&_limit=20
        setCount(res.headers.get('X-Total-Count')); //read header with name: X-Total-Count that the server/backend produces.
        const names = await res.json();
        console.timeEnd("fetching");
        setState({ names, msg: "" });
    };
    useEffect(() => {
        loadData();
    }, [page]);

    const update = (evt) => {
        setPage(Number(evt.target.id));
    };

    const generateButtons = () => {
        if (page < 3)
            return [1,2,3];
        if (page > pages - 3)
            return [page-2,page-1,page];
        return [page-1, page, page +1];
    }

    return (<div>
        {state.msg}
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    {columns.map(column => <th>{column}</th>)}
                </tr>
            </thead>
            <tbody>
                {state.names && state.names.map(name => {
                    return (
                        // <tr key={name.id}><td>{name.id}</td><td>{name.gender}</td><td>{name.firstName}</td><td>{name.lastName}</td><td>{name.email}</td></tr>
                        <tr key={name.id}><td>{name.id}</td><td>{name.title}</td><td>{name.url}</td><td>{name.thumbnailUrl}</td><td>{name.url}</td></tr>
                    );
                })}
            </tbody>
        </Table>
        <Pagination>
            {page > 3 && <><Pagination.First onClick={()=>{setPage(1)}}/><Pagination.Prev onClick={()=>{setPage(page-1)}}/></>}
            {/* {[...Array(pages).keys()].map(no => */}
            {generateButtons().map(no=>
            <Pagination.Item key={no} id={no} active={no === Number(page)} onClick={update}>
                {no}
            </Pagination.Item>)} 
            {page < pages-3 && <><Pagination.Next onClick={()=>{setPage(page+1)}}/><Pagination.Last onClick={()=>{setPage(pages)}}/></>}
            </Pagination>
    </div>);


};








// const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
// export default (props) => {
//     const [state, setState] = useState([]);

//     useEffect(() => {
//         console.log('Do something here');
//         fetch(url).then(res => res.json()).then(data => {
//             setState(data);
//         })
//     },[]);
// //State has 50 photos. Show 10 for each page
//     const pageno = state.length/10;
//     console.log(pageno);
//     return (
//         pageno && <>

//         <Pagination>
//         <Pagination.First />
//         <Pagination.Prev />
//         {Array.from(Array(pageno)).map((e,i)=>{ //To use map when we only got a number
//             return (<Pagination.Item>{i+1}</Pagination.Item>);
//         })}
//         <Pagination.Next />
//         <Pagination.Last />
//     </Pagination>
//    </> );
// };