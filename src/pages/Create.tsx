import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Music, Gift, CheckCircle, Shield, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const STEPS = ["basics", "style-preferences", "story", "style", "details"];

const voiceOptions = [
  "Voz femenina",
  "Voz masculina",
  "Sin preferencia",
];

const recipientOptions = [
  "Esposo",
  "Esposa",
  "Hermano",
  "Hermana", 
  "Amigo",
  "Amiga",
  "Niño",
  "Niña",
  "Padre",
  "Madre",
  "Para mí",
  "Otro",
];


const genreOptions = [
  "Pop",
  "Reggaetón",
  "Rock",
  "Mariachi",
  "Cumbia",
  "Rap",
  "Bachata",
  "Salsa",
  "Merengue",
  "Vallenato",
  "Himnos",
  "Alabanzas",
];

const Create = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentStep = searchParams.get("step") || "basics";
  const stepIndex = STEPS.indexOf(currentStep);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const [formData, setFormData] = useState({
    recipient: "",
    recipientName: "",
    customRelationship: "",
    voiceGender: "",
    genre: "",
    qualities: "",
    memories: "",
    specialMessage: "",
    email: "",
  });

  // Validation helpers
  const isRelationshipValid =
    formData.recipient !== "" &&
    (formData.recipient !== "Otro" ||
      formData.customRelationship.trim() !== "");

  const isBasicsStepValid = isRelationshipValid;

  const handleNext = () => {
    if (currentStep === "basics" && !isBasicsStepValid) {
      toast.error("Por favor completa la relación antes de continuar");
      return;
    }

    if (stepIndex < STEPS.length - 1) {
      setSearchParams({ step: STEPS[stepIndex + 1] });
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setSearchParams({ step: STEPS[stepIndex - 1] });
    } else {
      navigate("/");
    }
  };

  const handleSelectOption = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitToGoogleForm = () => {
    // Validate before submit
    if (!isBasicsStepValid || !formData.email) {
      toast.error("Faltan campos obligatorios");
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
    
    // Store all form data in sessionStorage for checkout page
    sessionStorage.setItem("checkout_recipientName", formData.recipientName || formData.recipient);
    sessionStorage.setItem("checkout_recipient", formData.recipient);
    sessionStorage.setItem("checkout_customRelationship", formData.customRelationship);
    sessionStorage.setItem("checkout_email", formData.email);
    sessionStorage.setItem("checkout_genre", formData.genre);
    sessionStorage.setItem("checkout_voiceGender", formData.voiceGender);
    sessionStorage.setItem("checkout_qualities", formData.qualities);
    sessionStorage.setItem("checkout_memories", formData.memories);
    sessionStorage.setItem("checkout_specialMessage", formData.specialMessage);
    
    fetch(formURL, {
      method: "POST",
      body: formDataToSend,
      mode: "no-cors"
    })
    .then(() => {
      console.log("Form submitted successfully");
    })
    .catch(error => {
      console.error("Error:", error);
    });
    
    // Navigate to checkout immediately (no-cors doesn't return proper response)
    navigate(`/checkout?recipientName=${encodeURIComponent(formData.recipientName || formData.recipient)}`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "basics":
        return (
          <motion.div
            key="basics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
                Comencemos con lo básico
              </h1>
              <p className="text-muted-foreground">
                Cuéntanos sobre la persona especial en tu vida
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  ¿Para quién es? <span className="text-primary">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {recipientOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelectOption("recipient", option)}
                      className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                        formData.recipient === option
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  ¿Cómo se llama?
                </label>
                <Input
                  placeholder="Escribe su nombre"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recipientName: e.target.value,
                    }))
                  }
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Tip: agrega la pronunciación para mayor claridad (ej. Alicia: ah-lee-sha)
                </p>
              </div>

              {formData.recipient === "Otro" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    ¿Cuál es tu relación con ellos?
                  </label>
                  <Input
                    placeholder="Ej: Abuelo, Tía, Primo, etc."
                    value={formData.customRelationship}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customRelationship: e.target.value,
                      }))
                    }
                    className="max-w-md"
                  />
                </div>
              )}
            </div>
          </motion.div>
        );

      case "style-preferences":
        return (
          <motion.div
            key="style-preferences"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            {/* Music Genre Section */}
            <div className="space-y-4">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
                  Elige un género musical
                </h1>
                <p className="text-muted-foreground">
                  Género preferido <span className="text-primary">*</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                {genreOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectOption("genre", option)}
                    className={`px-5 py-3 rounded-full border text-sm font-medium transition-all ${
                      formData.genre === option
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Gender Section */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">
                  Género de voz preferido
                </h2>
                <p className="text-muted-foreground">
                  Recomendamos elegir tu propio género para que la voz te resulte más personal.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                {voiceOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectOption("voiceGender", option)}
                    className={`px-5 py-3 rounded-full border text-sm font-medium transition-all ${
                      formData.voiceGender === option
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "story":
        return (
          <motion.div
            key="story"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
                ¿Qué los hace especiales?
              </h1>
              <p className="text-muted-foreground">
                Describe sus características y las cualidades que más te gustan.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <label className="block text-sm font-medium mb-2">
                Sus cualidades más hermosas
              </label>
              <Textarea
                placeholder="Describe las cualidades que más admiras de esta persona..."
                value={formData.qualities}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, qualities: e.target.value }))
                }
                className="min-h-[200px]"
              />
            </div>
          </motion.div>
        );

      case "style":
        return (
          <motion.div
            key="style"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
                Comparte tus recuerdos favoritos
              </h1>
              <p className="text-muted-foreground">
                ¿Qué momentos con ellos atesoras más?
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <label className="block text-sm font-medium mb-2">
                Momentos especiales juntos
              </label>
              <Textarea
                placeholder="Comparte los momentos y recuerdos que más atesoras..."
                value={formData.memories}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, memories: e.target.value }))
                }
                className="min-h-[200px]"
              />
            </div>
          </motion.div>
        );

      case "details":
        return (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
                Un mensaje desde tu corazón
              </h1>
              <p className="text-muted-foreground">
                Escribe cualquier otra cosa que sientas que sea relevante incluir en tu canción, ¡y haremos todo lo posible por incorporarlo!
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mensaje especial
                </label>
                <Textarea
                  placeholder="Escribe tu mensaje especial aquí..."
                  value={formData.specialMessage}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specialMessage: e.target.value,
                    }))
                  }
                  className="min-h-[200px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tu correo electrónico <span className="text-primary">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="max-w-md"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Aquí recibirás tu canción terminada.
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Paso {stepIndex + 1} de {STEPS.length}
            </span>
            <a href="/" className="font-serif text-xl font-semibold">
              <span className="italic">Canto</span>deFe
            </a>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Completo
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep !== "details" && (
            <div className="flex items-center justify-between mt-12 max-w-2xl mx-auto">
              <Button
                variant="outline"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </Button>
              <Button
                onClick={handleNext}
                className="gap-2"
                disabled={currentStep === "basics" && !isBasicsStepValid}
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {currentStep === "details" && (
            <div className="flex flex-col items-center gap-4 mt-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-between w-full">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </Button>
                <Button
                  onClick={handleSubmitToGoogleForm}
                  className="gap-2"
                  disabled={!formData.email}
                >
                  <Gift className="w-4 h-4" />
                  Continuar al Pago
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                Garantía de Devolución de 30 Días
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="underline">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              Política de Privacidad
            </a>
            .
          </p>
          <p className="text-center text-xs text-muted-foreground/50 mt-4 uppercase tracking-widest">
            CantodeFe
          </p>
        </div>
      </main>
    </div>
  );
};

export default Create;
