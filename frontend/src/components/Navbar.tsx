
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Plus, List } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-space-darker py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-space-accent to-space-highlight bg-clip-text text-transparent text-2xl font-bold">
          Sistema Solar Explorer
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2">
            <List size={16} />
            <span>Planetas</span>
          </Link>
          
          <Link to="/add-planet" className="text-gray-300 hover:text-white flex items-center gap-2">
            <Plus size={16} />
            <span>Adicionar planeta</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <span className="text-sm text-gray-400">Olá, </span>
              <span className="text-space-highlight">{user?.name}</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-gray-300 hover:text-white"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
