import { Card, Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
// source = https://react-bootstrap.github.io/components/cards/

const books = [
  { 'id': 1, 'title': 'Unlocking the Mysteries of Birth and Death and Everything in Between', 'author': 'Daisaku Ikeda', 'publicaton_year': '2004', 'isbn': '0972326707', 'description': 'Provides insights into the doctrines of Nichiren Buddhism, covering all aspects of life, including birth, aging, and death.' },
  { 'id': 2, 'title': 'Be here now', 'author': 'Ram Das', 'publicaton_year': '1978', 'isbn': '9780517543054', 'description': 'Just ten years earlier, he was known as Professor Richard Alpert. He held appointments in four departments at Harvard University. He published books, drove a Mercedes and regularly vacationed in the Caribbean. By most societal standards, he had achieved great success. . . . And yet he couldn’t escape the feeling that something was missing.' },
  { 'id': 3, 'title': 'Be as you are', 'author': 'Sri Ramana Maharshi', 'publicaton_year': '1988', 'isbn': '9780140190625', 'description': 'Through this book, we can discover the essence of Sri Ramanas teaching: that self-realisation is the vital quest we must all pursue, before we can attempt to understand the world' },
  { 'id': 4, 'title': 'The diamond in your pocket', 'author': 'Gangaji', 'publicaton_year': '2005', 'isbn': '159179272X', 'description': 'With The Diamond in Your Pocket, Gangaji describes our never-ending search to find fulfillment, which, paradoxically, already exists if we will only stop long enough to discover its true source.' },
  { 'id': 5, 'title': 'An Invitation to Freedom', 'author': 'Mooji', 'publicaton_year': '2018', 'isbn': '1684033403', 'description': 'An Invitation to Freedom guides you toward the immediate, authentic awakening that so many of us seek—the realization of our true nature as pure, effortless awareness. These simple yet profound instructions, questions, and contemplations will lead you directly into the heart of truth and absolute freedom' },
  { 'id': 6, 'title': 'Power of now', 'author': 'Eckhart Tolle', 'publicaton_year': '2004', 'isbn': '1577314808', 'description': 'Much more than simple principles and platitudes, the book takes readers on an inspiring spiritual journey to find their true and deepest self and reach the ultimate in personal growth and spirituality: the discovery of truth and light. ' },
  { 'id': 7, 'title': 'The Four Agreements', 'author': 'Don Miguel Ruiz', 'publicaton_year': '2018', 'isbn': '9781878424310', 'description': 'In The Four Agreements, bestselling author don Miguel Ruiz reveals the source of self-limiting beliefs that rob us of joy and create needless suffering. Based on ancient Toltec wisdom, The Four Agreements offer a powerful code of conduct that can rapidly transform our lives to a new experience of freedom, true happiness, and love.' },
  { 'id': 8, 'title': 'The Alchymist', 'author': 'Paulo Coelho', 'publicaton_year': '2014', 'isbn': '0007155662', 'description': 'Combining magic, mysticism, wisdom and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.' },
  { 'id': 9, 'title': 'The Prophet', 'author': 'Kalil Gibran', 'publicaton_year': '2016', 'isbn': '153043694X', 'description': 'The most famous work of spiritual fiction of the twentieth century, The Prophet is rooted in Kahlil Gibrans own experience as an immigrant and provides inspiration to anyone feeling adrift in a world in flux. The Prophet is a collection of poetic essays that are philosophical, spiritual, and, above all, inspirational. Gibran’s musings are divided into twenty-eight chapters covering such sprawling topics as love' },
  { 'id': 10, 'title': 'The Circle of Fire', 'author': 'Janet Mills', 'publicaton_year': '2013', 'isbn': '1878424645', 'description': ' inspires us to enter into a new and loving relationship with ourselves, with our fellow humans, and with all of creation. Through a selection of beautiful essays, prayers, and guided meditations, Ruiz prepares our minds for a new way of seeing life, and opens our hearts to find our way back to our birthright: heaven on earth. The result is a life lived in joy, harmony, and contentment.' },
  { 'id': 11, 'title': '', 'author': '', 'publicaton_year': '', 'isbn': '', 'description': '' }
];

const openlibrary = "https://covers.openlibrary.org/b/isbn/0062992066-L.jpg" //L for Large, M for medium, S for small size images

export default () => {
  const [formModalShow, setFormModalShow] = useState(false);
  const [book, setBook] = useState({ 'id': 11, 'title': '', 'author': '', 'publicaton_year': '', 'isbn': '', 'description': '' });

  const handleClick = (evt) => {
    console.log('clicked', evt.target, 'really clicked', evt.currentTarget);
    console.log('id', evt.currentTarget.id);
    console.log('clicked............book:', books.filter(book => book.id === Number(evt.currentTarget.id))[0]);
    setBook(books.filter(book => book.id === Number(evt.currentTarget.id))[0]);
    setFormModalShow(true)
  };
  //xs (number of columns to show for extra small devices)
  //md (number of columns to show for medium devises)

  return (<>
    <Row xs={1} md={4} lg={6} className="g-4">
      {/* {Array.from({ length: 24 }).map((_, idx) => ( */}
      {books.map((book) => (
        <Col key={book.id}>
          <Card id={book.id} onClick={handleClick}>
            <Card.Img variant="top" src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>
                <em>{book.author}</em><br />
                {book.description}<br />
                <em>Publication year: {book.publicaton_year}</em>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    <FormModal book={book} show={formModalShow} onHide={() => setFormModalShow(false)} />
  </>
  )
};

const FormModal = (props) => {
  console.log('This modal uses grid for layout', props.book);
  const emptyState = { 'name': '', 'email': '' };
  const [state, setState] = useState({});
  const emptyBook = props.book;
  const [book, setBook] = useState(emptyBook);

  useEffect(() => {
    // The argument passed to useState is the initial state much like setting state in constructor for a class component and isn't used to update the state on re-render. If you want to update state on prop change, make use of useEffect hook
    setBook(props.book);
  }, [props.book])

  const handleChange = (evt) => {
    console.log(evt.target.value);
    if (evt.target.type === 'radio') {
      setBook({ ...book, [evt.target.name]: evt.target.id });
    }
    else if (evt.target.type === 'checkbox')
      setBook({ ...book, [evt.target.id]: evt.target.checked });
    else
      setBook({ ...book, [evt.target.id]: evt.target.value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (book.title && book.author) {
      console.log('Got It', setBook);
    }
    else {
      console.log('Missed it', book);
    }
    // utils.fetchAny(URL, (response)=>{console.log(response);}, 'POST', state);
    setBook(emptyBook);
    console.log('STATE', book);
  }
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
    // centered //Try these 2 settings out
    // fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {book.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" defaultValue={book.title} placeholder="Enter title" onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" defaultValue={book.author} placeholder="Enter author" onChange={handleChange} />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}