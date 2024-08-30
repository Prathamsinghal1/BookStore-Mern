const router = require('express').Router();
const Order = require('../models/order');
const User = require('../models/user');
const Book = require('../models/book');
const { authenticateToken } = require('./userAuth');
const user = require('../models/user');

router.post("/place-order", authenticateToken, async(req,res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for(const orderData of order){
            const newOrder = new Order({user: id, book: orderData._id});
            const orderDataFromDb = await newOrder.save();

            //Saving order in user model
            await User.findByIdAndUpdate(id,
                { $push: { orders: orderDataFromDb._id }},
                { new :true }
            );

            // Clearing Cart
            await User.findByIdAndUpdate(id,
                { $pull: { cart: orderData._id }},
                { new :true }
            );
        }
        return res.json({status: "Success", message:"Order Placed Successfully"});  
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});

router.get("/get-order-history", authenticateToken, async(req,res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({ path:'orders', populate: { path:"book" }}) ;

        const orderData = userData.orders.reverse();

        return res.json({status: "Success", data: orderData });  
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});

router.get("/get-all-orders", authenticateToken, async(req,res) => {
    try {
        const userData = await Order.find()
        .populate(
            { path:'book'},
        ) 
        .populate(
            { path:'user'},
        )
        .sort({createdAt:-1});
        return res.json({status: "Success", data: userData });  
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});

router.put("/update-status/:id", authenticateToken, async(req,res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({status: "Success", message:"User Updated Successfully" });  
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});  
    }
});



module.exports = router;