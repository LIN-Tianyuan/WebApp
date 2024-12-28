const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');
const { verifyToken } = require('../middleware/authMiddleware');

// Create object
router.post('/', verifyToken, objectController.createObject);

// Get all objects
router.get('/', verifyToken, objectController.getAllObjects);

// Get object by id
router.get('/:id', verifyToken, objectController.getObjectById);

// Update object
router.put('/:id', verifyToken, objectController.updateObject);

// Delet object
router.delete('/:id', verifyToken, objectController.deleteObject);

module.exports = router;
