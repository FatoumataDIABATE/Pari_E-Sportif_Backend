export default {
    /**
     * Mise à jour du résultat du match AVANT l'enregistrement
     */
    async beforeUpdate(event) {
        const { data } = event.params;

        // Si les scores changent → calcule automatiquement le résultat
        if (
            typeof data.score_a === "number" &&
            typeof data.score_b === "number"
        ) {
            if (data.score_a > data.score_b) data.resultat = "A";
            else if (data.score_b > data.score_a) data.resultat = "B";
            else data.resultat = "N";
        }
    },

    /**
     * Mise à jour des bets APRÈS enregistrement quand le match est terminé
     */
    async afterUpdate(event) {
        const { result } = event;

        // Ne fait rien tant que le match n'est pas terminé
        if (result.etat !== "TERMINE") return;

        const matchId = result.id;

        // Récupère tous les bets du match
        const bets = await strapi.entityService.findMany("api::bet.bet", {
            filters: { match: matchId },
        });

        // Détermine si le pronostic est correct
        const realResult = result.resultat; // déjà calculé dans beforeUpdate

        for (const bet of bets) {
            const isWon = bet.pronostic === realResult;

            // Calcul montant final
            let amountFinal = -bet.amount; // perte par défaut
            if (isWon) {
                if (realResult === "A") amountFinal = bet.amount * result.odd_a;
                if (realResult === "B") amountFinal = bet.amount * result.odd_b;
                if (realResult === "N") amountFinal = bet.amount * result.odd_n;
            }

            // Met à jour le bet
            await strapi.entityService.update("api::bet.bet", bet.id, {
                data: {
                    etat: isWon ? "won" : "lost",
                    amount_final: amountFinal,
                },
            });
        }
    },
};
