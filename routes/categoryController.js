
const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Create a new category
router.post('/categories', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a category
router.patch('/categories/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name']; // Assuming 'name' is the field you can update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!category) {
            return res.status(404).send();
        }

        res.send(category);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a category
router.delete('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).send();
        }

        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;