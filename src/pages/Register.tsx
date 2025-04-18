
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    
    setIsLoading(true);
    
    // Simulation d'une inscription (à remplacer par une vraie authentification)
    setTimeout(() => {
      console.log("Données d'inscription:", formData);
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Inscription</CardTitle>
            <CardDescription className="text-center">
              Créez votre compte WorldSell pour commencer à acheter et vendre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname">Prénom</Label>
                  <Input 
                    id="firstname" 
                    value={formData.firstname}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Nom</Label>
                  <Input 
                    id="lastname" 
                    value={formData.lastname}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-worldsell-orange-400 hover:bg-worldsell-orange-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>Création du compte...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Créer un compte</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-center w-full text-muted-foreground">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-worldsell-blue-500 hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
