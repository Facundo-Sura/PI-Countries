require("dotenv").config();
const { NODE_ENV } = process.env;
const { sendContactEmail } = require('../controllers/contactController');

const contactHandler = async (req, res) => {
  // 1. Validación de campos obligatorios
  const { fullname, email, message } = req.body;
  
  if (!fullname || !email || !message) {
    return res.status(400).json({ 
      error: 'Faltan campos requeridos: fullname, email o message' 
    });
  }

  // 2. Validación básica del formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'El formato del email no es válido' 
    });
  }

  try {
    // 3. Envío del email
    await sendContactEmail({ fullname, email, message });
    
    // 4. Respuesta exitosa
    res.status(200).json({ 
      success: true,
      message: 'Mensaje enviado con éxito',
      data: { fullname, email } // Opcional: devolver algunos datos para confirmación
    });
  } catch (error) {
    console.error('Error en el handler:', error);
    
    // 5. Manejo de errores más específico
    const statusCode = error.code === 'EAUTH' ? 401 : 500;
    const errorMessage = error.code === 'EAUTH' 
      ? 'Error de autenticación con el servicio de email' 
      : 'Error al enviar el mensaje';
    
    res.status(statusCode).json({ 
      success: false,
      error: errorMessage,
      details: NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = contactHandler;