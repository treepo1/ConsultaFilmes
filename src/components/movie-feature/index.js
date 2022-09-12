import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {AiFillStar} from 'react-icons/ai';
import unavailableImg from '../../assets/unavailable-image.jpg'

function MovieFeature(props) {
    return ( 
        <Card className='d-flex justify-content-center align-items-center h-100' style={{ alignItems:"center", justifyContent:"center",  width: "400px", transition:'all ease 0.5s' }}>
        <Card.Img variant="bottom" src={props.poster || unavailableImg} style={{height:`${!props.poster? '10px':''}`}} />
      </Card>
    )
}

export default MovieFeature;