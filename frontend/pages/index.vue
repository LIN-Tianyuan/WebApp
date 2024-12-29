<template>
  <div class="home-container">
    <div class="home-content">
      <h1>Welcome to Object Management System</h1>
      <p>Manage your objects efficiently with our intuitive platform.</p>
      <div class="home-buttons">
        <router-link to="/auth" class="btn btn-primary">Get Started</router-link>
        <router-link to="/objects" class="btn btn-secondary">View Objects</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  head() {
    return {
      title: 'Home Page'
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f7b42c, #fc1f5f);
}

.home-content {
  text-align: center;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 30px;
}

.home-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn {
  padding: 12px 20px;
  font-size: 1.1em;
  border-radius: 6px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s ease;
  font-family: 'Roboto', sans-serif;
}

.btn-primary {
  background-color: #fc1f5f;
}

.btn-primary:hover {
  background-color: #f07c85;
}

.btn-secondary {
  background-color: #f7b42c;
}

.btn-secondary:hover {
  background-color: #f7d16b;
}
</style>
