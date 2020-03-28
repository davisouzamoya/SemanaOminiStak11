import React,{ useState,useEffect } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './style.css'

import LogoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([])

    const history = useHistory();
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(() =>{ 
        api.get('profile',{
            headers:{
                Authorization:ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
        }, [ongId])

        async function handDeleteIncident(id){
            try {
                await api.delete(`incidents/${id}`,{
                    headers:{
                        Authorization:ongId,
                    }
                });

                setIncidents(incidents.filter(incident => incident.id !== id))
            }catch(err){
                alert('Erro ao deletar caso, tente novamente')
            }
        }

        function handleLogout(){
            localStorage.clear()

            history.push('/')
        }
    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Be The Hero"/>
                    <span>Bem Vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                    <button onClick={handleLogout} type="button">
                        <FiPower size={20} color="#E02041"/>
                        </button>      
            </header>

            <h1>Casos cadastrado</h1>

            <ul>
               {incidents.map(incidents =>(
                    <li key={incidents.id}>
                    <strong>CASOS:</strong>
                     <p>{incidents.title}</p>

                    <strong>DESCRICAO:</strong>
                    <p>{incidents.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incidents.value)}</p>

                    <button onClick={() => handDeleteIncident(incidents.id)} type="button">
                        <FiTrash2  size={20} color="#a8a8b3"/>
                    </button>
                </li>
               ))}
            </ul>
        </div>
    )
}