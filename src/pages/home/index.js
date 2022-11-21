import MovieCard from "../../components/movie-card";
import NavBar from "../../components/navbar";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import { Collapse } from "react-bootstrap";
import { MoviesContext } from "../../contexts/MoviesContext";
import { Pagination } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useNavigate} from 'react-router-dom'
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import apiClient from "../../api";




function Home() {
    const itemPerPage = 10
    const { movies, moviesTop, nextPage, prevPage, goToPage, isLoading, page, totalPages, filterFor, filter, mode, query} = useContext(MoviesContext)


    console.log(movies)
    const handlePrevPage = () => prevPage()
    const handleNextPage = () => nextPage()
    const handleClickPage = (page) => goToPage(page)
    const navigate = useNavigate();
    
    let active = page;
    let items = [];
    items.push(
        <Pagination.Prev onClick={handlePrevPage} />
        )
        
        for (let number = 1; number <= (totalPages < 20 ? totalPages: 20); number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={()=>handleClickPage(number)}>
      {number}
    </Pagination.Item>,
  );
}

if(totalPages > 20){
    items.push(
        <Pagination.Ellipsis></Pagination.Ellipsis>
        )
    }
    
    items.push(
        <Pagination.Next onClick={handleNextPage}></Pagination.Next>
        )
        
        if(totalPages > 20){
            items.push(
                <Pagination.Item onClick={()=>handleClickPage(totalPages)} active={totalPages === active} >
    {totalPages}
  </Pagination.Item>
  )
}


const handleDeleteMovie = async (id) => {
   
    Swal.fire({
      title:'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apague'
    }).then( async (result) => {
      if (result.isConfirmed) {
        await apiClient.delete(`/filme/${id}`);
        Swal.fire(
          'Apagado!',
          'O filme foi apagado com sucesso.',
          'success'
        )
        goToPage(1)

      }
    })
  };


return (
    <>
            <NavBar mode='all'/>  
            <div style={{ padding: '30px' }}>
            
            <div style={{display:'flex', gap:'10px', marginBottom:'12px'}}>
            <Button onClick={() => navigate('/form/movie')}>Novo Filme</Button>
            <Button onClick={() => navigate('/form/genre')}>Novo Genero</Button>
            </div>
           
                
                <Container >
                    
                
                    {
                        mode === 'all' ? 
                        <Tabs
                        onSelect={(k) => {filterFor(k) }}
                        defaultActiveKey={0}>
                        <Tab eventKey={0} title="Em exibição"><h2 style={{ marginBottom: '25px',  marginTop:'10px' }}>Em exibição</h2></Tab>
                        <Tab eventKey={1} title="Populares"><h2 style={{ marginBottom: '25px', marginTop:'10px' }}>Mais populares</h2></Tab>
                        </Tabs>
                        :
                        <h2 style={{ marginBottom: '25px', marginTop:'10px' }}  >Você pesquisou por: <strong>{query}</strong></h2>
                    }

                    <Row  >
                        {
                            !isLoading ?(
                                movies.map((movie) => (
                                    <Collapse in={!isLoading} mountOnEnter = {true} >
                                    <Col key={movie.id} xs={12} sm={12} md={6} xmd={3} lg={3} xl={3} xll={2} style={{ marginBottom: '15px' }} className='d-flex align-items-center justify-content-center'>
                                        
                                        <MovieCard
                                            handleDeleteMovie = {handleDeleteMovie}
                                            title={movie.titulo}
                                            description={movie.descricao}
                                            poster={ movie.imagem.length > 0 ? 
                                            movie.imagem.find(img => img.fl_poster) 
                                            ? movie.imagem.find(img => img.fl_poster).url : null
                                             : null}
                                            grade={0}
                                            id={movie.id}   
                                        >
                                        </MovieCard>
                                    </Col>
                                    </Collapse>
                                ))
                            )
                                :
                                (
                                <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>
                                )
                        }
                    </Row>
                    <Pagination>{items}</Pagination>
                </Container>
            </div>
        </>

    )
}

export default Home;