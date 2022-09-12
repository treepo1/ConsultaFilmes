import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {AiFillStar} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom'
import unavailableImg from '../../assets/unavailable-image.jpg'

function MovieCard(props) {
    const navigate = useNavigate();
    return ( 
        <Card style={{ width: '14rem', padding:'5px', transition:'all ease 0.5s' }} bg="dark" text="white" >
        <Card.Img variant="top" src={props.poster || unavailableImg} style={{height:`${!props.poster? '320px':''}`}} />
        <Card.Body>
          <OverlayTrigger overlay={<Tooltip>{props.title}</Tooltip>}>
          <Card.Title className='text-truncate' style={{maxWidth:"250px"}}>{props.title}</Card.Title>
          </OverlayTrigger>
          <Card.Text >
            <AiFillStar/> {props.grade}
          </Card.Text>
          <Button onClick={ () => navigate(`/movie/${props.id}`)} variant="primary">Ver detalhes</Button>
        </Card.Body>
      </Card>
    )
}

export default MovieCard;