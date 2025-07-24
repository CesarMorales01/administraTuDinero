import React from 'react';
import '../../../css/general.css'; // Importa los estilos CSS

const VisitWebsiteButton = () => {
  return (
    <a 
      href="https://tupaginaweb.site" // URL a la que el botón dirigirá
      target="_blank"                 // Abre el enlace en una nueva pestaña
      rel="noopener noreferrer"       // Mejora la seguridad al abrir nuevas pestañas
      className="visit-website-link"  // Clase CSS para el enlace si necesitas estilos adicionales
    >
      <button style={{whiteSpace: 'nowrap'}} className="visit-button">
        ¡Visita https://tupaginaweb.site
      </button>
    </a>
  );
};

export default VisitWebsiteButton;