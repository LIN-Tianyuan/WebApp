# Frontend

## 1. Initialize the front-end project
```bash
# Install the Nuxt.js project creation tool
npx create-nuxt-app frontend

# Install additional dependencies
cd frontend
npm install bootstrap @nuxtjs/axios

# Start the Nuxt Development Server
npm run dev
```
Visit `http://localhost:3000` to confirm that the front-end project is working properly.

Make sure the backend is running at `http://localhost:5000`.

Modify `nuxt.config.js` on the front end to configure Axios to connect to the back end.

```javascript
export default {
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://localhost:5000/api'  // Backend api
  },
};
```
## 2. Login/Registration Page Implementation
 - `pages/auth.vue`
```vue
<script>
export default {
  methods: {
    async login(user) {
      try {
        const response = await this.$axios.post('/auth/login', user);
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    },
  },
};
</script>
```
## 3. Object Management Page
 - `pages/objects.vue`

## 4. Verify Login Status
Used to handle client-side requests, usually to verify the user's login status before the page loads. If the user is not logged in, the Nuxt.js middleware can redirect the user to the login page.

In other pages(object) of the application, verify that the user is logged in (check `localStorage` for a Token).
```javascript
// middleware/auth.js
export default function ({ redirect }) {
  const token = localStorage.getItem('token');
  if (!token) {
    redirect('/auth');
  }
}
```
This middleware is then introduced in the pages that need to be protected.
```javascript
// pages/object.vue
export default {
  middleware: 'auth',
};
```

## 5. Add the token to the request header
Whenever make a request, make sure that the request header carries a stored token. Use `@nuxtjs/axios`'s `interceptors` to automatically add a token to each request.

```javascript
// nuxt.config.js
export default {
  axios: {
    baseURL: 'http://localhost:5000/api',  
  },
  plugins: ['~/plugins/axios.js'],
}
```

 Create a plugin to add the Authorization header
(Automatically add tokens for each request)

Handle Token Expiration or Invalid (If the server returns 401 Unauthorized or 400 Invalid token, catch this error and redirect the user to the login page.)
 ```javascript
 // plugins/axios.js
export default function ({ $axios }) {
  // Automatically attach a Token to each request
  $axios.onRequest(config => {
    if (process.client) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  $axios.onError(error => {
    if (error.response) {
       if (error.response.status === 401) {
      // Clear Token and jump to login page
      if (process.client) {
        localStorage.removeItem('authToken');
      }
      window.location.href = '/auth';
    } else if (error.response.status == 400 && error.response.data?.message === 'Invalid token.') {
      // Clear Token and jump to login page for invalid token
      if (process.client) {
        localStorage.removeItem('authToken');
      }
      window.location.href = '/auth';
    }
  }
    return Promise.reject(error);
  });
}
 ```

