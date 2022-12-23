import express from "express"
import db from "../../db/db.js"

const usersRoute = express.Router();

usersRoute.get("/", (_, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        res.send(rows)
    })
})

usersRoute.post("/", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).send("name is missing");
    db.run("INSERT INTO users (name) VALUES (?)", [name], (err) => {
        if (!err) return res.status(201).send()
        res.status(500).send(err)
    })
})

usersRoute.get("/:id", (req, res) => {
    const { id } = req.params
    db.get("SELECT * FROM users WHERE id=?", [id], (err, row) => {
        if (!!!row) return res.status(404).send()
        if (!err) return res.send(row)
        res.status(500).send(err)
    })
})

usersRoute.get("/:id/tweets", (req, res) => {
    const { id } = req.params
    db.all("SELECT t.id AS tweet_id, t.content AS content FROM users AS u LEFT JOIN tweets AS t ON u.id = t.author WHERE u.id = ?", [id], (err, rows) => {
        if (!err) return res.send(rows)
        res.status(500).send(err)
    })
})


export default usersRoute;