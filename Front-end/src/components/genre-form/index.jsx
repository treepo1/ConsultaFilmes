import { useState } from "react";
import { Button, InputGroup} from "react-bootstrap";
import apiClient from "../../api";
import NavBar from "../navbar";
import Swal from "sweetalert2";

export default function GenreForm() {

    const [nomeGenero, setNomeGenero] = useState('');
    const [loading, setLoading] = useState(false);

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
                        <Button disabled={loading} onClick={async (ev) => {
                            ev.preventDefault();
                            console.log("Clicou em salvar")
                            setLoading(true);
                            apiClient.post('/genero', {
                                nome: nomeGenero
                            }).then((res)=> {
                                console.log(res);
                                setLoading(false);
                                setNomeGenero('');
                                Swal.fire({
                                    title: 'Gênero cadastrado com sucesso!',
                                    icon: 'success',
                                    confirmButtonText: 'Ok',
                                    confirmButtonColor: '#3085d6',
                                })
                              })}}  style={{marginTop:'16x'}} className='right'>{loading ? 'Aguarde...' : 'Salvar'}</Button>
                    </InputGroup>
                </div>
            </div>
        </div>
        </>
        
    )
}