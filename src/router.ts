import {Router} from 'express'; 
import User from "./models/User" 

const router = Router(); 

//Routing for authentication and register 
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado con exito', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

export default router;