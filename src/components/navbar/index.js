import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BsSearch} from 'react-icons/bs'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';



function NavBar(props) {
  
  const handleSearch = (query) => {
    axios.get(`
    https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=pt-BR&query=${query}&page=1&include_adult=false`).then((res) => {
      props.result = res.data.results
    })
  }
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">NelsonFlix</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Item>
            <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Insira um filme..."
                      className="me-2"
                      aria-label="Search"
                      id='searchField'
                    />
                    <Button
                    onClick={() => handleSearch(document.getElementById('searchField').value)}
                     variant="outline-success">
                      <BsSearch></BsSearch>
                    </Button>
                  </Form>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default NavBar