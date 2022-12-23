import express from "express"
import db from "../../db/db.js"
import { checkIfAlreadyAdded, createFriendsTable, isUserHasFriendsTable } from "../../helper/friends.helper.js";
import { getUserFromAuthKey } from "../../utils/utils.js";

const friendsRoute = express.Router();

friendsRoute.get("/", async (req, res) => {
    const user = await getUserFromAuthKey(req.headers.authorization);
    if (!user) return res.status(403).send();
    const isTableExist = await isUserHasFriendsTable(user.id)
    if (!isTableExist) await createFriendsTable(user.id)
    db.all(`SELECT * from friends_${user.id}`, (err, rows) => {
        if (err) return res.status(500).send(err)
        return res.send(rows)
    })
});

friendsRoute.post("/", async (req, res) => {
    try {
        const user = await getUserFromAuthKey(req.headers.authorization);
        if (!user) return res.status(403).send();
        const friendId = req.body.id
        if (await checkIfAlreadyAdded(user.id, friendId)) return res.status(409).send()
        db.run(`INSERT INTO friends_${user.id} (friendId) VALUES (?)`, [friendId], (err) => {
            if (err) return res.status(500).send(err)
            res.status(201).send("created")
        } )           
    }
    catch(error) {
        res.status(500).send(error)
    }
})

friendsRoute.delete("/:id", async (req, res) => {
    try {
        const user = await getUserFromAuthKey(req.headers.authorization);
        if (!user) return res.status(403).send();
        const friendId = req.params.id
        db.run(`DELETE FROM friends_${user.id} WHERE friendId = ${friendId}`, (err) => {
            if (err) return res.status(500).send(err)
            return res.send()
        } )           
    }
    catch(error) {
        res.status(500).send(error)
    }
})

export default friendsRoute;