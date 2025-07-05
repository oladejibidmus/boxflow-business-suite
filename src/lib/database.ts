
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// For production, this should be in environment variables
// For now, using a placeholder - users need to replace with their Neon connection string
const connectionString = process.env.DATABASE_URL || 'postgresql://username:password@host/database';

const sql = neon(connectionString);
export const db = drizzle(sql);
