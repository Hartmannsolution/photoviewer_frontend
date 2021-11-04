//TODO: Put the table and the form in each its own child component.

import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import utils from '../utils';
const columns = ['Id','Email','Password','Address 1','Address 2','City','Zip code','Country','Check Me','Check Me Styled','Department'];
const data = [
    {id:1,email:'tha@cphbusiness.dk',password:'pass123',address1:'somewhere 3',address2:'some place else 5',city:'Beijing', zip:'2200', country:'China',checkMe:true,checkMeStyled:false,department:'Sales'}
    ,{id:2,email:'sam@cphbusiness.dk',password:'secret432',address1:'somewhere 4',address2:'some place else 34',city:'Copenhagen', zip:'2200', country:'Denmark',checkMe:true,checkMeStyled:false,department:'IT'}
    ,{id:3,email:'fil@cphbusiness.dk',password:'my_secret434',address1:'somewhere 7',address2:'some place else 66',city:'Fraslovy', zip:'2200',country:'Albany',checkMe:true,checkMeStyled:false,department:'Marketing'}
    ,{id:4,email:'lam@cphbusiness.dk',password:'Doggy6',address1:'somewhere 11',address2:'some place else 77',city:'Beijing',zip:'2200', country:'China',checkMe:true,checkMeStyled:false,department:'Sales'}];
export default (props) => {
    const emptyState = { email: "", password: "", address1: "", address2: "", city: "", country: "Choose ...", zip: "", checkMe: false, checkMeStyled: false, department: "" };
    const [state, setState] = useState(emptyState);
    const [list, setList] = useState(data);

    const handleChange = (evt) => {
        if(evt.target.type === 'radio'){
            setState({...state, [evt.target.name]:evt.target.id});
        }
        else if (evt.target.type === 'checkbox')
            setState({ ...state, [evt.target.id]: evt.target.checked });
        else
            setState({ ...state, [evt.target.id]: evt.target.value });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (state.email && state.password && state.address && state.address2 && state.city && state.department) {
            console.log('Got It', state);
        }
        else {
            console.log('Missed it', state);
        }
        //utils.fetchAny(URL, (response)=>{console.log(response);}, 'POST', state);
        if(state.id && state.id > 0){
            // Object has Id so it is an Edit/put request
            const idx = list.findIndex(element=>element.id === state.id);
            list[idx] = state;
        } else {
            // Object has no Id so it is a Create/Post request.
            list.push(state);
        }
        setState(emptyState);
        setList([...list]);
    }
    return (
        <>
        <h2>Form elements demo</h2>
        <p>Below is an example on how to populate and read values from all the different form element types</p>
        <h2>Data</h2>
        {list && 
        <Table striped>
            <thead><tr>{columns.map(col =><th key={col}>{col}</th>)}</tr></thead>
            <tbody>{list.map(emp => (<tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.email}</td>
                <td>{emp.password}</td>
                <td>{emp.address1}</td>
                <td>{emp.address2}</td>
                <td>{emp.city}</td>
                <td>{emp.country}</td>
                <td>{emp.checkMe}</td>
                <td>{emp.checkMeStyled}</td>
                <td>{emp.department}</td>
                <td>
                <button onClick={()=>{
                    setState(emp);
                }}>Edit</button>
                <button onClick={()=>{
                    setList([...list.filter(employee=>employee.id !== Number(emp.id))]);
                }}>Delete</button></td>
            </tr>))}</tbody>
        </Table>
        }
        <h2>Form</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={state.email} placeholder="Enter email" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={state.password} placeholder="Password" onChange={handleChange} />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters.
                        </Form.Text>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="address1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={state.address1} placeholder="1234 Main St" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control value={state.address2} placeholder="Apartment, studio, or floor" onChange={handleChange} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={state.city} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Select value={state.country} onChange={handleChange}>
                            <option>Choose...</option>
                            {['Albany', 'Belarus', 'China', 'Denmark'].map(country => <option key={country}>{country}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="zip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control value={state.zip} onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="checkMe">
                    <Form.Check type="checkbox" label="Check me out" selected={state.checkMe} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="checkMeStyled">
                    <Form.Check onChange={handleChange}
                        // disabled
                        type="switch" //a styled checkbox
                        label="switch that can be disabled"
                        selected={state.checkMeStyled}
                        
                    />
                </Form.Group>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Department
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check onChange={handleChange}
                                type="radio"
                                label="IT"
                                name="department"
                                id="IT"
                            />
                            <Form.Check onChange={handleChange}
                                type="radio"
                                label="Sales"
                                name="department"
                                id="sales"
                            />
                            <Form.Check onChange={handleChange}
                                type="radio"
                                label="Marketing"
                                name="department"
                                id="marketing"
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="primary" type="reset" onClick={evt=>setState(emptyState)}>
                    Reset
                </Button>
            </Form>
        </>);
};