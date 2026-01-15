import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto cuesta una canción personalizada?",
    answer: "Cada CantodeFe tiene un precio accesible para que puedas regalar un recuerdo único a tu ser querido. Visita nuestra página de creación para ver los precios actuales.",
  },
  {
    question: "¿Qué hace que una CantodeFe sea tan única?",
    answer: "Cada CantodeFe está escrita a medida desde tu historia. Es un regalo único enraizado en las Escrituras, la oración y el cuidado genuino.",
  },
  {
    question: "La necesito para una fecha especial. ¿Cuándo llegará?",
    answer: "Tu CantodeFe terminada se entrega en 7 días. Opcionalmente, si necesitas tu canción más rápido, podemos entregarla en 24 horas por una tarifa adicional.",
  },
  {
    question: "¿Realmente puedo obtener una canción personalizada en solo 24 horas?",
    answer: "¡Sí! Mientras que la entrega estándar es de 7 días, ofrecemos entrega prioritaria en 24 horas. Simplemente selecciona la opción de entrega prioritaria después de comprar tu canción.",
  },
  {
    question: "¿Puedo hacer una canción para varias personas (ej. hermanos, pareja, familia)?",
    answer: "¡Absolutamente! Puedes crear una canción para cualquier persona o grupo: tu pareja, hijos, padres, hermanos o toda la familia.",
  },
  {
    question: "¿Qué tipo de historias u ocasiones funcionan mejor?",
    answer: "Cualquier cosa que honre a Dios y a tu ser querido: cumpleaños, aniversarios, bodas, duelo, aliento, testimonios u oraciones por fortaleza y sanación.",
  },
  {
    question: "¿Cómo ocurre la magia? ¿Cuál es el proceso?",
    answer: "Cada CantodeFe se crea con el mismo estándar que las canciones que escuchas en la radio. Nuestros letristas ponen su corazón en hacer cada letra personal y significativa, luego nuestros productores usan la última tecnología de producción musical para dar vida a tus letras.",
  },
  {
    question: "¿Cómo recibiré y compartiré mi canción?",
    answer: "Recibirás un enlace seguro por correo electrónico para reproducir tu CantodeFe en cualquier dispositivo y compartirla fácilmente con familiares y amigos.",
  },
  {
    question: "¿Podemos reproducir esto en nuestra iglesia o evento?",
    answer: "Sí, puedes compartir y reproducir tu CantodeFe en eventos privados y reuniones de la iglesia.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12"
        >
          Preguntas Frecuentes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground">
            Contáctanos en{" "}
            <a href="mailto:CantodeFe@proton.me" className="text-primary hover:underline font-medium">
              CantodeFe@proton.me
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
