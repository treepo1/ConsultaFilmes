import { useState, useEffect } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import apiClient from "../../api";
import NavBar from "../navbar";
import Swal from "sweetalert2";
import { MDBSelect } from 'mdb-react-ui-kit';

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
    const [generos, setGeneros] = useState([]);
    const [IdGenero, setIdGenero] = useState('');
    const [imagem, setImagem] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        apiClient.get('/genero')
            .then(response => {
                setGeneros(response.data);
                setLoading(false);
            })
    }, [loading])

    console.log("Generos", generos[1])


    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-12 row" style={{ marginTop: '20px' }}>
                        <h1>Preencha os campos e clique em salvar</h1>
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
                                
                                <MDBSelect onChange={(ev) => {
                                    setIdGenero(ev.target.value)
                                }}
                                    {
                                        generos.map((genre) => (
                                        data = {
                                            [
                                                { text: genre.nome, value: genre.id }
                                            ]}
                                    ))
                                    }
                                />
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
                                }} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
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
                                <Form.Select aria-label="Sizing example input" onChange={(ev) => {
                                    setStatus(ev.target.value)
                                }}>
                                    <option>Selecione</option>
                                    <option value="em producao">Em produção</option>
                                    <option value="lancado">Lançado</option>
                                </Form.Select>
                            </InputGroup>
                        </div>


                        <div className="col-6">
                            <InputGroup style={{ marginTop: '24px' }}>
                                <InputGroup.Text id="inputGroup-sizing-default">Duração</InputGroup.Text>
                                <input value={duracao} onChange={(ev) => {
                                    setDuracao(ev.target.value)
                                }} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                <InputGroup.Text id="inputGroup-sizing-default">min</InputGroup.Text>
                            </InputGroup>
                        </div>

                        <div className="col-6">
                            <InputGroup style={{ marginTop: '24px' }}>
                                <InputGroup.Text id="inputGroup-sizing-default">Insira um poster</InputGroup.Text>
                                <input value={imagem} onChange={(ev) => {
                                    setImagem(ev.target.value)
                                }} type="text" placeholder="Insira um link" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </InputGroup>
                        </div>

                        <Button disabled={loading} onClick={async (ev) => {
                            ev.preventDefault();
                            console.log("Clicou em salvar")
                            setLoading(true);
                            console.log("Resposta", imagem);
                            apiClient.post('/filme', {
                                titulo: nomeFilme,
                                imagens: imagem[{ url: imagem, fl_poster: true }],
                                descricao: descricao,
                                data_lancamento: new Date(dataLanc).toISOString(),
                                orcamento: parseFloat(orcamento),
                                linguagem_original: lingOriginal,
                                status: status,
                                generos: [{ id: parseInt(IdGenero) }],
                                duracao: parseFloat(duracao),
                                sinopse: sinopse,
                                bilheteria: parseFloat(bilheteria),
                            }).then((res) => {
                                console.log("Resposta", res);
                                setLoading(false);
                                setNomeFilme('');
                                setDescricao('');
                                setDataLanc('');
                                setOrcamento('');
                                setLingOriginal('');
                                setStatus('');
                                setBilheteria('');
                                setSinopse('');
                                setDuracao('');
                                setImagem('');
                                setLoading('');
                                Swal.fire({
                                    title: 'Filme cadastrado com sucesso!',
                                    icon: 'success',
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: '#3085d6',
                                })
                            })
                        }} style={{ marginTop: '19x' }} className='mt-4'>{loading ? 'Aguarde...' : 'Salvar'}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}