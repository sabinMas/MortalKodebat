export function requireAuth(req, res, next) {
    if (req.session?.userId) {
        return next();
    }

    if (req.path.startsWith('/api/')) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    return res.redirect('/login');
}