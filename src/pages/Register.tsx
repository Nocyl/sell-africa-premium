
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
            <CardDescription>
              Créez votre compte WorldSell pour commencer à vendre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Prénom" />
                <Input placeholder="Nom" />
              </div>
              <div className="space-y-2">
                <Input type="email" placeholder="Email" />
              </div>
              <div className="space-y-2">
                <Input type="password" placeholder="Mot de passe" />
              </div>
              <div className="space-y-2">
                <Input type="password" placeholder="Confirmer le mot de passe" />
              </div>
              <Button className="w-full bg-worldsell-orange-400 hover:bg-worldsell-orange-500">
                Créer un compte
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-worldsell-blue-500 hover:underline">
                Se connecter
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
