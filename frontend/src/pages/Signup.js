import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import saturn from '../assets/favicon.png';
import '../App.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navegar = useNavigate();
    const { textoDigitado, cursorVisivel } = useTypingEffect(
        'Crie sua conta e comece a explorar o universo.',
        50,
        500
    );

    const lidarComSubmissao = async (evento) => {
        evento.preventDefault();
        setErro('');
        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            alert('Cadastro realizado com sucesso!');
            navegar('/login');
        } catch (err) {
            setErro(err.message);
        }
    };

    useEffect(() => {
        if (window.particlesJS) {
            window.particlesJS.load('particles-container', 'particlesjs-config.json');
        }
    }, []);

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
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: '24px',
        },
        imagemSaturno: {
            width: '25vw',
        },
        descricao: {
            maxWidth: '550px',
            fontSize: '1.2rem',
            color: 'rgb(220, 220, 220)',
        },
        formularioCadastro: {
            maxWidth: '400px',
            width: '90%',
        },
        botaoCadastrar: {
            backgroundColor: '#CC5513',
            borderColor: '#CC5513',
        },
    };

    return (
        <div style={estilos.containerPrincipal}>
            <div id="particles-container" style={estilos.particulas} />
            <div style={estilos.conteudoPrincipal}>
                <div className="d-flex flex-column">
                    <img src={saturn} alt="Saturno pixelado" style={estilos.imagemSaturno} />
                    <h1 className="text-center mt-3 text-white doto">Sistema Solar Explorer</h1>
                    <p style={estilos.descricao}>
                        {textoDigitado}
                        <span style={{ opacity: cursorVisivel ? 1 : 0 }}>|</span>
                    </p>
                </div>
                <div className="bg-white p-4 rounded shadow" style={estilos.formularioCadastro}>
                    <h2 className="text-center mb-4">Cadastre-se</h2>
                    <form onSubmit={lidarComSubmissao}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                required
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                aria-label="Email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha:</label>
                            <input
                                required
                                type="password"
                                id="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="form-control"
                                aria-label="Senha"
                            />
                        </div>
                        {erro && <p className="text-danger">{erro}</p>}
                        <button type="submit" className="btn btn-primary btn-block" style={estilos.botaoCadastrar}>
                            Cadastrar
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        Já tem uma conta? <Link to="/login">Faça login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

function useTypingEffect(texto, velocidadeDigitacao, velocidadeCursor) {
    const [textoDigitado, setTextoDigitado] = useState('');
    const [cursorVisivel, setCursorVisivel] = useState(true);
    const intervaloRef = useRef(null);
    const intervaloCursorRef = useRef(null);

    useEffect(() => {
        let indiceChar = 0;
        intervaloRef.current = setInterval(() => {
            if (indiceChar < texto.length) {
                setTextoDigitado(texto.substring(0, indiceChar + 1));
                indiceChar++;
            } else {
                clearInterval(intervaloRef.current);
            }
        }, velocidadeDigitacao);

        intervaloCursorRef.current = setInterval(() => {
            setCursorVisivel((prev) => !prev);
        }, velocidadeCursor);

        return () => {
            clearInterval(intervaloRef.current);
            clearInterval(intervaloCursorRef.current);
        };
    }, [texto, velocidadeDigitacao, velocidadeCursor]);

    return { textoDigitado, cursorVisivel };
}

export default Signup;