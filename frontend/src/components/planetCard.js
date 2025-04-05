import React from 'react';
import imagem from '../assets/saturn.png'

function PlanetaCard({ planeta }) {
    return (
        <div
            className="card"
            style={{
                width: '250px', // Reduzimos a largura do card
                height: '300px',
                margin: '15px', // Reduzimos a margem do card
                border: '2px solid,rgb(255, 123, 0)',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 8px 16px rgba(255, 123, 0, 0.29)',
                backgroundColor: 'white',
                fontFamily: 'Courier New, monospace',
            }}
        >
            <img
                src={imagem}
                className="card-img-top"
                alt={planeta.nome}
                style={{ height: '150px', objectFit: 'cover' }} // Reduzimos a altura da imagem
            />
            <div className="card-body" style={{ padding: '15px' }}> {/* Reduzimos o padding do card-body */}
                <h5 className="card-title" style={{ fontWeight: '700' }}>{planeta.nome}</h5>
                <p className="card-text">{planeta.descricao}</p> {/* Reduzimos o tamanho da fonte da descrição */}
            </div>
        </div>
    );
}

export default PlanetaCard;