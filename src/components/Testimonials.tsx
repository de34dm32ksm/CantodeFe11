import { motion } from "framer-motion";
import { Star, Play, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef } from "react";
import firstReviewAudio from "@/assets/maria-review-audio.mp4";
import secondReviewAudio from "@/assets/sandra-review-audio.mp4";
import thirdReviewAudio from "@/assets/patricia-review-audio.mp4";

const testimonials = [
  {
    quote: "¡Oh alabado sea Dios! Esto es absolutamente impresionante. No puedo creerlo... Voy a tener dificultades para mantener esto en secreto hasta el domingo. ¡Lo escucharemos camino a la iglesia! Dios bendiga el trabajo que hacen.",
    author: "Maria E.",
    verified: true,
    songTitle: "Dios Me Dio a Ti",
    audio: firstReviewAudio,
  },
  {
    quote: "Una canción muy muy hermosa. ¡Me encantó y a Dave también! La puse en mi Facebook, se la envié a sus hijos para que la escucharan... Estaré cantando sus alabanzas.",
    author: "Sandra L.",
    verified: true,
    songTitle: "Su Historia de Amor",
    audio: secondReviewAudio,
  },
  {
    quote: "Absolutamente hermosa, capturaron momentos tan especiales... ambos estábamos llorando. No podría pedir una canción más bella. Muchas gracias por este increíble regalo.",
    author: "Patricia Q.",
    verified: true,
    songTitle: "Aún Creo",
    audio: thirdReviewAudio,
  },
];

const Testimonials = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (index: number, audioSrc: string) => {
    if (playingIndex === index) {
      audioRef.current?.pause();
      setPlayingIndex(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play();
      audioRef.current.onended = () => setPlayingIndex(null);
      setPlayingIndex(index);
    }
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12"
        >
          Por qué más de 1,000 clientes aman Canto de Fe
        </motion.h2>

        {/* Text Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      onClick={() => handlePlay(index, testimonial.audio)}
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
                    >
                      {playingIndex === index ? (
                        <Pause className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                      ) : (
                        <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                      )}
                    </button>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{testimonial.author}</p>
                      {testimonial.verified && (
                        <p className="text-xs text-muted-foreground">Cliente Verificado</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
