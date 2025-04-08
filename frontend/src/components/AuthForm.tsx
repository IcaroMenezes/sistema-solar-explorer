import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

interface AuthFormProps {
  isLogin: boolean;
}

export function AuthForm({ isLogin }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      navigate('/planets');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro durante a autenticação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-gradient relative overflow-hidden">
      {/* Estrelas de fundo */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            width: Math.random() * 3 + 'px',
            height: Math.random() * 3 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's'
          }}
        />
      ))}
      
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-space-dark/60 shadow-[0_0_50px_rgba(165,148,249,0.15)] border border-space-accent/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Sistema Solar Explorer
          </h1>
          <p className="text-space-highlight/80 text-sm">
            {isLogin ? 'Acesse sua conta para explorar' : 'Crie sua conta para começar a exploração'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/20 border border-destructive/40 text-white text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-space-highlight mb-2">
                Nome de usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 rounded-lg bg-space-nebula/30 border border-space-accent/30 text-white placeholder-space-highlight/50 focus:outline-none focus:ring-2 focus:ring-space-highlight/50 focus:border-transparent transition-all"
                placeholder="Seu nome de usuário"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-space-highlight mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-space-nebula/30 border border-space-accent/30 text-white placeholder-space-highlight/50 focus:outline-none focus:ring-2 focus:ring-space-highlight/50 focus:border-transparent transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-space-highlight mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg bg-space-nebula/30 border border-space-accent/30 text-white placeholder-space-highlight/50 focus:outline-none focus:ring-2 focus:ring-space-highlight/50 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <Button 
              type="submit"
              className="bg-space-accent hover:bg-space-highlight text-white"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Entrando...' : 'Cadastrando...'}
                </div>
              ) : (
                isLogin ? 'Entrar' : 'Cadastrar'
              )}
            </Button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-space-highlight/80">
              {isLogin ? (
                <>
                  Ainda não tem uma conta?{' '}
                  <Link to="/register" className="font-medium text-space-accent hover:text-space-highlight">
                    Cadastre-se agora
                  </Link>
                </>
              ) : (
                <>
                  Já possui uma conta?{' '}
                  <Link to="/login" className="font-medium text-space-accent hover:text-space-highlight">
                    Faça login aqui
                  </Link>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 