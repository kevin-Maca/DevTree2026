import { Router } from 'express';
import User from "../models/User";
import { hashPassword, checkPassword } from '../utils/auth';
import slug from 'slug';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

const router = Router();


// Routing for authentication and register
router.post('/auth/register', async (req, res) => {

    try {

        // Validaciones
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { handle, name, email, password } = req.body;

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: 'El email ya está registrado'
            });
        }

        // Generar slug del handle
        const slugHandle = slug(handle, {
            lower: true
        });

        // Verificar si el handle ya existe
        const handleExists = await User.findOne({
            handle: slugHandle
        });

        if (handleExists) {

            return res.status(409).json({
                error: 'El nombre de usuario no está disponible'
            });

        }

        // Hash password
        console.log('Password original:', password);

        const hashedPassword = await hashPassword(password);

        console.log('Password hasheado:', hashedPassword);

        // Crear usuario
        const user = new User({
            handle: slugHandle,
            name,
            email,
            password: hashedPassword
        });

        // Guardar usuario
        await user.save();

        res.status(201).json({
            message: 'Usuario registrado con éxito',
            user
        });

    } catch (error) {

        res.status(500).json({
            message: 'Error al registrar usuario',
            error
        });

    }

});


// Login
router.post('/auth/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        // Comparar password
        const isPasswordCorrect = await checkPassword(password, user.password as string);

        if (!isPasswordCorrect) {
            const error = new Error('El password es incorrecto!...')
            return res.status(401).json({error: error.message});
        }

        res.json({
            message: 'Login correcto'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Error al iniciar sesión',
            error
        });

    }

});

export default router;