const Book = require('../models/books');

// ฟังก์ชันเพิ่มข้อมูลหนังสือใหม่ (Add)
exports.addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedyear, available } = req.body;

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นทั้งหมด
        if (!title || !author || !genre || !publishedyear || available === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // สร้างเอกสารหนังสือใหม่
        const newBook = new Book({ title, author, genre, publishedyear, available });

        // บันทึกเอกสารหนังสือใหม่
        await newBook.save();

        // ส่งการตอบกลับสำเร็จ
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Error adding book', error });
    }
};

// ฟังก์ชันลบข้อมูลหนังสือตาม ID (Delete)
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

// ฟังก์ชันแก้ไขข้อมูลหนังสือตาม ID (Update)
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, publishedyear, available } = req.body;

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นทั้งหมด
        if (!title || !author || !genre || !publishedyear || available === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre, publishedyear, available }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

// ฟังก์ชันดึงข้อมูลหนังสือทั้งหมด (getDataAll)
exports.getDataAll = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books', error });
    }
};

// ฟังก์ชันดึงข้อมูลหนังสือตาม genre (ดึงข้อมูลตามแอตทริบิวต์ genre)
exports.getBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.params;
        const books = await Book.find({ genre });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving books by genre', error });
    }
};
