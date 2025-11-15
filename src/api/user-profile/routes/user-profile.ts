export default {
    routes: [
        {
            method: "PUT",
            path: "/user/profile",
            handler: "user-profile.update",
            config: {
                policies: ["global::isAuthenticated"],
            },
        },
        {
            method: "GET",
            path: "/user/profile",
            handler: "user-profile.me",
            config: {
                policies: ["global::isAuthenticated"],
            },
        }
    ],
};
