import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import saturn from '../assets/favicon.png';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navegar = useNavigate();
    const { textoDigitado, cursorVisivel } = useTypingEffect(
        'Descubra os segredos do universo e explore planetas incríveis',
        50,
        500
    );

    const lidarComSubmissao = async (evento) => {
        evento.preventDefault();
        setErro('');
        setCarregando(true);
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            onLogin(true);
            navegar('/home');
        } catch (err) {
            setErro(err.message);
        } finally {
            setCarregando(false);
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
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        imagemSaturno: {
            width: '25vw',
        },
        descricao: {
            fontSize: '1.2rem',
            color: 'rgb(220, 220, 220)',
        },
        formularioLogin: {
            maxWidth: '400px',
            width: '90%',
        },
        botaoEntrar: {
            backgroundColor: '#CC5513',
            borderColor: '#CC5513',
        },
    };

    return (
        <div style={estilos.containerPrincipal}>
            <div id="particles-container" style={estilos.particulas} />
            <div style={estilos.conteudoPrincipal}>
                <div className="d-flex flex-column">
                    <img src={saturn} alt="Saturno" style={estilos.imagemSaturno} />
                    <h1 className="text-center mt-3 doto">Sistema Solar Explorer</h1>
                    <p className="text-center" style={estilos.descricao}>
                        {textoDigitado}
                        <span style={{ opacity: cursorVisivel ? 1 : 0 }}>|</span>
                    </p>
                </div>
                <div className="bg-white p-4 rounded shadow" style={estilos.formularioLogin}>
                    <h2 className="text-center mb-4">Login</h2>
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
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            style={estilos.botaoEntrar}
                            disabled={carregando}
                        >
                            {carregando ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
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

export default Login;