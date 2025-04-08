import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createPlanet, Planet } from '../services/PlanetService';

interface AddPlanetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanetAdded: () => void;
}

const AddPlanetModal: React.FC<AddPlanetModalProps> = ({ isOpen, onClose, onPlanetAdded }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Planet, 'id' | 'isCustom' | 'createdBy'>>({
    name: '',
    description: '',
    diameter: 0,
    distanceFromSun: 0,
    numberOfMoons: 0,
    surfaceTemperature: 0,
    rotationPeriod: 24,
    image: '',
    hasRings: false
  });
  const [isRetrograde, setIsRetrograde] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'rotationPeriod') {
      const numValue = Math.max(0.1, Math.abs(Number(value)));
      setFormData(prev => ({
        ...prev,
        rotationPeriod: isRetrograde ? -numValue : numValue
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hasRings' 
        ? value === '1'
        : type === 'number' 
          ? Number(value) || 0
          : value
    }));
  };

  const handleRotationDirectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIsRetrograde = e.target.checked;
    setIsRetrograde(newIsRetrograde);
    setFormData(prev => ({
      ...prev,
      rotationPeriod: newIsRetrograde ? -Math.abs(prev.rotationPeriod || 24) : Math.abs(prev.rotationPeriod || 24)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.rotationPeriod || Math.abs(formData.rotationPeriod) < 0.1) {
      setError('O período de rotação deve ser maior que 0.1 horas');
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const dataToSubmit = {
        ...formData,
        rotationPeriod: isRetrograde ? -Math.abs(formData.rotationPeriod) : Math.abs(formData.rotationPeriod),
        isCustom: true,
        createdBy: user.userId
      };

      await createPlanet(dataToSubmit);

      onPlanetAdded();
      onClose();
      setFormData({
        name: '',
        description: '',
        diameter: 0,
        distanceFromSun: 0,
        numberOfMoons: 0,
        surfaceTemperature: 0,
        rotationPeriod: 24,
        image: '',
        hasRings: false
      });
      setIsRetrograde(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar planeta');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl border border-gray-700">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Adicionar Novo Planeta</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <form id="planetForm" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nome do Planeta
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Terra"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva o planeta..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="diameter" className="block text-sm font-medium text-gray-300 mb-2">
                  Diâmetro (km)
                </label>
                <input
                  type="number"
                  id="diameter"
                  name="diameter"
                  value={formData.diameter}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="distanceFromSun" className="block text-sm font-medium text-gray-300 mb-2">
                  Distância do Sol (km)
                </label>
                <input
                  type="number"
                  id="distanceFromSun"
                  name="distanceFromSun"
                  value={formData.distanceFromSun}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="numberOfMoons" className="block text-sm font-medium text-gray-300 mb-2">
                  Número de Luas
                </label>
                <input
                  type="number"
                  id="numberOfMoons"
                  name="numberOfMoons"
                  value={formData.numberOfMoons}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="surfaceTemperature" className="block text-sm font-medium text-gray-300 mb-2">
                  Temperatura da Superfície (°C)
                </label>
                <input
                  type="number"
                  id="surfaceTemperature"
                  name="surfaceTemperature"
                  value={formData.surfaceTemperature}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="rotationPeriod" className="block text-sm font-medium text-gray-300 mb-2">
                  Período de Rotação (horas)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="rotationPeriod"
                    name="rotationPeriod"
                    value={Math.abs(formData.rotationPeriod)}
                    onChange={handleChange}
                    required
                    min="0.1"
                    step="0.1"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-300">Retrógrado:</label>
                    <input
                      type="checkbox"
                      checked={isRetrograde}
                      onChange={handleRotationDirectionChange}
                      className="w-4 h-4 bg-gray-700/50 border border-gray-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {isRetrograde ? 'Rotação retrógrada (sentido horário)' : 'Rotação normal (sentido anti-horário)'} - 
                  {Math.abs(formData.rotationPeriod).toFixed(1)} horas
                </p>
              </div>

              <div className="md:col-span-2 flex items-center justify-between gap-4">
                <label htmlFor="hasRings" className="text-sm font-medium text-gray-300">
                  Possui Anéis?
                </label>
                <div className="relative w-32">
                  <input
                    type="range"
                    id="hasRings"
                    name="hasRings"
                    min="0"
                    max="1"
                    step="1"
                    value={formData.hasRings ? "1" : "0"}
                    onChange={handleChange}
                    className="w-full h-1.5 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-space-highlight"
                  />
                  <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-xs text-gray-400">
                    <span>Não</span>
                    <span>Sim</span>
                  </div>
                  <div className="absolute -top-5 left-0 right-0 text-center">
                    <span className="text-xs font-medium text-space-highlight">
                      {formData.hasRings ? 'Sim' : 'Não'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                URL da Imagem
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://exemplo.com/imagem.jpg"
              />
              {formData.image && (
                <div className="mt-2 relative">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg border border-gray-600 overflow-hidden">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x200?text=Imagem+inválida';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-gray-700 bg-gray-800/90">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="planetForm"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando...' : 'Criar Planeta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlanetModal; 