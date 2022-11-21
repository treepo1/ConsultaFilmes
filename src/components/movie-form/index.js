import { useState, useEffect } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import apiClient from "../../api";
import NavBar from "../navbar";
import Swal from "sweetalert2";
import Select from 'react-select';

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
    const [generosFilme, setGenerosFilme] = useState([]);
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

    useEffect(() => {
        const getMovie = async () => {
            const res = await apiClient.get(`/filme/${urlParams.id}`)
            setNomeFilme(res.data.titulo)
            setDescricao(res.data.descricao)
            setDataLanc(new Date(res.data.data_lancamento).toLocaleDateString())
            setOrcamento(res.data.orcamento)
            setLingOriginal(res.data.linguagem_original)
            setStatus(res.data.status)
            setSinopse(res.data.filme.sinopse)
            setBilheteria(res.data.filme.bilheteria)
            setDuracao(res.data.filme.duracao)
            setImagem(res.data.imagem ? res.data.imagem.find(img => img.fl_poster).url : null)
            setGenerosFilme(res.data.conteudo_genero.map((genre) => ({ value: genre.genero.id, label: genre.genero.nome })))
        }
        if(urlParams.id){
        setLoading(true)
        getMovie()
        setLoading(false)
        }
    }, [])

    const opcoes = generos.map((genero) => {
        return { value: genero.id, label: genero.nome }
    })

    const urlParams = useParams()

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
                                <InputGroup.Text id="inputGroup-sizing-default">Generos</InputGroup.Text>
                                <Select
                                    defaultValue={opcoes.filter(option => generosFilme.some(g=> g.value = option.value))}
                                    options={opcoes}
                                    className="basic-multi-select"
                                    closeMenuOnSelect={false}
                                    isMulti
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
                                    <option value="em producao" defaultValue={status}>Em produção</option>
                                    <option value="lancado" defaultValue={status}>Lançado</option>
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
                            if (urlParams) {
                                ev.preventDefault();
                                apiClient.put(`/filme/${urlParams.id}`, {
                                    titulo: nomeFilme,
                                    imagens: imagem[{ url: imagem, fl_poster: true }],
                                    descricao: descricao,
                                    data_lancamento: new Date(dataLanc).toISOString(),
                                    orcamento: parseFloat(orcamento),
                                    linguagem_original: lingOriginal,
                                    status: status,
                                    generos: generosFilme,
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
                                        title: 'Filme atualizado com sucesso!',
                                        icon: 'success',
                                        confirmButtonText: 'Ok',
                                        confirmButtonColor: '#3085d6',
                                    })
                                })
                            } else {
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
                                    generos: generosFilme,
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
                            }
                        }} style={{ marginTop: '19x' }} className='mt-4'>{loading ? 'Aguarde...' : 'Salvar'}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}