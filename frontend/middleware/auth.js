export default function ({ redirect }) {
  if (process.client) {
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      return redirect('/auth');  
    }

  }
  }
  