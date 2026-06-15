import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../model/user.repo.js';

const SALT_ROUNDS = 10;

export async function registerUser(name, email, password) {
    const existing = await findUserByEmail(email);
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await createUser(name, email, passwordHash);
    return userId;
}

export async function loginUser(email, password) {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error('Invalid email or password');

    return { userId: user.user_id, name: user.name };
}