import MovieCard from "../../components/movie-card";
import NavBar from "../../components/navbar";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLayoutEffect, useState } from "react";
import Stack from 'react-bootstrap/Stack';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import { Button } from "react-bootstrap";


function Home() {
    const [movies, setMovies] = useState([{
        title: '',
        overview: '',
        poster_path: ''
    }])

    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1);

    useLayoutEffect(() => {
        const getMovieData = async () => {
            setLoading(true)
            const popularMovies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&page=${page}`)
            console.log(popularMovies)
            setMovies(popularMovies.data.results)
        }
        getMovieData();
        setLoading(false)


    }, [page])
    return (
        <>
            <NavBar />  
            <div style={{ padding: '30px' }}>
                <Container >
                    <h2 style={{ marginBottom: '25px' }}>Mais populares</h2>
                    <Stack direction="horizontal" style={{marginBottom:'20px'}} gap={3}>
                        <Button 
                        onClick={() => {
                            page - 1 > 1 ? setPage(page - 1) : setPage(1)
                        }}>Página anterior
                        </Button>  
                        <Button 
                        onClick={() => setPage(page + 1)}
                    >Próxima página
                    </Button>   
                    </Stack>
  
                        
                    <Row  >
                        {
                            !loading ?(
                                movies.map((movie) => (
                                    <Col key={movie.id} xs={12} sm={12} md={6} xmd={3} lg={4} xl={4} xll={2} style={{ marginBottom: '15px' }}>
                                        <MovieCard
                                            title={movie.title}
                                            description={movie.overview}
                                            poster={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
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