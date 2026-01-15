import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Music, Gift, CheckCircle2, Shield, Play, Pause, Calendar, Pencil, Star, Clock, CreditCard, Truck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import firstReviewAudio from "@/assets/first-review-audio.mp4";
import secondReviewAudio from "@/assets/second-review-audio.mp4";
import thirdReviewAudio from "@/assets/third-review-audio.mp4";

interface SampleSong {
  title: string;
  orderedBy: string;
  audioSrc: string;
  quote: string;
}

const sampleSongs: SampleSong[] = [
  {
    title: "Enviado Desde el Cielo",
    orderedBy: "Pamela S.",
    audioSrc: firstReviewAudio,
    quote: "\"Absolutamente hermoso, capturaron momentos tan especiales… ambos estábamos llorando.\" — Pamela S.",
  },
  {
    title: "Gracia Salvadora",
    orderedBy: "Wendy B.",
    audioSrc: secondReviewAudio,
    quote: "\"Esto es absolutamente impresionante. No puedo creerlo… me va a costar mantenerlo en secreto hasta el domingo.\" — Wendy B.",
  },
  {
    title: "Más Fuerte Ahora",
    orderedBy: "Markeeta B.",
    audioSrc: thirdReviewAudio,
    quote: "\"Una canción muy muy maravillosa. ¡Me encantó absolutamente y a Dave también!\" — Markeeta B.",
  },
];

const recipientOptions = [
  "Esposo", "Esposa", "Hermano", "Hermana", "Amigo", "Amiga",
  "Niño", "Niña", "Padre", "Madre", "Para mí", "Otro",
];

const genreOptions = [
  "Pop", "Reggaetón", "Rock", "Mariachi", "Cumbia", "Rap",
  "Bachata", "Salsa", "Merengue", "Himnos", "Alabanzas",
];

