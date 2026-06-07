import axios from "axios"

// ==============================
// CREATE AXIOS INSTANCE
// ==============================

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// ==============================
// REQUEST INTERCEPTOR
// ==============================

API.interceptors.request.use(

  (config) => {

    // GET TOKEN

    const token = localStorage.getItem(
      "token"
    )

    // ADD AUTH HEADER

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`

    }

    // Let axios set the multipart boundary for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]
    }

    return config

  },

  (error) => {

    return Promise.reject(error)

  }

)

// ==============================
// RESPONSE INTERCEPTOR
// ==============================

API.interceptors.response.use(

  (response) => {

    return response

  },

  (error) => {

    // TOKEN EXPIRED / UNAUTHORIZED

    if (
      error.response &&
      error.response.status === 401
    ) {

      // CLEAR STORAGE

      localStorage.removeItem("token")

      localStorage.removeItem("admin")

      // REDIRECT TO LOGIN

      window.location.href = "/admin-login"

    }

    return Promise.reject(error)

  }

)

export default API
