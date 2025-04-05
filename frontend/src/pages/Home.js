import React, { useState, useEffect } from 'react';
import planetasMock from './planetasMock';
import PlanetaCard from '../components/planetCard';
import Header from '../components/header';
import AdicionarPlaneta from '../components/add';

function Home() {
    const [pesquisa, setPesquisa] = useState('');
    const [planetasFiltrados, setPlanetasFiltrados] = useState(planetasMock);
    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        if (window.particlesJS) {
            window.particlesJS.load('particles-container', 'particlesjs-config.json');
        }
    }, []);

    useEffect(() => {
        const filtrados = planetasMock.filter((planeta) =>
            planeta.nome.toLowerCase().includes(pesquisa.toLowerCase())
        );
        setPlanetasFiltrados(filtrados);
    }, [pesquisa]);

    const adicionarPlaneta = (novoPlaneta) => {
        setPlanetasFiltrados([...planetasFiltrados, novoPlaneta]);
        setModalAberto(false);
    };

    const estilos = {
        containerPrincipal: {
            position: 'relative',
            height: '100vh',
            width: '100vw',
            overflowX: 'hidden',
        },
        particulas: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
        },
        conteudoPrincipal: {
            position: 'relative',
            zIndex: 1,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        barraPesquisaContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0',
        },
        barraPesquisa: {
            width: '80%',
            maxWidth: '500px',
            marginRight: '32px',
            backgroundColor: '#222',
            borderColor: 'rgb(255, 123, 0)',
            color: 'white',
        },
        botaoAdicionar: {
            backgroundColor: 'rgb(255, 123, 0)',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
        },
        cardsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
        },
        mensagemNenhumPlaneta: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '1.2rem',
            color: '#ccc',
        },
    };

    return (
        <div style={estilos.containerPrincipal}>
            <div id="particles-container" style={estilos.particulas} />
            <div style={estilos.conteudoPrincipal}>
                <Header />
                <div style={estilos.barraPesquisaContainer}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Pesquisar planeta..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        style={estilos.barraPesquisa}
                        aria-label="Pesquisar planeta"
                    />
                    <button style={estilos.botaoAdicionar} onClick={() => setModalAberto(true)}>Adicionar Planeta</button>
                </div>
                <div style={estilos.cardsContainer}>
                    {planetasFiltrados.length > 0 ? (
                        planetasFiltrados.map((planeta) => (
                            <PlanetaCard key={planeta.id} planeta={planeta} />
                        ))
                    ) : (
                        <p style={estilos.mensagemNenhumPlaneta}>Nenhum planeta correspondente.</p>
                    )}
                </div>
                {modalAberto && <AdicionarPlaneta onAdicionar={adicionarPlaneta} onClose={() => setModalAberto(false)} />}
            </div>
        </div>
    );
}

export default Home;