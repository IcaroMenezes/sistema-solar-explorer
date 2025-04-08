import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface PlanetFormData {
  name: string;
  description: string;
  diameter: number;
  distanceFromSun: number;
  numberOfMoons: number;
  surfaceTemperature: number;
  imageUrl: string;
}

export function CreatePlanet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<PlanetFormData>({
    name: '',
    description: '',
    diameter: 0,
    distanceFromSun: 0,
    numberOfMoons: 0,
    surfaceTemperature: 0,
    imageUrl: '',
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Criar URL temporária para preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Converter imagem para Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/planets', {
        name: formData.name,
        description: formData.description,
        diameter: formData.diameter,
        distanceFromSun: formData.distanceFromSun,
        numberOfMoons: formData.numberOfMoons,
        surfaceTemperature: formData.surfaceTemperature,
        imageUrl: formData.imageUrl,
        userId: user?.id
      });
      navigate('/planets');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar planeta');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'description' || name === 'imageUrl' ? value : Number(value)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-space-deep-blue">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-space-deep-blue relative">
      <div className="star-field"></div>
      
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Adicionar Novo Planeta</h1>
        <p className="text-muted-foreground">Preencha os detalhes do planeta para adicioná-lo ao sistema solar</p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/10 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-destructive">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Nome do Planeta
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-card border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Digite o nome do planeta"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-card border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              value={formData.description}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-foreground">
              Imagem do Planeta
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-space-accent/30 border-dashed rounded-lg bg-space-nebula/30">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                      <span className="text-white text-sm">Clique para alterar</span>
                    </div>
                  </div>
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-space-highlight/50"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-space-highlight/80">
                  <label
                    htmlFor="image-upload"
                    className="relative cursor-pointer rounded-md font-medium text-space-highlight hover:text-space-highlight/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-space-highlight/50"
                  >
                    <span>Enviar imagem</span>
                    <input
                      id="image-upload"
                      name="image-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs text-space-highlight/60">
                  PNG, JPG, GIF até 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="diameter" className="block text-sm font-medium text-foreground">
                  Diâmetro (km)
                </label>
                <input
                  id="diameter"
                  name="diameter"
                  type="number"
                  step="0.01"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-card border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Digite o diâmetro em quilômetros"
                  value={formData.diameter}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="distanceFromSun" className="block text-sm font-medium text-foreground">
                  Distância do Sol (km)
                </label>
                <input
                  id="distanceFromSun"
                  name="distanceFromSun"
                  type="number"
                  step="0.01"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-card border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Digite a distância do Sol em quilômetros"
                  value={formData.distanceFromSun}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="numberOfMoons" className="block text-sm font-medium text-foreground">
                  Número de Luas
                </label>
                <input
                  id="numberOfMoons"
                  name="numberOfMoons"
                  type="number"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-card border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.numberOfMoons}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="surfaceTemperature" className="block text-sm font-medium text-foreground">
                  Temperatura da Superfície (°C)
                </label>
                <input
                  id="surfaceTemperature"
                  name="surfaceTemperature"
                  type="number"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-card border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.surfaceTemperature}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/planets')}
            className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-input rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-gradient-to-r from-primary to-secondary rounded-md hover:from-primary/90 hover:to-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            disabled={loading}
          >
            Criar Planeta
          </button>
        </div>
      </form>

      <div className="relative z-10 mt-8 text-center max-w-md text-sm text-muted-foreground">
        Adicione novos planetas ao nosso sistema solar, compartilhe suas descobertas e explore o universo conosco.
      </div>
    </div>
  );
} 