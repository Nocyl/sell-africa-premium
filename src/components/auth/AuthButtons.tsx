
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

const AuthButtons = () => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" asChild className="hidden sm:flex">
        <Link to="/login" className="flex items-center gap-1">
          <LogIn className="w-4 h-4" />
          <span>Se connecter</span>
        </Link>
      </Button>
      <Button 
        className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500 text-white hidden sm:flex" 
        size="sm" 
        asChild
      >
        <Link to="/register" className="flex items-center gap-1">
          <UserPlus className="w-4 h-4" />
          <span>S'inscrire</span>
        </Link>
      </Button>
      
      {/* Version mobile - seulement l'icône */}
      <Button 
        variant="ghost" 
        size="icon" 
        asChild 
        className="sm:hidden"
      >
        <Link to="/login">
          <LogIn className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
