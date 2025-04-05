import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import saturn from '../assets/favicon.png';

function Header() {
    const navegar = useNavigate();

    const lidarComSaida = () => {
        auth.signOut().then(() => {
            console.log('Usuário saiu!');
            navegar('/login');
        }).catch((error) => {
            console.error('Erro ao sair:', error);
        });
    };

    const estilos = {
        botaoSair: {
            backgroundColor: '#d9534f',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            marginLeft: 'auto',
        },
    };

    return (
        <header className="d-flex align-items-center bg-dark text-white p-3">
            <img className="ml-2" src={saturn} alt="Saturno" style={{ width: '80px' }} />
            <h1 className="ml-3" style={{ fontFamily: 'Doto, monospace' }}>Sistema Solar Explorer</h1>
            <button style={estilos.botaoSair} onClick={lidarComSaida}>Sair</button>
        </header>
    );
}

export default Header;