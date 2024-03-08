import Book from './book.model.js';

export const createBook = async (req, res) => {
    const { title, author, description } = req.body;
    try {
        const existingBook = await Book.findOne({ title });

        if (existingBook) {
            return res.status(400).json({ message: 'Book with this title already exists' });
        }

        const newBook = await Book.create({ title, author, description });
        return res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        // Busca el libro por su ID en la base de datos
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const { title, author } = req.body;

        // Verificar si el libro existe
        const existingBook = await Book.findById(bookId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        // Actualizar la información del libro
        existingBook.title = title || existingBook.title;
        existingBook.author = author || existingBook.author;

        // Guardar los cambios
        await existingBook.save();

        return res.status(200).json({ message: 'Book updated successfully.', book: existingBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        // Verificar si el libro existe
        const existingBook = await Book.findById(bookId);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        // Eliminar el libro de la base de datos
        const result = await Book.deleteOne({ _id: bookId });
        if (result.deletedCount === 0) {
            return res.status(500).json({ message: 'Failxed to delete book.' });
        }

        return res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};