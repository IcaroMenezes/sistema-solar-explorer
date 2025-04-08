import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { planetService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import AddPlanetModal from './AddPlanetModal';

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

export const PlanetList: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const data = await planetService.getAllPlanets();
        setPlanets(data);
      } catch (err) {
        setError('Erro ao carregar planetas');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePlanetAdded = async () => {
    try {
      const data = await planetService.getAllPlanets();
      setPlanets(data);
    } catch (err) {
      setError('Erro ao atualizar lista de planetas');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-space-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-space-highlight mx-auto"></div>
          <p className="mt-4 text-space-highlight">Carregando planetas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-space-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive text-4xl mb-4">⚠️</div>
          <p className="text-white">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Sistema Solar Explorer</h1>
            <p className="text-space-highlight/80">Explore os planetas do nosso sistema solar</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-space-accent hover:bg-space-highlight text-white font-medium rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              Adicionar Planeta
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-space-dark hover:bg-space-nebula text-white font-medium rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planets.map((planet) => (
            <Link
              key={planet._id}
              to={`/planets/${planet._id}`}
              className="group bg-space-dark/60 backdrop-blur-xl rounded-2xl border border-space-accent/20 overflow-hidden hover:shadow-[0_0_50px_rgba(165,148,249,0.15)] transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                {planet.image ? (
                  <img
                    src={planet.image}
                    alt={planet.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x200?text=Imagem+não+encontrada';
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-space-nebula/30 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-space-highlight/30"
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
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-space-highlight transition-colors">
                  {planet.name}
                </h2>
                <p className="text-space-highlight/80 mb-6 line-clamp-2">{planet.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-space-nebula/20 p-3 rounded-lg">
                    <div className="text-space-highlight/60 text-sm">Diâmetro</div>
                    <div className="text-white font-medium">{planet.diameter.toLocaleString()} km</div>
                  </div>
                  <div className="bg-space-nebula/20 p-3 rounded-lg">
                    <div className="text-space-highlight/60 text-sm">Distância do Sol</div>
                    <div className="text-white font-medium">{planet.distanceFromSun.toLocaleString()} km</div>
                  </div>
                  <div className="bg-space-nebula/20 p-3 rounded-lg">
                    <div className="text-space-highlight/60 text-sm">Rotação</div>
                    <div className="text-white font-medium">
                      {Math.abs(planet.rotationPeriod)}h {planet.rotationPeriod < 0 ? '↺' : '↻'}
                    </div>
                  </div>
                  <div className="bg-space-nebula/20 p-3 rounded-lg">
                    <div className="text-space-highlight/60 text-sm">Temperatura</div>
                    <div className="text-white font-medium">{planet.surfaceTemperature}°C</div>
                  </div>
                </div>

                {planet.isCustom && (
                  <div className="mt-4">
                    <span className="inline-block bg-space-accent/10 text-space-highlight text-xs px-3 py-1 rounded-full">
                      Personalizado
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <AddPlanetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlanetAdded={handlePlanetAdded}
      />
    </div>
  );
}; 