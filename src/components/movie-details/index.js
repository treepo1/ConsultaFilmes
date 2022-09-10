import NavBar from "../navbar";
import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Card } from "react-bootstrap";
import {Container, Badge }from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { AiFillStar } from "react-icons/ai";


function MovieDetails(props) {
    const [details, setDetails] = useState({
        genres: [],
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
    useEffect(() => {
        const getDetails = async () => {
            const details = await axios.get(`https://api.themoviedb.org/3/movie/${urlParams.id}?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&append_to_response=videos`)
            console.log(details)
            setDetails(details.data)
        }
        getDetails()
    }, [])
    const urlParams = useParams()
    return (
        <>
        <NavBar/>
        <Container style={{display:'flex', margin:'20px'}}>
        <div style={{display:'flex', gap:'10px'}}>
            <div>
        <Card style={{ width:'18rem', padding:'5px' }} bg="dark"  text="white">
        <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500' + details.poster_path} />
        <Card.Body>
          <Card.Text >
            <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
          <AiFillStar/> {details.vote_average}
          </div>
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
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
        <strong>Lançamento</strong>{details.release_date.split('-')[2] + '/' + 
        details.release_date.split('-')[1] + '/'+
        details.release_date.split('-')[0] }
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
        </>
    )
}

export default MovieDetails;