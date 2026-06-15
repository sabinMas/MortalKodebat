import { registerUser, loginUser } from '../services/auth.service.js';

export function getRegisterPage(req, res) {
    res.render('register', { title: 'Register', error: null });
}

export async function postRegister(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.render('register', { title: 'Register', error: 'All fields are required' });
    }

    try {
        const userId = await registerUser(name, email, password);
        req.session.userId = userId;
        req.session.name = name;
        res.redirect('/products');
    } catch (err) {
        res.render('register', { title: 'Register', error: err.message });
    }
}

export function getLoginPage(req, res) {
    res.render('login', { title: 'Login', error: null });
}

export async function postLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { title: 'Login', error: 'Email and password are required' });
    }

    try {
        const user = await loginUser(email, password);
        req.session.userId = user.userId;
        req.session.name = user.name;
        res.redirect('/products');
    } catch (err) {
        res.render('login', { title: 'Login', error: err.message });
    }
}

export function postLogout(req, res) {
    req.session.destroy((err) => {
        if (err) console.error('Logout error:', err);
        res.redirect('/');
    });
}
