import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "Bella8903_",
    database: "movie_recommender"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err);
        return;
    }
    console.log("Connected to database!");
});

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello, this is the backend");
});

app.listen(8800, () => {
    console.log("Express server listening on port 8800");
});
