import mysql from 'mysql2/promise';

export const db = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });
    console.log('✅ Database connected successfully');
    return connection;
  } catch (error) {
    console.error('❌ DB connection failed:', error.message);
    process.exit(1);
  }
};
