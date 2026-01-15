import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            CantodeFe
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/track-order" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Seguir Pedido
          </Link>
          <a 
            href="#reviews" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Testimonios
          </a>
          <Link to="/create?step=basics">
            <Button variant="default" size="sm" className="font-medium">
              Crea tu Canción
            </Button>
          </Link>
        </nav>

        <Link to="/create?step=basics" className="md:hidden">
          <Button variant="default" size="sm" className="font-medium">
            Crear
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
