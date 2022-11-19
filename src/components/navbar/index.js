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
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



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
          <Navbar.Brand href='/'>
            <img src = 'https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico' alt='logo'>
            </img>Flix</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Item>
              <ButtonGroup vertical>
              <DropdownButton
              align='end'
        as={ButtonGroup}
        title={<img width="30" src='https://www.cvkeep.com/img/flags/pt-br.webp'></img>}
        id="bg-vertical-dropdown-1"
      >
        <Dropdown.Item eventKey="1"><img width="30" src='https://www.cvkeep.com/img/flags/en.webp'></img> Inglês</Dropdown.Item>
      </DropdownButton>
              </ButtonGroup>
            </Nav.Item>
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