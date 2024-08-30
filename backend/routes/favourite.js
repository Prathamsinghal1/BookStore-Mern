const router = require('express').Router();
const User = require('../models/user');
const { authenticateToken } = require('./userAuth');


// Add book to favourite

router.put("/add-book-to-favourite", authenticateToken, async(req,res) => {
    try {
        const { mybook, id } = req.headers;
        const myUser = await User.findById(id);
        const isBookFavourite = myUser.favourites.includes(mybook);
        if(isBookFavourite){
            return res.status(200).json({message:"Book Already in Favourites"});  
        }
                
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $push: { favourites: mybook } }, 
            { new: true }
        );
        return res.status(200).json({message:"Book Added to Favourites"});  

    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});


router.put("/remove-book-from-favourite", authenticateToken, async(req,res) => {
    try {
        const { mybook, id } = req.headers;
        const myUser = await User.findById(id);
        const isBookFavourite = myUser.favourites.includes(mybook);
        if(isBookFavourite){
            const updatedUser = await User.findByIdAndUpdate(
                id, 
                { $pull: { favourites: mybook } }, 
                { new: true }
            );
            return res.status(200).json({ message: "Book removed from favourites" });
        }else {
            return res.status(404).json({ message: "Book not found in favourites" });
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});


router.get("/get-favourite-books", authenticateToken, async(req,res) => {
    try {
        const { id } = req.headers;
        const myUser = await User.findById(id).populate("favourites");
        const favouriteBooks = myUser.favourites;
        return res.json({status:"Success", data: favouriteBooks });
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});

module.exports = router;