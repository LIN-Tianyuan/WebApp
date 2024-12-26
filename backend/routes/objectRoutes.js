const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');

// Create object
router.post('/', objectController.createObject);

// Get all objects
router.get('/', objectController.getAllObjects);

// Get object by id
router.get('/:id', objectController.getObjectById);

// Update object
router.put('/:id', objectController.updateObject);

// Delet object
router.delete('/:id', objectController.deleteObject);

module.exports = router;
