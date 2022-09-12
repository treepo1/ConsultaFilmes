import NavBar from "../navbar";
import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Spinner } from "react-bootstrap";
import {Container, Badge }from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { AiFillStar } from "react-icons/ai";
import unavailableImg from '../../assets/unavailable-image.jpg' 
import './style.css'


function MovieDetails(props) {
    const [details, setDetails] = useState({
        genres: [{id:0, name:'Indisponível'}],
        original_language: 'Indisponível',
        original_title:'Indisponível',
        overview:'Indisponível',
        popularity:0,
        budget:0,
        revenue: 0,
        poster_path:'Indisponível',
        runtime:0,
        vote_average:0,
        release_date:'Indisponível',
        title:'Indisponível',
        tagline:'Indisponível'
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getDetails = async () => {
            const details = await axios.get(`https://api.themoviedb.org/3/movie/${urlParams.id}?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&append_to_response=videos`)
            console.log(details)
            setDetails(details.data)
        }
        setLoading(true)
        getDetails()
        setLoading(false)
    }, [])
    const urlParams = useParams()
    return (
        <>
        <NavBar mode='detail'/>
        {loading ? 
        <Spinner animation="border" ></Spinner>
        :
        <Container fluid style={{marginTop:'20px'}} className='d-flex align-items-center justify-content-center'>
        <div id='pn-movie-details' style={{display:'flex', gap:'10px'}}>
            <div>
        <Card style={{ width:'18rem', padding:'5px'}} bg="dark"  text="white" >
        <Card.Img variant="top" src={details.poster_path ?
        'https://image.tmdb.org/t/p/w500' + details.poster_path :
        unavailableImg} />
        <Card.Body>
          <Card.Text >
            <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
          <AiFillStar/> {details.vote_average}
          </div>
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div id="movie-details" >
        <strong>Título</strong>{details.title || 'Indisponível'}
        <strong>Sinopse</strong>{details.overview || 'Indisponível'}
        <div>
        <strong>Gêneros: </strong> 
        {
            details.genres.map((genre) => (
                <>
                <Badge key={genre.id} bg="primary">{genre.name}</Badge>
                <span>{' '}</span>
                </>
            ))
        }
        </div>
        <strong>Duração</strong>{details.runtime} minutos
        <strong>Lançamento</strong>{details.release_date !== 'Indisponível' ?
        details.release_date.split('-')[2] + '/' + 
        details.release_date.split('-')[1] + '/'+
        details.release_date.split('-')[0] : 
        'Indisponível' }
        <strong>Orçamento: </strong><Badge pill bg="info"><NumericFormat 
        value={details.budget} 
        prefix={'$'} 
        displayType="text"
        decimalSeparator=","
        thousandSeparator="."/></Badge><span>{' '}</span>
        <strong>Lucro: </strong><Badge pill bg="success"><NumericFormat 
        value={details.revenue} 
        prefix={'$'} 
        displayType="text"
        decimalSeparator=","
        thousandSeparator="."/></Badge>
        </div>
        </div>
        </Container>
        }
        
        </>
    )
}

export default MovieDetails;