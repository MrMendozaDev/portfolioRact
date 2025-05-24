import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.HOST}:${process.env.PORT_SERVER}`,
  headers: {
    'Content-Type': 'application/json'
    // Puedes agregar aquí otros headers comunes
  }
})

export default api
