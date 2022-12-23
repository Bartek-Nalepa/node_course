import db from "../db/db.js"

export const isUserHasFriendsTable = (id) => {
    return new Promise((resolve) => {
        db.run(`SELECT * FROM friends_${id}`, (err, row) => {
            if (err) return resolve(false)
            return resolve(true)
        })
    })
}

export const createFriendsTable = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE friends_${id} (friendId INTEGER NOT NULL, created_at TIMESTAMP DEFAULT (datetime('now', 'localtime')), name TEXT, FOREIGN KEY (friendId) REFERENCES user(id))`, (err) => {
            if (err) return reject(err)
            return resolve(true)
        })
    })
}

export const checkIfAlreadyAdded = (userId, friendId) => {
    return new Promise ((resolve, reject) => {
        db.get(`SELECT * from friends_${userId} WHERE friendId = ${friendId}`, (err, row) => {
            if (err) return reject(err)
            return resolve(!!row)
        })
    })
}