import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BsSearch} from 'react-icons/bs'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useContext } from 'react';
import { MoviesContext } from '../../contexts/MoviesContext';
import { useNavigate } from 'react-router-dom';



function NavBar(props) {

  const navigate = useNavigate()
  const { searchFor } = useContext(MoviesContext)
  const handleSearch = async (query,ev) => { 
    ev.preventDefault()
    await searchFor(query)
    if(props.mode === 'detail') navigate('/')
  }
    return (
        <Navbar bg="dark" variant="dark" style={{width:'100%'}}>
        <Container fluid>
          <Navbar.Brand href='/'>Flix</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Item>
            <Form className="d-flex" onSubmit={(ev) => handleSearch(document.getElementById('searchField').value, ev)}>
                    <Form.Control
                      type="search"
                      placeholder="Insira um filme..."
                      className="me-2"
                      aria-label="Search"
                      id='searchField'
                    />
                    <Button 
                    type="submit"
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