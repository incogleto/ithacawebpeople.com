require('app/environment')

const defaults = {
    migrations: {
        tableName: 'schema_migrations',
        directory: './node_modules/app/db/migrations'
    },
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
        min: 2,
        max: 10
    }
}

module.exports = {
    development: defaults,
    test: Object.assign({}, defaults, {
        client: 'sqlite3',
        connection: {
            filename: './test.sqlite'
        },
        useNullAsDefault: true
    }),
    production: defaults
}
