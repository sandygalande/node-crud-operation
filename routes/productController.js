
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all products with category details
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a product
router.patch('/products/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'categoryId']; // Assuming 'name' and 'categoryId' are the fields you can update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).send();
        }

        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).send();
        }

        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;