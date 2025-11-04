import pkg from 'pg';
const { Pool } = pkg;

// Use DATABASE_URL from env. Make sure to set this in .env.local
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';

// Create a singleton pool to avoid exhausting connections during dev/hot reload
let pool;

if (!global.__pgPool) {
  global.__pgPool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
}

pool = global.__pgPool;

async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  // optional logging in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('SQL:', { text, duration, rows: res.rowCount });
  }
  return res;
}

export { pool, query };
export default { pool, query };
