import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {AiFillStar} from 'react-icons/ai';
import unavailableImg from '../../assets/unavailable-image.jpg'

function MovieFeature(props) {
    return ( 
        <Card style={{ width: '30rem', transition:'all ease 0.5s' }}>
        <Card.Img variant="right" src={props.poster || unavailableImg} style={{height:`${!props.poster? '10px':''}`}} />
      </Card>
    )
}

export default MovieFeature;