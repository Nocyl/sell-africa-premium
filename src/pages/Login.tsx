
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte WorldSell
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Input type="email" placeholder="Email" />
              </div>
              <div className="space-y-2">
                <Input type="password" placeholder="Mot de passe" />
              </div>
              <Button className="w-full bg-worldsell-blue-500 hover:bg-worldsell-blue-600">
                Se connecter
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <Link to="/forgot-password" className="text-worldsell-blue-500 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-worldsell-orange-400 hover:underline">
                S'inscrire
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
