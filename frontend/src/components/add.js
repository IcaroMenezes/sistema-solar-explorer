import React, { useState } from 'react';

function AdicionarPlaneta({ onAdicionar, onClose }) {
    const [nome, setNome] = useState('');
    const [diametro, setDiametro] = useState('');
    const [periodoRotacao, setPeriodoRotacao] = useState('');
    const [distanciaSol, setDistanciaSol] = useState('');
    const [aneis, setAneis] = useState(false);
    const [imagem, setImagem] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const novoPlaneta = {
            nome,
            diametro,
            periodoRotacao,
            distanciaSol,
            aneis,
            imagem,
        };
        onAdicionar(novoPlaneta);
        setNome('');
        setDiametro('');
        setPeriodoRotacao('');
        setDistanciaSol('');
        setAneis(false);
        setImagem('');
    };

    const estilos = {
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modalContent: {
            background: 'white',
            padding: '20px',
            borderRadius: '5px',
            maxWidth: '600px',
            width: '90%',
            position: 'relative',
        },
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            fontSize: '1.5rem',
            padding: '5px',
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '10px',
            marginBottom: '15px',
        },
        formLabel: {
            textAlign: 'right',
            paddingRight: '10px',
            alignSelf: 'center',
        },
        formInput: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        submitButton: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#CC5513',
            borderColor: '#CC5513',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        tituloModal: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        toggleSwitch: {
            position: 'relative',
            display: 'inline-block',
            width: '60px',
            height: '34px',
        },
        toggleSwitchInput: {
            opacity: 0,
            width: 0,
            height: 0,
        },
        toggleSlider: {
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#ccc',
            transition: '.4s',
            borderRadius: '34px',
        },
        toggleSliderBefore: {
            position: 'absolute',
            content: '""',
            height: '26px',
            width: '26px',
            left: '4px',
            bottom: '4px',
            backgroundColor: 'white',
            transition: '.4s',
            borderRadius: '50%',
        },
    };

    return (
        <div style={estilos.modalOverlay}>
            <div style={estilos.modalContent}>
                <button style={estilos.closeButton} onClick={onClose}>
                    &times;
                </button>
                <h2 style={estilos.tituloModal}>Adicionar Novo Planeta</h2>
                <form onSubmit={handleSubmit}>
                    <div style={estilos.formGrid}>
                        <label htmlFor="nome" style={estilos.formLabel}>Nome:</label>
                        <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required style={estilos.formInput} />

                        <label htmlFor="diametro" style={estilos.formLabel}>Diâmetro:</label>
                        <input type="number" id="diametro" value={diametro} onChange={(e) => setDiametro(e.target.value)} required style={estilos.formInput} />

                        <label htmlFor="periodoRotacao" style={estilos.formLabel}>Período de Rotação:</label>
                        <input type="text" id="periodoRotacao" value={periodoRotacao} onChange={(e) => setPeriodoRotacao(e.target.value)} required style={estilos.formInput} />

                        <label htmlFor="distanciaSol" style={estilos.formLabel}>Distância do Sol:</label>
                        <input type="text" id="distanciaSol" value={distanciaSol} onChange={(e) => setDistanciaSol(e.target.value)} required style={estilos.formInput} />

                        <label htmlFor="aneis" style={estilos.formLabel}>Anéis:</label>
                        <label style={estilos.toggleSwitch}>
                            <input
                                type="checkbox"
                                style={estilos.toggleSwitchInput}
                                checked={aneis}
                                onChange={(e) => setAneis(e.target.checked)}
                            />
                            <span style={estilos.toggleSlider}>
                                <span style={estilos.toggleSliderBefore} />
                            </span>
                        </label>

                        <label htmlFor="imagem" style={estilos.formLabel}>Imagem:</label>
                        <input type="file" id="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} required style={estilos.formInput} />
                    </div>
                    <button type="submit" style={estilos.submitButton}>Adicionar Planeta</button>
                </form>
            </div>
        </div>
    );
}

export default AdicionarPlaneta;