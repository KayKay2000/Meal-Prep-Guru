require("dotenv").config()
module.exports = {
  "development": {
    "username": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASS || null,
    "database": "Meal-Prep-Guru",
    "host": process.env.DB_HOST || "winhost",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialectOptions": {"ssl": { "require": true, "rejectUnauthorized": false }}

  }
}