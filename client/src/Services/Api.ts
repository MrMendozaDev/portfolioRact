import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT_SERVER}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
