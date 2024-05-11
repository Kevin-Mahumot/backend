// import jwt from 'jsonwebtoken';

// function authenticateToken(req, res, next) {
//     const token = req.headers['authorization'];
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, 'secret_key', (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user; 
//         next();
//     });
// }

// export {authenticateToken};


import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    const [scheme, token] = authHeader.split(' ');

    // Check if the scheme is "Bearer" and token exists
    if (scheme && scheme.toLowerCase() === 'bearer' && token) {
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user; 
            next();
        });
    } else {
     
        return res.sendStatus(401);
    }
}

export { authenticateToken };
