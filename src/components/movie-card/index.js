import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'
import unavailableImg from '../../assets/unavailable-image.jpg'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BiEditAlt, BiX } from "react-icons/bi";
import './style.css';

function MovieCard(props) {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 800);
  };

  return (
    <AnimatePresence exitBeforeEnter >
      <motion.div

        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.75
        }}
        variants={{
          initialState: {
            opacity: 0,
          },
          animateState: {
            opacity: 1
          },
          exitState: {
          }
        }}>
        <Card style={{ width: '14rem', padding: '5px', transition: 'all ease 0.5s' }} bg="dark" text="white" >
          <div className='col-5'>
          <Button className='d-flex justify-content-end' onClick={() => navigate(`/movie/${props.id}`)} variant="primary" ><BiX /></Button>
          </div>
          <div
            style={{ background: "#ccc", width: "13rem" }}
            className={`${pulsing ? "pulse" : ""} loadable`}>
            <motion.img
              className="card-img"
              initial={{ opacity: 0 }}
              // style={{ height: imageLoading ? "6rem" : "auto" }}
              animate={{
                height: imageLoading && props.poster ? "16rem" : imageLoading && !props.poster ? "320" : "auto",
                opacity: imageLoading ? 0 : 1
              }}
              transition={
                ({ height: { delay: 0, duration: 0.4 } },
                  { opacity: { delay: 0.5, duration: 0.4 } })
              }
              onLoad={imageLoaded}
              src={props.poster || unavailableImg}
              style={{ height: `${!props.poster ? '320px' : ''}` }} />
          </div>
          <Card.Body>
            <OverlayTrigger overlay={<Tooltip>{props.title}</Tooltip>}>
              <Card.Title className='text-truncate' style={{ maxWidth: "250px" }}>{props.title}</Card.Title>
            </OverlayTrigger>
            <Card.Text >
              <AiFillStar /> {props.grade}
            </Card.Text>
            <div className='col-12 row'>
              <div className='col-10'>
                <Button onClick={() => navigate(`/movie/${props.id}`)} variant="primary">Ver detalhes</Button>
              </div>
              <div className='col-2'>
                <Button className='display-flex justify-content-end' onClick={() => navigate(`/movie/${props.id}`)} variant="primary" ><BiEditAlt /></Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

export default MovieCard;