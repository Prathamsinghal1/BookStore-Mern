const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Book = require('../models/book');
const { authenticateToken } = require('./userAuth');


//Add Book By Admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Check if the user exists
        const myUser = await User.findById(id);
        if (!myUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure the user has admin privileges
        if (myUser.role !== "admin") {
            return res.status(403).json({ message: "You are not eligible to add a book" });
        }

        // Validate input data
        const { url, title, author, price, desc, language } = req.body;
        if (!url || !title || !author || !price || !desc || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new book entry
        const newBook = new Book({
            url,
            title,
            author,
            price,
            desc,
            language
        });
        
        // Save the new book to the database
        await newBook.save();
        res.status(200).json({ message: "Book added successfully" });

    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Update Book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { mybook } = req.headers;
        
        if (!mybook) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const updatedBook = await Book.findByIdAndUpdate(mybook, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        }, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book Updated Successfully" });

    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


// Delete Book
router.delete("/delete-book", authenticateToken, async(req,res) => {
    try {
        const { mybook } = req.headers;
        await Book.findByIdAndDelete(mybook);
        return res.status(200).json({message:"Book Deleted Successfully"});  
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});  
    }
}); 


// Get Data of all Books
router.get("/get-all-books", async(req,res) => {
    try {
        const books = await Book.find().sort({ createdAt : -1 });
        return res.json({
            status: "Success",
            data: books,
        }); 
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});  
    }
}); 


router.get("/get-recent-books", async(req,res) => {
    try {
        const books = await Book.find().sort({ createdAt : -1 }).limit(5);
        return res.json({
            status: "Success",
            data: books,
        }); 
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});  
    }
}); 


// Get Data of book by id
router.get("/get-book-by-id/:id", async(req,res) => {
    try {
        const { id } = req.params;
        
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        }); 
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});  
    }
}); 




module.exports = router;