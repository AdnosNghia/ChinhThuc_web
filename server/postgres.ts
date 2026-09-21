import pg from 'pg';
const { Pool } = pg;
export const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }) : null;
export async function query<T = any>(text: string, values: unknown[] = []) { if (!pool) throw new Error('DATABASE_URL is not configured'); return pool.query<T>(text, values); }
