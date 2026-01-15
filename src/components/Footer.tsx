import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center">
            <span className="font-serif text-xl font-semibold">
              Canto<span className="italic">de</span>Fe
            </span>
          </div>
          
          <nav className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
              Política de Privacidad
            </Link>
            <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
              Términos de Servicio
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
