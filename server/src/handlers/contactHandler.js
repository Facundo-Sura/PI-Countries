const { sendContactEmail } = require('../controllers/contactController');

const contactHandler = async (req, res) => {
  try {
    await sendContactEmail(req.body);
    res.status(200).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error en el handler:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
};

module.exports = contactHandler;
