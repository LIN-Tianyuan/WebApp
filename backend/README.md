# Backend

## 1. Initialize the back-end project
```bash
# Create back-end project folder
mkdir backend
cd backend

# Initialize the Node.js Project
# Create the package.json file with npm init (-y for automatic generation of the default configuration)
npm init -y

# Install back-end dependencies
npm install express mongoose bcryptjs jsonwebtoken cors body-parser dotenv

# Installation of development tool dependencies (Use nodemon to automatically restart the server, and eslint to ensure code specification.)
npm install --save-dev nodemon eslint

# Creatie directory structure
# (models, controllers, routes, middleware, config, server.js)

# Edit package.json: change the scripts to make it easier to start the server.
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
Start the test server
```javascript
// server.js (test code)
const express = require('express');
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, Backend!');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```
Start the Development Server:
```bash
npm run dev
```
Visit `http://localhost:5000` to confirm that the server is functioning properly.

## 2. User model

Define the user model
```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
```

## 3. Registration
### 3.1 Controller
```javascript
// controllers/authController.js
// Register
exports.register = async (req, res) => {
  ...
};
```
### 3.2 Route
```javascript
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

module.exports = router;
```
### 3.3 Integrate Route
```javascript
app.use('/api/auth', authRoutes);

const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/webapp';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));
```
### 3.4 Test
```bash
POST http://localhost:5000/api/auth/register
```
```bash
Request Body:
{
  "username": "testuser",
  "password": "password123"
}
```
```bash
Response:
{
  "message": "User registered successfully"
}
```
## 4. Login
### 4.1 Controller
```javascript
// controllers/authController.js
exports.login = async (req, res) => {
  ...
};
```
### 4.2 Route
```javascript
// routes/authRoutes.js
router.post('/login', authController.login);
```
## 5. Validate Token
Middleware: protection routing

Used to verify that a request contains a valid JWT token, which ensures that only authenticated users can access certain protected routes.

```javascript
// middleware/authMiddleware.js
exports.verifyToken = (req, res, next) => {
  ...
};
```
## 6. Store connection strings using environment variables
### 6.1 Install dotenv
```bash
npm install dotenv
```
### 6.2 Create .env file
```env
MONGO_URI=mongodb://localhost:27017/webapp
```
### 6.3 Load environment variables in server.js
```javascript
// server.js
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
```
## 7. Database preparation
### 7.1 Install MongoDB
```bash
https://www.mongodb.com/try/download/community
```
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo service mongod start
```
### 7.2 Default configuration
 - MongoDB runs on `localhost:27017` by default.
 - MongoDB Compass (graphical tool)

## 8. Object management
### 8.1 Create Object Models
```javascript
// models/Object.js
...
```
### 8.2 CRUD controller
```javascript
// controllers/objectController.js
...
```
### 8.3 CRUD route
```javascript
// routes/objectRoutes.js

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

```
### 8.4 Mount the route to the main application
```javascript
// server.js
app.use('/api/objects', objectRoutes); 
```

### 8.5 Test api
Create object
 - Endpoint: `POST /api/objects`
 - Request Body:
 ```json
 {
  "name": "Notebook",
  "description": "Apple"
}
 ```
Get all objects
 - Endpoint: `GET /api/objects`

Get object by id
 - Endpoint: `GET /api/objects/:id`
 - Example: `GET /api/objects/63bc8fa3aebf6c6d9a4e16d1`

Update object
 - Endpoint: `PUT /api/objects/:id`
 - Request Body
 ```json
 {
  "name": "Notebook2",
  "description": "Apple2"
}
 ```

Delet object
 - Endpoint: `DELETE /api/objects/:id`

 


