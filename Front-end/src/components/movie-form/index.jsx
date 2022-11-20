import { useState } from "react";
import { Button, InputGroup, Modal, Form } from "react-bootstrap";
import apiClient from "../../api";
import NavBar from "../navbar";
import Swal from "sweetalert2";

export default function MovieForm() {

    const [nomeFilme, setNomeFilme] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataLanc, setDataLanc] = useState('');
    const [orcamento, setOrcamento] = useState('');
    const [lingOriginal, setLingOriginal] = useState('');
    const [status, setStatus] = useState('');
    const [bilheteria, setBilheteria] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [duracao, setDuracao] = useState('');
    const [nomeGenero, setNomeGenero] = useState('');
    const [videos, setVideos] = useState('');
    const [imagens, setImagens] = useState('');

    const [loading, setLoading] = useState(false);

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-12 row" style={{ marginTop: '20px' }}>
                        <h1>Preencha o campo clique em salvar</h1>
                        <InputGroup style={{ marginTop: '24px' }}>
                            <InputGroup.Text id="inputGroup-sizing-default">Nome do filme</InputGroup.Text>
                            <input value={nomeFilme} onChange={(ev) => {
                                setNomeFilme(ev.target.value)
                            }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </InputGroup>

                        <div className="col-12">
                            <InputGroup
                                style={{ marginTop: '24px' }}>
                                <InputGroup.Text id="inputGroup-sizing-default">Descrição</InputGroup.Text>
                                <input value={descricao} onChange={(ev) => {
                                    setDescricao(ev.target.value)
                                }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </InputGroup>
                        </div>

                        <InputGroup style={{ marginTop: '24px' }}>
                            <InputGroup.Text id="inputGroup-sizing-default">Sinopse</InputGroup.Text>
                            <textarea value={sinopse} onChange={(ev) => {
                                setSinopse(ev.target.value)
                            }} type="textarea" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </InputGroup>
                        
                        <div className="col-6">
                        <InputGroup style={{ marginTop: '24px' }}>
                            <InputGroup.Text id="inputGroup-sizing-default">Genero</InputGroup.Text>
                            <select value={nomeGenero} onChange={(ev) => {
                                setNomeGenero(ev.target.value)
                            }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </InputGroup>
                        </div>

                        <div className="col-6">
                            <InputGroup style={{ marginTop: '24px' }}>
                                <InputGroup.Text id="inputGroup-sizing-default">Data de lançamento</InputGroup.Text>
                                <input value={dataLanc} onChange={(ev) => {
                                    setDataLanc(ev.target.value)
                                }} type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </InputGroup>
                        </div>

                        <div className="col-6">
                            <InputGroup style={{ marginTop: '24px' }}>
                                <InputGroup.Text id="inputGroup-sizing-default">Orçamento</InputGroup.Text>
                                <InputGroup.Text id="inputGroup-sizing-default">R$</InputGroup.Text>
                                <input value={orcamento} onChange={(ev) => {
                                    setOrcamento(ev.target.value)
                                }} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                <InputGroup.Text id="inputGroup-sizing-default">.00</InputGroup.Text>
                            </InputGroup>
                        </div>

                        <div className="col-6">
                            <InputGroup style={{ marginTop: '24px' }}>
                                <InputGroup.Text id="inputGroup-sizing-default">Bilheteria</InputGroup.Text>
                                <InputGroup.Text id="inputGroup-sizing-default">R$</InputGroup.Text>
                                <input value={bilheteria} onChange={(ev) => {
                                    setBilheteria(ev.target.value)
                                }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                <InputGroup.Text id="inputGroup-sizing-default">.00</InputGroup.Text>
                            </InputGroup>
                        </div>

                        <div className="col-6">
                            <InputGroup style={{ marginTop: '24px' }}>
                                <InputGroup.Text id="inputGroup-sizing-default">Lingua original</InputGroup.Text>
                                <input value={lingOriginal} onChange={(ev) => {
                                    setLingOriginal(ev.target.value)
                                }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </InputGroup>
                        </div>

                        <div className="col-6">
                        <InputGroup style={{ marginTop: '24px' }}>
                            <InputGroup.Text id="inputGroup-sizing-default">Status</InputGroup.Text>
                            <Form.Select aria-label="Sizing example input">
                                <option>Selecione</option>
                                <option value="em producao">Em produção</option>
                                <option value="lancado">Lançado</option>
                            </Form.Select>
                        </InputGroup>
                        </div>

                        <InputGroup style={{ marginTop: '24px' }}>
                            <InputGroup.Text id="inputGroup-sizing-default">Duração</InputGroup.Text>
                            <input value={duracao} onChange={(ev) => {
                                setDuracao(ev.target.value)
                            }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </InputGroup>

                        <InputGroup style={{ marginTop: '24px' }}>
                            <InputGroup.Text id="inputGroup-sizing-default">Videos</InputGroup.Text>
                            <input value={videos} onChange={(ev) => {
                                setVideos(ev.target.value)
                            }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </InputGroup>

                        <InputGroup style={{ marginTop: '24px' }}>
                            <InputGroup.Text id="inputGroup-sizing-default">Imagens</InputGroup.Text>
                            <input value={imagens} onChange={(ev) => {
                                setImagens(ev.target.value)
                            }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </InputGroup>

                        <Button disabled={loading} onClick={async (ev) => {
                            ev.preventDefault();
                            console.log("Clicou em salvar")
                            setLoading(true);
                            apiClient.post('/genero', {
                                nome: nomeGenero
                            }).then((res) => {
                                console.log(res);
                                setLoading(false);
                                setNomeGenero('');
                                Swal.fire({
                                    title: 'Gênero cadastrado com sucesso!',
                                    icon: 'success',
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: '#3085d6',
                                })
                            })
                        }} style={{ marginTop: '16x' }} className='right'>{loading ? 'Aguarde...' : 'Salvar'}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}