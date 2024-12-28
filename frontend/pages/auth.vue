<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            required
            placeholder="Enter your username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
      </form>
      <p @click="toggleMode" class="toggle-mode">
        {{ isLogin ? 'No account? Register here' : 'Already have an account? Login here' }}
      </p>
    </div>

    <!-- Bootstrap Toast for success/error messages -->
    <div v-if="showToast" class="toast-container position-fixed bottom-0 end-0 p-4">
      <div
        class="toast align-items-center text-white bg-success border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        :class="{ show: showToast }"
        @transitionend="handleToastEnd"
      >
        <div class="d-flex">
          <div class="toast-body">
            <strong>{{ toastMessage }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true, // Toggle between login and registration modes
      form: {
        username: '',
        password: '',
      },
      showToast: false, // To control the visibility of the Toast
      toastMessage: '', // To hold dynamic toast messages
    };
  },
  methods: {
    // Toggle between login and registration modes
    toggleMode() {
      this.isLogin = !this.isLogin;
    },
    // Submit form
    async handleSubmit() {
      try {
        const endpoint = this.isLogin ? '/auth/login' : '/auth/register';
        const response = await this.$axios.post(endpoint, this.form);
        console.log(response.data.token);
        
        if (this.isLogin && response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.toastMessage = 'Login successful!';
          this.showToast = true; // Show Toast message
          // Skip to main page
          this.$router.push('/objects');
        } else {
          this.toastMessage = 'Registration successful! Please login.';
          this.showToast = true; // Show Toast message
          setTimeout(() => {
            this.showToast = false; // Hide the toast after 5 seconds
            this.toggleMode(); // Switch to login mode after 5 seconds
          }, 1000); // Set timeout for success message to disappear
        }
      } catch (error) {
        console.error(error);
        this.toastMessage = error.response?.data?.error || 'Something went wrong';
        this.showToast = true; // Show Toast message
        
        // Auto-hide error message after 5 seconds and reset form
        setTimeout(() => {
          this.showToast = false; // Hide toast after 5 seconds
        }, 1000); // Set timeout for error message to disappear
      }
    },
    // Handle toast disappearance
    handleToastEnd() {
      if (this.showToast) {
        setTimeout(() => {
          this.showToast = false; // Hide toast after a delay
        }, 5000); // Set delay to auto-hide the message
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f7b42c, #fc1f5f);
}

.auth-box {
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1.1em;
  color: #444;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #fc1f5f;
  outline: none;
}

button {
  width: 100%;
  padding: 14px;
  background-color: #fc1f5f;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f07c85;
}

p {
  margin-top: 20px;
  color: #fc1f5f;
  cursor: pointer;
  font-size: 1em;
}

p:hover {
  text-decoration: underline;
}

.toast-container {
  z-index: 1050;
}

.toast {
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.toast.show {
  opacity: 1;
}

.toast-body {
  font-size: 1.2em;
  font-weight: bold;
}

.toast-container .toast {
  background: linear-gradient(to right, #ff6464, #fc1f5f); /* A gradient background */
  color: white;
  border-radius: 10px;
  padding: 15px;
  font-family: Arial, sans-serif;
}
</style>
