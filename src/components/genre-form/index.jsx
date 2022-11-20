import { useState, useEffect } from "react";
import { Button, InputGroup, Modal } from "react-bootstrap";
import apiClient from "../../api";
import NavBar from "../navbar";
import Swal from "sweetalert2";

export default function GenreForm() {

    const [generos, setGeneros] = useState([]);
    const [nomeGenero, setNomeGenero] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [idGenero, setIdGenero] = useState(0);
    const [save, setSave]= useState(0);


    useEffect(() => {
        setLoading(true)
        apiClient.get('/genero')
            .then(response => {
                setGeneros(response.data);
                setLoading(false);
            })
    }, [loading])


    const handleSubmit = (event) => {
        event.preventDefault();
        if(nomeGenero === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha o campo!',
                })
            return
            }
        setLoading(true);

        if(isEdit) {
            apiClient.put(`/genero/${idGenero}`, {
                nome: nomeGenero
            })
            .then(response => {
                setLoading(false);
                setIsEdit(false);
                setIdGenero(0);
                setNomeGenero('');
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Gênero editado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            })
        }
        else {
            apiClient.post('/genero', { nome: nomeGenero })
            .then(response => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Gênero cadastrado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                setNomeGenero('');
                setLoading(false);
            })
        }
        setSave(save + 1)

        }


    const handleEdit = (id) => {
        const genero = generos.find(genero => genero.id === id);
        setNomeGenero(genero.nome);
        setIsEdit(true);
        setIdGenero(id);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText:'Cancelar'
            }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)
                apiClient.delete(`/genero/${id}`)
                .then(response => {
                    Swal.fire(
                    'Deletado!',
                    'O gênero foi deletado com sucesso.',
                    'success'
                    )
                    setLoading(false);
                })
            }
        })
    }

    return (
        <>
        <NavBar/>
        <div className="container">
            <div className="row">
                <div className="col-12" style={{marginTop:'20px'}}>
                    <h1>Preencha o campo clique em salvar</h1>
                    <InputGroup style={{marginTop:'24px'}}>
                        <InputGroup.Text id="inputGroup-sizing-default">Nome do gênero</InputGroup.Text>
                        <input value={nomeGenero} onChange={(ev) => {
                            setNomeGenero(ev.target.value)
                        }} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        <Button disabled={loading} onClick={handleSubmit}  style={{marginTop:'16x'}} className='right'>{loading ? 'Aguarde...' : 'Salvar'}</Button>
                    </InputGroup>

                    <div className="row" style={{marginTop:'48px'}}>
                        <div className="col-12">
                            <h1>Lista de gêneros</h1>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>{" "}</th>
                                        <th>{" "}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {generos.map((genero) => {
                                        return (
                                            <tr>
                                                <td>{genero.nome}</td>
                                                <td><Button onClick={() => handleEdit(genero.id)}>Editar</Button></td>
                                                <td><Button onClick={() => handleDelete(genero.id)}>Excluir</Button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                    </div>
                   
                </div>
            </div>
        </div>
        </div>
        </>
        )
}