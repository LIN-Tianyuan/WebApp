# frontend

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).


### 2. Frontend
```bash
npx create-nuxt-app frontend

cd frontend
npm install bootstrap axios

npm run dev
```
Visit `http://localhost:3000` to confirm that the front-end project is working properly.

```javascript
export default {
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://localhost:5000/api'
  },
};
```
### 3. Database(MongoDB)
Installation
```bash
https://www.mongodb.com/try/download/community
```
Run
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo service mongod start
```
### 4. Registration
#### 4.1 Define the user model
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
#### 4.2 registration function
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