import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.POSTGRES_DB,
  ssl: {
    rejectUnauthorized: false,
  },
  dialect: "postgres",
  dialectOptions: {
    ssl: { require: true },
  },
});

export default pool;
