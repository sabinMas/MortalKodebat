import pool from './db.connect.js';

export async function findUserByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?', [email]
    );
    return rows[0] || null;
}

export async function createUser(name, email, passwordHash) {
    const [result] = await pool.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, passwordHash]
    );
    return result.insertId;
}