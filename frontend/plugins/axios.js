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