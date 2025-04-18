
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <div className="flex gap-4">
      <Button variant="outline" asChild>
        <Link to="/login">Se connecter</Link>
      </Button>
      <Button className="bg-worldsell-orange-400 hover:bg-worldsell-orange-500" asChild>
        <Link to="/register">S'inscrire</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
