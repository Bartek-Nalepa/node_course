import { VERSIONING } from "../config/global.js";
import friendsRoute from "./v1/friends.js";
import tweetsRoute from "./v1/tweets.js";
import usersRoute from "./v1/users.js"

const routes = (app) => {
    app.use(`/${VERSIONING}/users`, usersRoute)
    app.use(`/${VERSIONING}/tweets`, tweetsRoute)
    app.use(`/${VERSIONING}/friends`, friendsRoute)
}

export default routes;