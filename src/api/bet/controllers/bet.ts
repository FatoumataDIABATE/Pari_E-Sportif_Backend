/**
 * bet controller
 *

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::bet.bet');
 */


/**
 * bet controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::bet.bet', ({ strapi }) => ({

    async find(ctx) {
        // Merge user populate + autres populate éventuels
        const id = ctx.state;
        console.log("Test : ", id)
        ctx.query = {
            ...ctx.query,
            /*populate: {
                // On force la relation user
                /*user: {
                    fields: ['id', 'username', 'email'], // les champs que tu veux exposer
                },
                user: true,
                // Si tu veux aussi garder match :
                match: false,
                // Si tu veux d'autres relations, ajoute-les ici
            },*/
            //populate: '*',
        };

        // Appelle le contrôleur Strapi par défaut
        const { data, meta } = await super.find(ctx);

        return { data, meta };
    },

}));

