import express from 'express'
import { validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js';
import { test, registerAdmin, registerClient, login , update, deleteU,
        changePassword, updateProfileById} from './user.controller.js';

const api = express.Router();

// Rutas Publicas
api.post('/login', login)

// Rutas Privadas de Admin
api.get('/test', [validateJwt, isAdmin], test)
api.post('/registerAdmin', registerAdmin)
api.post('/registerClient', registerClient)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/deleteU/:id', [validateJwt, isAdmin], deleteU)

// Rutas Privada de Client
api.put('/password', [validateJwt, isClient], changePassword)
api.put('/updateProfileById/:id', [validateJwt, isClient], updateProfileById)




export default api