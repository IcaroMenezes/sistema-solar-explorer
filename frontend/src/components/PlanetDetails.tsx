import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { planetService } from '../services/api';

interface Planet {
  _id: string;
  name: string;
  description: string;
  diameter: number;
  distanceFromSun: number;
  numberOfMoons: number;
  surfaceTemperature: number;
  rotationPeriod: number;
  isCustom: boolean;
  image: string;
  hasRings: boolean;
}

export const PlanetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        if (id) {
          const data = await planetService.getPlanetById(id);
          setPlanet(data);
        }
      } catch (err) {
        setError('Erro ao carregar detalhes do planeta');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-space-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-space-highlight mx-auto"></div>
          <p className="mt-4 text-space-highlight">Carregando detalhes do planeta...</p>
        </div>
      </div>
    );
  }

  if (error || !planet) {
    return (
      <div className="min-h-screen bg-space-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive text-4xl mb-4">⚠️</div>
          <p className="text-white mb-4">{error || 'Planeta não encontrado'}</p>
          <Link
            to="/planets"
            className="text-space-highlight hover:text-space-accent transition-colors"
          >
            Voltar para a lista de planetas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-space-dark/60 backdrop-blur-xl shadow-[0_0_50px_rgba(165,148,249,0.15)] rounded-2xl border border-space-accent/20 overflow-hidden">
          <div className="relative h-64 md:h-96">
            {planet.image ? (
              <img
                src={planet.image}
                alt={planet.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x600?text=Imagem+não+encontrada';
                }}
              />
            ) : (
              <div className="w-full h-full bg-space-nebula/30 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-space-highlight/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent to-transparent" />
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{planet.name}</h1>
                <div className="flex gap-2">
                  {planet.isCustom && (
                    <span className="inline-block bg-space-accent/10 text-space-highlight text-xs px-3 py-1 rounded-full">
                      Planeta Personalizado
                    </span>
                  )}
                  {planet.hasRings && (
                    <span className="inline-block bg-space-accent/10 text-space-highlight text-xs px-3 py-1 rounded-full">
                      Possui Anéis
                    </span>
                  )}
                </div>
              </div>
              <Link
                to="/planets"
                className="px-4 py-2 rounded-lg border border-space-accent/30 text-white hover:bg-space-accent/10 transition-all duration-200"
              >
                Voltar
              </Link>
            </div>

            <p className="text-space-highlight/80 text-lg mb-8 leading-relaxed">
              {planet.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-space-nebula/20 p-4 rounded-lg">
                <div className="text-space-highlight/60 text-sm mb-1">Diâmetro</div>
                <div className="text-white font-medium text-lg">
                  {planet.diameter.toLocaleString()} km
                </div>
              </div>
              <div className="bg-space-nebula/20 p-4 rounded-lg">
                <div className="text-space-highlight/60 text-sm mb-1">Distância do Sol</div>
                <div className="text-white font-medium text-lg">
                  {planet.distanceFromSun.toLocaleString()} km
                </div>
              </div>
              <div className="bg-space-nebula/20 p-4 rounded-lg">
                <div className="text-space-highlight/60 text-sm mb-1">Número de Luas</div>
                <div className="text-white font-medium text-lg">
                  {planet.numberOfMoons}
                </div>
              </div>
              <div className="bg-space-nebula/20 p-4 rounded-lg">
                <div className="text-space-highlight/60 text-sm mb-1">Temperatura da Superfície</div>
                <div className="text-white font-medium text-lg">
                  {planet.surfaceTemperature}°C
                </div>
              </div>
              <div className="bg-space-nebula/20 p-4 rounded-lg">
                <div className="text-space-highlight/60 text-sm mb-1">Período de Rotação</div>
                <div className="text-white font-medium text-lg">
                  {Math.abs(planet.rotationPeriod)} horas {planet.rotationPeriod < 0 ? '(retrógrado)' : ''}
                </div>
              </div>
              <div className="bg-space-nebula/20 p-4 rounded-lg lg:col-span-3">
                <div className="text-space-highlight/60 text-sm mb-1">Sistema de Anéis</div>
                <div className="text-white font-medium text-lg flex items-center gap-2">
                  <span>{planet.hasRings ? 'Possui anéis' : 'Não possui anéis'}</span>
                  {planet.hasRings && (
                    <svg 
                      className="w-6 h-6 text-space-highlight" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 