import {Router} from 'express'; 
import {body} from 'express-validator';
import createAccount from "./handlers";
import login from "./handlers"
import { handleInputErrors } from './middleware/validation';

const router = Router(); 

//Routing for authentication and register 
router.post('/auth/register',
            body('handle').notEmpty().withMessage('El handle no debe estar vacío!...'),
            body('name').notEmpty().withMessage('El nombre no debe estar vacío!...'),
            body('email').isEmail().withMessage('Email no es válido!...'),
            body('password').isLength({min:8}).withMessage('El password debe ser mínimo de 8 caracteres!...'),
            handleInputErrors,
            createAccount);

router.post('/auth/login',
            body('email').isEmail().withMessage('Email no válido'),
            body('password').notEmpty().withMessage('El password no debe ser vacío!...'),
            login);

export default router;