import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {AiFillStar} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom'

function MovieCard(props) {
    const navigate = useNavigate();
    return ( 
        <Card style={{ width: '18rem', padding:'5px' }} bg="dark" text="white">
        <Card.Img variant="top" src={props.poster} />
        <Card.Body>
          <Card.Title className='text-truncate' style={{maxWidth:"250px"}}>{props.title}</Card.Title>
          <Card.Text >
            <AiFillStar/> {props.grade}
          </Card.Text>
          <Button onClick={ () => navigate(`/movie/${props.id}`)} variant="primary">Ver detalhes</Button>
        </Card.Body>
      </Card>
    )
}

export default MovieCard;