import db from "../../db/db.js";
import { Router } from "express"
import { getUserFromAuthKey } from "../../utils/utils.js";

const tweetsRoute = Router()

tweetsRoute.get("/", async (req, res) => {
    const sort = req.query.sort || "ASC"
    db.all(`SELECT * FROM tweets ORDER BY created_at ${sort}`, (err, rows) => {
        if (!err) return res.send(rows)
        res.status(500).send(err)
    })
})

tweetsRoute.get("/:id", (req, res) => db.get("SELECT * FROM tweets WHERE id = ?", [req.params.id], (err, rows) => res.send(rows)))

tweetsRoute.post("/", async (req, res) => {
    const user = await getUserFromAuthKey(req.headers.authorization);
    const { content } = req.body
    if (!user) return res.status(404).send("No user")
    db.run("INSERT INTO tweets ('content', 'author') VALUES (?, ?)", [content, user.id], (err) => {
        if (!err) return res.status(201).send()
        res.status(400).send(err)
    })
})

tweetsRoute.delete("/:id", async (req, res) => {
    const { id } = req.params
    const user = await getUserFromAuthKey(req.headers.authorization);
    db.get("SELECT author FROM tweets WHERE id = ?", [id], (err, row) => {
        if(!row) return res.status(404).send("No tweet found")
        if (row.author !== user.id) return res.status(403).send("You are not an owner")
        db.run("DELETE FROM tweets WHERE id = ?", [id], (err) => {
            if(!err) return res.send();
            res.status(500).send(err)
        })
    })
    
})


export default tweetsRoute;

