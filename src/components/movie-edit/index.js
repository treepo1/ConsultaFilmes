import NavBar from "../navbar";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Spinner } from "react-bootstrap";
import { Container, Badge } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { AiFillStar } from "react-icons/ai";
import unavailableImg from '../../assets/unavailable-image.jpg'
import './style.css'
import Youtube from "react-youtube"
import apiClient from "../../api";


function MovieEdit(props) {
    const [details, setDetails] = useState({
        genres: [{ id: 0, name: 'Indisponível' }],
        original_language: 'Indisponível',
        original_title: 'Indisponível',
        overview: 'Indisponível',
        popularity: 0,
        budget: 0,
        revenue: 0,
        poster_path: 'Indisponível',
        runtime: 0,
        vote_average: 0,
        release_date: 'Indisponível',
        title: 'Indisponível',
        tagline: 'Indisponível',
        video: '',
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getDetails = async () => {
            const res = await apiClient.get(`/filme/${urlParams.id}`)
            console.log(res)
            setDetails({
                ...details,
                title: res.data.titulo,
                overview: res.data.filme.sinopse,
                budget: res.data.orcamento,
                revenue: res.data.filme.bilheteria,
                runtime: res.data.filme.duracao,
                poster_path: res.data.imagem ?
                    res.data.imagem.find(img => img.fl_poster).url : null,
                release_date: new Date(res.data.data_lancamento).toLocaleDateString(),
                genres: res.data.conteudo_genero.map((genre) => ({ id: genre.genero.id, name: genre.genero.nome })),
                video: res.data.video.length > 0 ? res.data.video.find(video => video.fl_trailer).url : '',
            })
        }
        setLoading(true)
        getDetails()
        setLoading(false)
    }, [])
    const urlParams = useParams()
    return (
        <>
            <NavBar mode='detail' />
            {loading ?
                <Spinner animation="border" ></Spinner>
                :
                <Container fluid style={{ marginTop: '20px' }} className='d-flex align-items-center justify-content-center'>
                    <div id='pn-movie-details' style={{ display: 'flex', gap: '10px' }}>
                        <div>
                            <Card style={{ width: '18rem', padding: '5px' }} bg="dark" text="white" >
                                <Card.Img variant="top" src={
                                    details.poster_path ?
                                        details.poster_path : unavailableImg} />
                                <Card.Body>
                                    <Card.Text >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <AiFillStar /> {0}
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div id="movie-details" >
                            <strong>Título</strong>
                            {details.title || 'Indisponível'}
                            <input value={details.title || 'Indisponível'} onChange={(ev) => {
                                setNomeFilme(ev.target.value)
                            }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />

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
                                details.release_date : 'Indisponível'}
                            <strong>Orçamento: </strong><Badge pill bg="info"><NumericFormat
                                value={details.budget}
                                prefix={'$'}
                                displayType="text"
                                decimalSeparator=","
                                thousandSeparator="." /></Badge><span>{' '}</span>
                            <strong>Lucro: </strong><Badge pill bg="success"><NumericFormat
                                value={details.revenue}
                                prefix={'$'}
                                displayType="text"
                                decimalSeparator=","
                                thousandSeparator="." /></Badge>
                            {
                                details.video !== "" ?
                                    <Youtube
                                        style={{ marginTop: '20px' }}
                                        opts={{ width: '100%' }}
                                        videoId={details.video.split('https://www.youtube.com/watch?v=')[1]} >
                                    </Youtube> : <></>
                            }

                        </div>
                    </div>

                </Container>
            }

        </>
    )
}

export default MovieDetails;