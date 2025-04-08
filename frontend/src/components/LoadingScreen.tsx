
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-space-dark">
      <Loader2 className="h-12 w-12 animate-spin text-space-highlight" />
      <p className="mt-4 text-space-highlight text-lg">Carregando o cosmos...</p>
    </div>
  );
};

export default LoadingScreen;
