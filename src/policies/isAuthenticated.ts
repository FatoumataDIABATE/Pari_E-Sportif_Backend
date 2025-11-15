export default async (policyContext, config, { strapi }) => {
    return !!policyContext.state.user;
};
