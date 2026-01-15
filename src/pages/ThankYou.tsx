import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
            ¡Muchas gracias por su pago!
          </h1>

          {/* Message */}
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Su pago a <span className="font-semibold text-foreground">CantodeFe</span> aparecerá reflejado en su estado de cuenta.
            </p>
            <p className="text-lg leading-relaxed">
              Le enviaremos su acceso personal a CantodeFe dentro de un plazo máximo de <span className="font-semibold text-foreground">5 días</span>.
            </p>
          </div>

          {/* Return Home Link */}
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
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
    </div>
  );
};

export default ThankYou;