const voiceOptions = ["Voz femenina", "Voz masculina", "Sin preferencia"];

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form data state - load from sessionStorage
  const [formData, setFormData] = useState({
    recipientName: searchParams.get("recipientName") || sessionStorage.getItem("checkout_recipientName") || "",
    recipient: sessionStorage.getItem("checkout_recipient") || "",
    customRelationship: sessionStorage.getItem("checkout_customRelationship") || "",
    genre: sessionStorage.getItem("checkout_genre") || "",
    voiceGender: sessionStorage.getItem("checkout_voiceGender") || "",
    qualities: sessionStorage.getItem("checkout_qualities") || "",
    memories: sessionStorage.getItem("checkout_memories") || "",
    specialMessage: sessionStorage.getItem("checkout_specialMessage") || "",
    email: sessionStorage.getItem("checkout_email") || "",
  });

  const recipientName = formData.recipientName || "Tu ser querido";
  
  // Calculate delivery date (5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDate = deliveryDate.toLocaleDateString("es-ES", { day: "numeric", month: "short" });

  const handlePlayPause = (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
    } else {
      audioRefs.current.forEach((a, i) => {
        if (a && i !== index) {
          a.pause();
          a.currentTime = 0;
        }
      });
      audio.play();
      setPlayingIndex(index);
    }
  };

  useEffect(() => {
    audioRefs.current.forEach((audio, index) => {
      if (audio) {
        audio.onended = () => {
          if (playingIndex === index) {
            setPlayingIndex(null);
          }
        };
      }
    });
  }, [playingIndex]);

  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    sessionStorage.setItem(`checkout_${field}`, value);
    
    // Update URL if recipientName changed
    if (field === "recipientName") {
      setSearchParams({ recipientName: value });
    }
  };

  const handleSaveChanges = () => {
    // Save all data to sessionStorage
    Object.entries(formData).forEach(([key, value]) => {
      sessionStorage.setItem(`checkout_${key}`, value);
    });
    toast.success("¡Cambios guardados!");
    setIsEditModalOpen(false);
  };

  const handleSubmitToGoogleForm = () => {
    if (!formData.email) {
      toast.error("Por favor ingresa tu correo electrónico");
      return;
    }

    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLScEPvbdWRJpR-Y5liv86CUXXJlPeRxEHXj_8iEToRk_5U0daA/formResponse";
    
    // Get the relationship value (custom if "Otro" was selected)
    const relationshipValue =
      formData.recipient === "Otro"
        ? formData.customRelationship.trim() || "Otro (no especificado)"
        : formData.recipient;
    
    const formDataToSend = new FormData();
    formDataToSend.append("entry.572932444", formData.recipient);           // 1. Para quien es?
    formDataToSend.append("entry.646865340", formData.recipientName);       // 2. Come se llama?
    formDataToSend.append("entry.381347280", relationshipValue);            // 3. Cual es tu relacion con ellos?
    formDataToSend.append("entry.490417703", formData.genre);               // 4. Elige un genero musical
    formDataToSend.append("entry.1200658450", formData.voiceGender);        // 5. Genero de voz preferido
    formDataToSend.append("entry.1546025979", formData.qualities);          // 6. Que los hace especiales
    formDataToSend.append("entry.1185637620", formData.memories);           // 7. Comparte tus recuerdos favoritos
    formDataToSend.append("entry.988471068", formData.specialMessage);      // 8. Un mensaje desde tu corazon
    formDataToSend.append("entry.1709259804", formData.email);              // 9. Tu correo electrónico
    
    fetch(formURL, {
      method: "POST",
      body: formDataToSend,
      mode: "no-cors"
    })
    .then(() => {
      console.log("Form submitted to Google Sheets successfully");
    })
    .catch(error => {
      console.error("Error submitting to Google Sheets:", error);
    });
    
    // Redirect to Stripe checkout
    window.location.href = 'https://buy.stripe.com/test_bJedR97rng2g7NRaQ500000';
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="border-b border-border/40 bg-[#FAF7F2]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-serif font-semibold text-primary">CantodeFe</span>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
            ¡Ya casi está! Completa tu pedido
          </h1>
          <p className="text-muted-foreground text-lg">
            Estás a un solo clic de crear un hermoso canto personalizado para{" "}
            <span className="text-foreground font-medium">{recipientName}</span>.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Fecha estimada de entrega: {formattedDate}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Order Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <Music className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Tu Pedido de Canto Personalizado</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Canto para:</span>
                  <span className="font-medium">{recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entrega:</span>
                  <span className="font-medium">{formattedDate}</span>
                </div>
              </div>

              <div className="border-t my-5"></div>

              <div className="space-y-3">
                <p className="font-semibold">Canción personalizada</p>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    50% de descuento
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground line-through">$99</span>
                    <span className="text-primary"><span className="font-bold">$49</span> USD</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Pencil className="w-4 h-4" />
                  Revisar o Editar Formulario
                </Button>
              </div>

            </motion.div>

            {/* Limited Time Offer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/5 rounded-2xl p-6 border border-primary/20 shadow-sm"
            >
              <div className="text-left">
                <h3 className="font-semibold text-lg mb-3">🎁 Oferta por Tiempo Limitado</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Nuestros cantos normalmente cuestan <span className="text-primary font-bold">$99</span>, pero por tiempo limitado, puedes obtener la misma calidad profesional por solo{" "}
                  <span className="text-primary font-bold">$49 USD</span>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary font-medium">¿Por qué solo <span className="font-bold">$49 USD</span>?</span>{" "}
                  Gracias a las generosas donaciones y propinas de nuestros increíbles clientes, podemos ofrecer temporalmente CantodeFe a este precio especial.
                </p>
              </div>
            </motion.div>

            {/* Sample Songs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <Music className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Escucha otras canciones que hemos creado</h3>
              </div>

              <div className="space-y-4">
                {sampleSongs.map((song, index) => (
                  <div
                    key={index}
                    className={index < sampleSongs.length - 1 ? "pb-4 border-b border-border/30" : ""}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => handlePlayPause(index)}
                        className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        {playingIndex === index ? (
                          <Pause className="w-5 h-5 text-primary" />
                        ) : (
                          <Play className="w-5 h-5 text-primary ml-0.5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{song.title}</h4>
                          <span className="text-xs text-muted-foreground">Pedido por {song.orderedBy}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">0:00</p>
                        <p className="text-sm text-muted-foreground italic">{song.quote}</p>
                      </div>
                    </div>
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={song.audioSrc}
                      preload="metadata"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Money Back Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-lg"><span className="font-sans font-bold">100%</span> <span className="font-serif">Garantía de Devolución</span></h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0"></span>
                  ¿No estás satisfecho? Reembolso completo
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0"></span>
                  30 días de garantía - tiempo suficiente para decidir
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0"></span>
                  Compra sin riesgo - tu satisfacción es nuestra prioridad
                </li>
              </ul>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm text-center"
            >
              <Button
                onClick={handleSubmitToGoogleForm}
                className="w-full py-6 text-base font-semibold bg-primary hover:bg-primary/90 mb-4"
              >
                🎁 Crear Mi Canto
              </Button>
              <p className="text-muted-foreground">
                ¿Listo para crear algo especial para <span className="text-foreground font-medium">{recipientName}</span>?
              </p>
            </motion.div>

            {/* What You'll Receive - moved to left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm"
            >
              <h4 className="font-semibold text-lg mb-5">Lo Que Recibirás</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Music className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Canto de Calidad Profesional</p>
                    <p className="text-sm text-muted-foreground">Listo para compartir con tus seres queridos</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Pencil className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Letras Personalizadas</p>
                    <p className="text-sm text-muted-foreground">Escritas especialmente para {recipientName}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Entrega en 5 Días</p>
                    <p className="text-sm text-muted-foreground">Perfecto para regalos de último momento</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Why Choose - 4 lines with checkmarks - moved to left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">¿Por qué elegir CantodeFe?</span>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">+1,000 clientes satisfechos</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">100% garantía</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">Pago seguro</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">Entrega en 5 días</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Sticky Checkout Form Only */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tu correo electrónico
                  </label>
                  <Input
                    type="email"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => handleFormDataChange("email", e.target.value)}
                    className="bg-background"
                  />
                </div>

                <Button
                  onClick={handleSubmitToGoogleForm}
                  className="w-full py-6 text-base font-semibold bg-primary hover:bg-primary/90"
                >
                  🎁 Crear Mi Canto
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Garantía de devolución de 30 días
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Edit Form Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Revisar y Editar tu Pedido</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Recipient Name */}
            <div className="space-y-2">
              <Label htmlFor="recipientName">¿Cómo se llama?</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => handleFormDataChange("recipientName", e.target.value)}
                placeholder="Nombre de la persona"
              />
            </div>

            {/* Relationship */}
            <div className="space-y-2">
              <Label>¿Cuál es tu relación con ellos?</Label>
              <Select 
                value={formData.recipient} 
                onValueChange={(value) => handleFormDataChange("recipient", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una relación" />
                </SelectTrigger>
                <SelectContent>
                  {recipientOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.recipient === "Otro" && (
                <Input
                  value={formData.customRelationship}
                  onChange={(e) => handleFormDataChange("customRelationship", e.target.value)}
                  placeholder="Especifica la relación"
                  className="mt-2"
                />
              )}
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label>Género musical</Label>
              <Select 
                value={formData.genre} 
                onValueChange={(value) => handleFormDataChange("genre", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un género" />
                </SelectTrigger>
                <SelectContent>
                  {genreOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Voice Gender */}
            <div className="space-y-2">
              <Label>Género de voz preferido</Label>
              <Select 
                value={formData.voiceGender} 
                onValueChange={(value) => handleFormDataChange("voiceGender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo de voz" />
                </SelectTrigger>
                <SelectContent>
                  {voiceOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Qualities */}
            <div className="space-y-2">
              <Label htmlFor="qualities">¿Qué los hace especiales?</Label>
              <Textarea
                id="qualities"
                value={formData.qualities}
                onChange={(e) => handleFormDataChange("qualities", e.target.value)}
                placeholder="Describe las cualidades especiales de esta persona..."
                rows={3}
              />
            </div>

            {/* Memories */}
            <div className="space-y-2">
              <Label htmlFor="memories">Comparte tus recuerdos favoritos</Label>
              <Textarea
                id="memories"
                value={formData.memories}
                onChange={(e) => handleFormDataChange("memories", e.target.value)}
                placeholder="Cuéntanos momentos especiales que compartes..."
                rows={3}
              />
            </div>

            {/* Special Message */}
            <div className="space-y-2">
              <Label htmlFor="specialMessage">Un mensaje desde tu corazón</Label>
              <Textarea
                id="specialMessage"
                value={formData.specialMessage}
                onChange={(e) => handleFormDataChange("specialMessage", e.target.value)}
                placeholder="¿Qué te gustaría decirle?"
                rows={3}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="editEmail">Tu correo electrónico</Label>
              <Input
                id="editEmail"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormDataChange("email", e.target.value)}
                placeholder="tu@correo.com"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="flex-1"
              onClick={handleSaveChanges}
            >
              Guardar Cambios
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
