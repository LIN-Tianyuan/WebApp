const ObjectModel = require('../models/Object');

// Create an object
exports.createObject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // validation field
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Create object
    const newObject = new ObjectModel({ name, description });
    await newObject.save();

    res.status(201).json(newObject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create object' });
  }
};

// Get all objects
exports.getAllObjects = async (req, res) => {
  try {
    const objects = await ObjectModel.find();
    res.status(200).json(objects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch objects' });
  }
};

// Get object by id
exports.getObjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const object = await ObjectModel.findById(id);

    if (!object) {
      return res.status(404).json({ error: 'Object not found' });
    }

    res.status(200).json(object);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch object' });
  }
};

// Update object
exports.updateObject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Update object
    const updatedObject = await ObjectModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedObject) {
      return res.status(404).json({ error: 'Object not found' });
    }

    res.status(200).json(updatedObject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update object' });
  }
};

// Delete object
exports.deleteObject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedObject = await ObjectModel.findByIdAndDelete(id);

    if (!deletedObject) {
      return res.status(404).json({ error: 'Object not found' });
    }

    res.status(200).json({ message: 'Object deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete object' });
  }
};
