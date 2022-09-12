import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {AiFillStar} from 'react-icons/ai';
import unavailableImg from '../../assets/unavailable-image.jpg'

function MovieFeature(props) {
    return ( 
      <div className='d-flex justify-content-center align-items-center'>
        <Card style={{ width: "400px", transition:'all ease 0.5s' }}>
        <Card.Img variant="bottom" src={props.poster || unavailableImg} style={{height:`${!props.poster? '10px':''}`}} />
      </Card>
      </div>
    )
}

export default MovieFeature;