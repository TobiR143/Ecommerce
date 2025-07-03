const allowedOrigins = [
  'https://localhost:5173',
  'https://lucent-faun-4b8040.netlify.app'
]

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true) // para Postman y peticiones sin origin
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
