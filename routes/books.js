const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// เส้นทางสำหรับการจัดการหนังสือ
router.post('/books', bookController.addBook);
router.delete('/books/:id', bookController.deleteBook); // ชื่อฟังก์ชันต้องตรง
router.put('/books/:id', bookController.updateBook);
router.get('/books', bookController.getDataAll);
router.get('/books/genre/:genre', bookController.getBooksByGenre);

module.exports = router;
