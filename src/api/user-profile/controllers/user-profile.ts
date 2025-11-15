export default {
    async me(ctx) {
        const userId = ctx.state.user.id;

        const user = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: { id: userId },
            select: ["id", "username", "email"],
        });

        return user;
    },

    async update(ctx) {
        const userId = ctx.state.user.id;
        const data = ctx.request.body;

        const updated = await strapi.db.query("plugin::users-permissions.user").update({
            where: { id: userId },
            data,
        });

        return updated;
    },
};
