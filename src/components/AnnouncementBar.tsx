import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2.5 px-4 text-center">
      <Link 
        to="/create?step=basics" 
        className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <span>¡Promoción de fin de año activa ahora!</span>
        <span className="underline inline-flex items-center gap-1">
          Crea tu canción <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </div>
  );
};

export default AnnouncementBar;
