// Base de conocimientos del ChatBot Municipal de Carúpano
export const chatbotResponses = {
  // Saludos
  saludos: {
    keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'hey', 'hi'],
    response: '¡Hola! Soy el asistente virtual de la Municipalidad de Carúpano. ¿En qué puedo ayudarte hoy? Puedo informarte sobre trámites, servicios, turismo, horarios y más.'
  },

  // Trámites
  tramites_general: {
    keywords: ['trámite', 'tramite', 'trámites', 'tramites', 'documentos', 'papeles'],
    response: 'En la Municipalidad de Carúpano puedes realizar diversos trámites:\n\n• Solvencia Municipal\n• Patente de Industria y Comercio\n• Permiso de Construcción\n• Certificado de Residencia\n• Constancia de No Poseer Vivienda\n\n¿Sobre cuál trámite específico necesitas información?'
  },

  solvencia: {
    keywords: ['solvencia', 'solvencia municipal'],
    response: '📄 **Solvencia Municipal**\n\nRequisitos:\n• Cédula de identidad (original y copia)\n• RIF actualizado\n• Último recibo de pago de impuestos municipales\n• Planilla de solicitud\n\nCosto: 2 Unidades Tributarias\nTiempo de entrega: 3 días hábiles\nHorario: Lunes a Viernes 8:00 AM - 12:00 PM'
  },

  patente: {
    keywords: ['patente', 'comercio', 'industria', 'negocio', 'empresa'],
    response: '🏢 **Patente de Industria y Comercio**\n\nRequisitos:\n• Registro mercantil\n• RIF de la empresa\n• Cédula del representante legal\n• Contrato de arrendamiento o título de propiedad\n• Conformidad de uso de bomberos\n• Solvencia municipal\n\nProceso: 5-10 días hábiles\nDirígete a la Dirección de Hacienda Municipal.'
  },

  construccion: {
    keywords: ['construcción', 'construir', 'permiso construcción', 'obra', 'edificar'],
    response: '🏗️ **Permiso de Construcción**\n\nRequisitos:\n• Documento de propiedad del terreno\n• Planos firmados por ingeniero colegiado\n• Cédula y RIF del propietario\n• Solvencia de impuestos municipales\n• Variables urbanas\n\nDirigirse a: Dirección de Ingeniería Municipal\nHorario: Lunes a Viernes 8:00 AM - 3:00 PM'
  },

  residencia: {
    keywords: ['residencia', 'certificado residencia', 'constancia residencia', 'donde vivo'],
    response: '🏠 **Certificado de Residencia**\n\nRequisitos:\n• Cédula de identidad vigente\n• Recibo de servicio público (luz, agua, teléfono)\n• Dos testigos con cédula\n\nCosto: Gratuito\nTiempo: Entrega inmediata\nLugar: Registro Civil de tu parroquia'
  },

  // Horarios
  horarios: {
    keywords: ['horario', 'horarios', 'hora', 'atienden', 'abierto', 'abren', 'cierran'],
    response: '🕐 **Horarios de Atención**\n\nAlcaldía Principal:\nLunes a Viernes: 8:00 AM - 4:00 PM\n\nHacienda Municipal:\nLunes a Viernes: 8:00 AM - 12:00 PM\n\nRegistro Civil:\nLunes a Viernes: 8:00 AM - 3:00 PM\n\nAtención al Ciudadano:\nLunes a Viernes: 8:00 AM - 5:00 PM'
  },

  // Ubicación
  ubicacion: {
    keywords: ['dirección', 'direccion', 'ubicación', 'ubicacion', 'donde queda', 'dónde queda', 'como llego', 'cómo llego', 'sede'],
    response: '📍 **Ubicación de la Alcaldía**\n\nDirección: Calle Independencia, frente a la Plaza Colón, Carúpano, Estado Sucre.\n\nPuntos de referencia:\n• A 2 cuadras de la Plaza Bolívar\n• Diagonal a la Iglesia Santa Rosa\n\nTeléfono: (0294) 331-XXXX\nCorreo: alcaldia@carupano.gob.ve'
  },

  // Impuestos
  impuestos: {
    keywords: ['impuesto', 'impuestos', 'pago', 'pagar', 'tributo', 'tributos', 'tasa'],
    response: '💰 **Impuestos Municipales**\n\nPuedes pagar:\n• Impuesto sobre Inmuebles Urbanos\n• Patente de Industria y Comercio\n• Impuesto sobre Vehículos\n• Publicidad y Propaganda\n\nFormas de pago:\n• Presencial en Hacienda Municipal\n• Transferencia bancaria\n• Punto de venta en sede\n\n¿Necesitas información sobre algún impuesto específico?'
  },

  // Turismo
  turismo: {
    keywords: ['turismo', 'turístico', 'turistico', 'visitar', 'playa', 'playas', 'conocer', 'pasear'],
    response: '🏖️ **Turismo en Carúpano**\n\nLugares imperdibles:\n\n• **Playa Copey**: Aguas cristalinas y arena dorada\n• **Playa Medina**: Una de las más hermosas de Venezuela\n• **Río Caribe**: Pueblo colonial pintoresco\n• **Haciendas de Cacao**: Ruta del cacao venezolano\n• **Carnaval de Carúpano**: El más antiguo de Venezuela\n\n¿Te gustaría más información sobre algún destino?'
  },

  carnaval: {
    keywords: ['carnaval', 'fiestas', 'celebración', 'febrero'],
    response: '🎭 **Carnaval de Carúpano**\n\nEl Carnaval más antiguo de Venezuela, declarado Patrimonio Cultural.\n\n• Fecha: Febrero (variable según calendario)\n• Duración: 4 días de celebración\n• Actividades: Desfiles, comparsas, música, gastronomía\n• Tradición: Desde 1890\n\nMiles de turistas nos visitan cada año para disfrutar de nuestras tradiciones.'
  },

  // Servicios
  servicios: {
    keywords: ['servicio', 'servicios', 'ayuda social', 'programa', 'programas'],
    response: '🤝 **Servicios Municipales**\n\n• Aseo Urbano y Domiciliario\n• Alumbrado Público\n• Mantenimiento de Vías\n• Programas Sociales\n• Atención al Adulto Mayor\n• Apoyo a Emprendedores\n• Casa de la Cultura\n\n¿Sobre qué servicio necesitas más información?'
  },

  // Contacto
  contacto: {
    keywords: ['contacto', 'teléfono', 'telefono', 'llamar', 'comunicar', 'correo', 'email'],
    response: '📞 **Contacto**\n\nTeléfono: (0294) 331-XXXX\nEmergencias: 0800-ALCALDIA\nCorreo: atencion@carupano.gob.ve\n\nRedes Sociales:\n• Twitter: @AlcaldiaCarupano\n• Instagram: @alcaldiacarupano\n• Facebook: Alcaldía de Carúpano\n\nHorario de atención telefónica:\nLunes a Viernes 8:00 AM - 4:00 PM'
  },

  // Alcalde
  alcalde: {
    keywords: ['alcalde', 'alcaldesa', 'autoridad', 'gobierno', 'quien manda'],
    response: '👔 **Gobierno Municipal**\n\nLa Alcaldía de Carúpano trabaja por el bienestar de todos los carupaneros.\n\nNuestra misión es brindar servicios de calidad y promover el desarrollo integral del municipio.\n\nPuedes seguir las actividades del gobierno municipal en nuestras redes sociales y página web oficial.'
  },

  // Emergencias
  emergencias: {
    keywords: ['emergencia', 'emergencias', 'urgente', 'policía', 'policia', 'bomberos', 'ambulancia'],
    response: '🚨 **Números de Emergencia**\n\n• Policía: 171\n• Bomberos: (0294) 331-XXXX\n• Ambulancia: (0294) 331-XXXX\n• Protección Civil: (0294) 331-XXXX\n• Emergencias Generales: 911\n\nEn caso de emergencia, mantén la calma y proporciona tu ubicación exacta.'
  },

  // Despedida
  despedida: {
    keywords: ['gracias', 'adios', 'adiós', 'chao', 'bye', 'hasta luego', 'nos vemos'],
    response: '¡Gracias por comunicarte con la Municipalidad de Carúpano! Si tienes más preguntas, no dudes en escribirme. ¡Que tengas un excelente día! 🌴'
  },

  // Quejas y reclamos
  quejas: {
    keywords: ['queja', 'reclamo', 'denuncia', 'problema', 'reportar', 'denunciar'],
    response: '📝 **Quejas y Reclamos**\n\nPuedes presentar tu queja o reclamo:\n\n• Presencial: Oficina de Atención al Ciudadano\n• Teléfono: 0800-ALCALDIA\n• Correo: reclamos@carupano.gob.ve\n• Redes sociales: @AlcaldiaCarupano\n\nTu opinión nos ayuda a mejorar. Todas las quejas son procesadas en un máximo de 15 días hábiles.'
  },

  // Default
  default: {
    response: 'Disculpa, no tengo información específica sobre eso. Puedo ayudarte con:\n\n• Trámites municipales\n• Horarios de atención\n• Ubicación de oficinas\n• Impuestos y pagos\n• Turismo en Carúpano\n• Servicios municipales\n• Contacto y emergencias\n\n¿Sobre cuál tema te gustaría saber más?'
  }
};

// Función para buscar respuesta
export const findResponse = (message) => {
  const lowerMessage = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (const [key, value] of Object.entries(chatbotResponses)) {
    if (key === 'default') continue;

    if (value.keywords && value.keywords.some(keyword => {
      const normalizedKeyword = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return lowerMessage.includes(normalizedKeyword);
    })) {
      return value.response;
    }
  }

  return chatbotResponses.default.response;
};
