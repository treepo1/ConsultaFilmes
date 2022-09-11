import MovieCard from "../../components/movie-card";
import NavBar from "../../components/navbar";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext } from "react";
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from "react-bootstrap";
import { MoviesContext } from "../../contexts/MoviesContext";
import { Pagination } from "react-bootstrap";


function Home() {

    const { movies, nextPage, prevPage, goToPage, isLoading, page, totalPages } = useContext(MoviesContext)

    const handlePrevPage = () => prevPage()
    const handleNextPage = () => nextPage()
    const handleClickPage = (page) => goToPage(page)

let active = page;
let items = [];
items.push(
<Pagination.Prev onClick={handlePrevPage} />
)

for (let number = 1; number <= 20; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active} onClick={()=>handleClickPage(number)}>
      {number}
    </Pagination.Item>,
  );
}
items.push(
    <Pagination.Ellipsis></Pagination.Ellipsis>
)
items.push(
    <Pagination.Next onClick={handleNextPage}></Pagination.Next>
)
items.push(
    <Pagination.Item onClick={()=>handleClickPage(totalPages-1)} >
    {totalPages}
  </Pagination.Item>
  )
    

    return (
        <>
            <NavBar mode='all'/>  
            <div style={{ padding: '30px' }}>
                <Container >
                    <h2 style={{ marginBottom: '25px' }}>Mais populares</h2>

                        
                    <Row  >
                        {
                            !isLoading ?(
                                movies.map((movie) => (
                                    <Col key={movie.id} xs={12} sm={12} md={6} xmd={3} lg={3} xl={3} xll={2} style={{ marginBottom: '15px' }}>
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
                    <Pagination>{items}</Pagination>
                </Container>
            </div>
        </>

    )
}

export default Home;