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
### 3.1 Controller: Register New User
```javascript
// controllers/authController.js
// Register
exports.register = async (req, res) => {
  ...
};
```
#### 4.3 Route: Registered Users
```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

module.exports = router;
```
#### 4.4 Integrate Route
```javascript
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
#### 4.5 Test
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
### 5. Login
```javascript
// controllers/authController.js
exports.login = async (req, res) => {
  ...
};
```

### 6. Object management
#### 6.1 Create Object Models
```javascript
// models/Object.js
...
```
#### 6.2 CRUD controller
```javascript
// controllers/objectController.js
...
```
#### 6.3 CRUD route
```javascript
// routes/objectRoutes.js
```
#### 6.4 Mount the route to the main application
```javascript
// server.js
app.use('/api/objects', objectRoutes); 
```

#### 6.5 Test api
