import db from "../db/db.js"

export const getUserFromAuthKey = (authKey) => {
    if (!authKey) return null;
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE id = ?", [authKey], (err, row) => {
            if (err) {reject(err)}
            resolve(row)
        })
    });
}