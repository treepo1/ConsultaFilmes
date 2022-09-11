import MovieCard from "../../components/movie-card";
import NavBar from "../../components/navbar";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLayoutEffect, useState, useContext } from "react";
import Stack from 'react-bootstrap/Stack';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { Button } from "react-bootstrap";
import { MoviesContext } from "../../contexts/MoviesContext";


function Home() {

    const { movies, nextPage, prevPage, isLoading } = useContext(MoviesContext)

    const handlePrevPage = () => prevPage()
    const handleNextPage = () => nextPage()
    

    return (
        <>
            <NavBar mode='all'/>  
            <div style={{ padding: '30px' }}>
                <Container >
                    <h2 style={{ marginBottom: '25px' }}>Mais populares</h2>
                    <Stack direction="horizontal" style={{marginBottom:'20px'}} gap={3}>
                        <Button 
                        onClick={handlePrevPage}>Página anterior
                        </Button>  
                        <Button 
                        onClick={handleNextPage}
                    >Próxima página
                    </Button>   
                    </Stack>
  
                        
                    <Row  >
                        {
                            !isLoading ?(
                                movies.map((movie) => (
                                    <Col key={movie.id} xs={12} sm={12} md={6} xmd={3} lg={4} xl={4} xll={2} style={{ marginBottom: '15px' }}>
                                        <MovieCard
                                            title={movie.title}
                                            description={movie.overview}
                                            poster={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path: null}
                                            grade={movie.vote_average}
                                            id={movie.id}
                                        >
                                        </MovieCard>
                                    </Col>
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
                </Container>
            </div>
        </>

    )
}

export default Home;