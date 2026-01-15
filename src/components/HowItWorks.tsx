import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import howItWorksBg from "@/assets/how-it-works-bg.jpg";

const steps = [
  {
    number: 1,
    title: "Comparte su Historia",
  },
  {
    number: 2,
    title: "Creamos tu Canción",
  },
  {
    number: 3,
    title: "Entregada a tu Correo",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${howItWorksBg})`,
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12 text-white"
        >
          Cómo Funciona CantodeFe
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-5xl md:text-6xl font-bold text-white mb-3">
                {step.number}
              </span>
              <p className="text-lg font-medium text-white">{step.title}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <Link to="/create?step=basics">
            <Button size="lg" className="px-8">
              Comienza tu Historia
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
