const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::users-permissions.user', ({ strapi }) => ({
    async findAll(ctx) {
        const users = await strapi.db.query('plugin::users-permissions.user').findMany();
        return users;
    },
}));
