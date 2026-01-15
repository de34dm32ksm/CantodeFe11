import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCheck, Search } from "lucide-react";

const TrackOrder = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F3]">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-normal mb-4 text-foreground">
              Sigue Tus Canciones
            </h1>
            <p className="text-lg text-muted-foreground font-serif italic">
              Ingresa tu correo electrónico para ver el estado de tu Canto de Oración y saber cuándo será entregado.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-white border border-border rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CircleCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-green-700 mb-2">
                  ¡Completamos cada pedido—estás cubierto!
                </h2>
                <p className="text-green-700 text-sm leading-relaxed">
                  Tenemos una tasa de finalización del 100%. Si no encuentras tu canción, normalmente se debe a un correo mal escrito o a filtros de email. Solo escríbenos a{" "}
                  <a 
                    href="mailto:CantodeFe@proton.me" 
                    className="underline font-medium hover:opacity-80"
                  >
                    CantodeFe@proton.me
                  </a>{" "}
                  y te la reenviamos de inmediato. Respondemos en un plazo de 3 a 5 días durante días festivos, y a menudo mucho antes.
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white border border-border rounded-xl p-8 mb-12 shadow-sm">
            <div className="max-w-md mx-auto space-y-4">
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full h-12 text-base border-border"
              />
              <Button className="w-full h-12 text-base bg-[#C4704A] hover:bg-[#B5613B]" size="lg">
                <Search className="w-5 h-5 mr-2" />
                Rastrear Tu Canción
              </Button>
            </div>
          </div>

          {/* Need Help Section */}
          <div className="text-center">
            <h3 className="font-serif text-xl font-medium mb-3">¿Necesitas Ayuda?</h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-lg mx-auto">
              Si tienes problemas para encontrar tu pedido o tienes alguna pregunta, escríbenos a{" "}
              <a 
                href="mailto:CantodeFe@proton.me" 
                className="text-foreground hover:underline"
              >
                CantodeFe@proton.me
              </a>
              . Respondemos en 3 a 5 días durante días festivos, generalmente antes.
            </p>
            <Button variant="outline" asChild className="rounded-full px-6">
              <a href="mailto:CantodeFe@proton.me">
                Contactar Soporte
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
