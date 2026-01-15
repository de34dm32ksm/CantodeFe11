import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift, Star } from "lucide-react";
import { Link } from "react-router-dom";
import headerVideo from "@/assets/header-video.mov";
import testimonial1 from "@/assets/testimonial-1.png";
import testimonial2 from "@/assets/testimonial-2.png";
import testimonial3 from "@/assets/testimonial-3.png";

const Hero = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Video Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8 w-full max-w-lg"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <video 
                src={headerVideo} 
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover"
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4"
          >
            LA PLATAFORMA Nº 1 DE CANCIONES CRISTIANAS PERSONALIZADAS
          </motion.p>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-4"
          >
            ¡Este Canto de Fe me hizo llorar!
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl font-serif text-muted-foreground mb-6"
          >
            Sorprende a tu ser querido con una canción cristiana personalizada que nunca olvidará
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link to="/create?step=basics">
              <Button size="lg" className="text-base px-8 py-6 gap-2 shadow-lg hover:shadow-xl transition-shadow">
                <Gift className="w-5 h-5" />
                Crea su Regalo Perfecto
              </Button>
            </Link>
          </motion.div>

          {/* Delivery Promise */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-sm text-muted-foreground mt-4 font-medium italic"
          >
            Entregado con amor, oración y cuidado en 7 días
          </motion.p>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[testimonial1, testimonial2, testimonial3].map((img, i) => (
                  <img 
                    key={i}
                    src={img}
                    alt={`Cliente satisfecho ${i + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Amado por 1000+ familias</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
