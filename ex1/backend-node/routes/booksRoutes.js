import express from "express";
import * as booksController from '../controllers/booksController.js';

const router = express.Router();

router.get('/books', booksController.showAllBooks);
router.get('/books/:idBook', booksController.showBookById);
router.get('/books/search/:query', booksController.searchBooksByName);
router.post('/books', booksController.newBook);    
router.put('/books', booksController.updateBook);
router.delete('/books/:idBook', booksController.deleteBook);

export default router;