
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const AuthButtons = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
    toast.success("Bienvenue sur notre page d'inscription !");
  };

  return (
    <motion.div 
      className="flex gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLogin}
        className="hidden sm:flex hover:scale-105 transition-transform"
      >
        <LogIn className="w-4 h-4 mr-1" />
        <span>Se connecter</span>
      </Button>
      <Button 
        className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500 text-white hidden sm:flex hover:scale-105 transition-transform" 
        size="sm" 
        onClick={handleRegister}
      >
        <UserPlus className="w-4 h-4 mr-1" />
        <span>S'inscrire</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleLogin}
        className="sm:hidden hover:scale-105 transition-transform"
      >
        <LogIn className="h-5 w-5" />
      </Button>
    </motion.div>
  );
};

export default AuthButtons;
