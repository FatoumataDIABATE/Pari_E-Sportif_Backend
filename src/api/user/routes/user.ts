module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/users',
            handler: 'user.findAll',
            config: {
                auth: false, // ou false si tu veux tester sans token
            },
        },
    ],
};
