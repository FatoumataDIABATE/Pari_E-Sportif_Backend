import path from 'path';

export default ({ env }) => {
    const client = env('DATABASE_CLIENT', 'mysql');

    const connections = {
        mysql: {
            connection: {
                host: env('DATABASE_HOST', '127.0.0.1'),
                port: env.int('DATABASE_PORT', 3306),
                database: env('DATABASE_NAME', 'esport_betting'),
                user: env('DATABASE_USERNAME', 'root'),
                password: env('DATABASE_PASSWORD', 'root1234'),
                ssl: env.bool('DATABASE_SSL', false),
            },
            pool: { min: 2, max: 10 },
        },

        sqlite: {
            connection: {
                filename: path.join(__dirname, '..', '..', '.tmp/data.db'),
            },
            useNullAsDefault: true,
        },

        postgres: {
            connection: {
                host: env('DATABASE_HOST'),
                port: env.int('DATABASE_PORT', 5432),
                database: env('DATABASE_NAME'),
                user: env('DATABASE_USERNAME'),
                password: env('DATABASE_PASSWORD'),
                ssl: env.bool('DATABASE_SSL', true)
                    ? { rejectUnauthorized: false }
                    : false,
            },
            pool: { min: 2, max: 10 },
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
