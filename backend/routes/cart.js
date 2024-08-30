const router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require('./userAuth');


//Add Book to cart

router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { mybook, id } = req.headers;
        const myUser = await User.findById(id);

        if (!myUser) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }

        // Check if the book is already in the cart
        const isBookInCart = myUser.cart.includes(mybook);
        if (isBookInCart) {
            return res.status(200).json({ status: "Success", message: "Book is already in cart" });
        }

        // Add the book to the cart
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $push: { cart: mybook } },  // Use myBook here as well
            { new: true }
        );

        return res.status(200).json({ status: "Success", message: "Book added to cart", updatedUser });
    } catch (error) {
        return res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
});

router.put("/remove-from-cart/:mybook", authenticateToken, async(req,res) => {
    try {
        const { mybook } = req.params;
        const { id } = req.headers;
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $pull: { cart: mybook } }, 
            { new: true });
        return res.json({ status:"Success", message: "Book removed from cart" });
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});


router.get("/get-user-cart", authenticateToken, async(req,res) => {
    try {
        const { id } = req.headers;
        const myUser = await User.findById(id).populate("cart");
        const booksInCart = myUser.cart.reverse();
        return res.json({status:"Success", data: booksInCart, });
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});


module.exports = router;