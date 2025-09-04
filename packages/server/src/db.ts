import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const {
   MYSQL_HOST = '127.0.0.1',
   MYSQL_PORT = '3306',
   MYSQL_USER = 'root',
   MYSQL_PASSWORD = '',
   MYSQL_DATABASE = 'shannytech',
} = process.env;

export const pool = mysql.createPool({
   host: MYSQL_HOST,
   port: Number(MYSQL_PORT),
   user: MYSQL_USER,
   password: MYSQL_PASSWORD,
   database: MYSQL_DATABASE,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
});
