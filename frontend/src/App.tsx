import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/AuthForm';
import { PlanetList } from './components/PlanetList';
import { PlanetDetails } from './components/PlanetDetails';

// Componente de rota protegida
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Componente de rota pública
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/planets" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Navigate to="/planets" replace />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <AuthForm isLogin={true} />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <AuthForm isLogin={false} />
                </PublicRoute>
              }
            />
            <Route
              path="/planets"
              element={
                <ProtectedRoute>
                  <PlanetList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/planets/:id"
              element={
                <ProtectedRoute>
                  <PlanetDetails />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/planets" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
