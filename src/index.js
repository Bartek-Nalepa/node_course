import express from "express";
import bp from 'body-parser';
import routes from "./api/routes.js"

const { urlencoded } = bp
const app = new express();
app.use(bp.json())
app.use(urlencoded({ extended: true }))
routes(app)

app.listen(3000, () => console.log("Server is listening on port:3000"))