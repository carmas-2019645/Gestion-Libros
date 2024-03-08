import express from 'express'
import { validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook} from './book.controller.js';

const api = express.Router();

// Rutas Publicas
api.post('/createBook',[validateJwt, isAdmin], createBook)
api.get('/getAllBooks', [validateJwt, isClient], getAllBooks)
api.get('/getBookById/:bookId', getBookById)
api.put('/updateBook/:bookId', [validateJwt, isAdmin], updateBook)
api.delete('/deleteBook/:bookId', [validateJwt, isAdmin], deleteBook )

export default api