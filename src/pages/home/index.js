import MovieCard from "../../components/movie-card";
import MovieFeature from "../../components/movie-feature";
import NavBar from "../../components/navbar";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Ratio from 'react-bootstrap/Ratio';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Collapse } from "react-bootstrap";
import { MoviesContext } from "../../contexts/MoviesContext";
import { Pagination } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import { useState } from "react";
import Tabs from 'react-bootstrap/Tabs';
import {useNavigate} from 'react-router-dom'




function Home() {
    const itemPerPage = 10
    const { movies, moviesTop, nextPage, prevPage, goToPage, isLoading, page, totalPages, filterFor, filter, mode, query } = useContext(MoviesContext)

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



return (
    <>
            <NavBar mode='all'/>  
            <div style={{ padding: '30px' }}>
                
                
                
            <Row >
                        {
                            !isLoading && mode !== "search" ?(
                                <Col xs={12} sm={12} md={12} xmd={12} lg={12} xl={12} xll={12} style={{ marginBottom: '15px' }}>
                                <h2 style={{marginBottom: "10px"}}>Top filmes</h2>
                                <Carousel style={{width:"100%",backgroundColor:"#212529", borderRadius:"10px"}}>
                                {
                                moviesTop.map((movie) => (
                                    <Carousel.Item style={{maxWidth:"100%", padding:"20px"}} interval= {5000}>
                                        <div className= "d-flex justify-content-center align-items-center">
                                        <Image fluid rounded thumbnail style = {{opacity: "0.9", marginBottom: "20px", cursor:"pointer", border:"100px solid-black"}}src={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path: null} onClick={ () => navigate(`/movie/${movie.id}`)} >
                                        </Image>
                                        </div>
                                    </Carousel.Item>

                                ))}
                                </Carousel>
                                </Col>
                            )
                            : 
                            mode != "search" ?
                            (
                                <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner>
                                )
                            :
                            <>
                            </>
                        }
                    </Row>
                
                
                
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
                                            title={movie.title}
                                            description={movie.overview}
                                            poster={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path: null}
                                            grade={movie.vote_average}
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