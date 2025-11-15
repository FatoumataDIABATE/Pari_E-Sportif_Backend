import path from 'path';

export default () => {
    const client = 'mysql';

    const connections = {
        mysql: {
            connection: {
                host: '127.0.0.1',
                port: 3306,
                database: 'esport_betting',
                user: 'root',
                password: 'root1234',
                ssl: false,
            },
            pool: { min: 2, max: 10 },
        },
        sqlite: {
            connection: {
                filename: path.join(__dirname, '..', '..', '.tmp/data.db'),
            },
            useNullAsDefault: true,
        },
    };

    return {
        connection: {
            client,
            ...connections[client],
            acquireConnectionTimeout: 60000,
        },
    };
};
