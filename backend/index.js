import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost", 
    user: "mcoca",
    password: "Bingo123",
    database: "movie_recommender"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err);
        return;
    }
    console.log("Connected to database!");
});

//basic db calls to view db in backend app
//db.query("SHOW TABLES;");

//backend app display
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello, this is the backend");
});
app.get("/movie_db", (req,res)=>{
    const query = "SHOW TABLES;";
    db.query(query,(err, data)=>{
        if(err) returnres.json(err)
        return res.json(data)
    })
});
app.get("/movie", (req,res)=>{
    const query = "SELECT * FROM movie;";
    db.query(query,(err, data)=>{
        if(err) returnres.json(err)
        return res.json(data)
    })
});
app.post("/movie", (req,res)=>{
    const query = "INSERT INTO movie (`title`,`runtime`,`overview`,`release_date`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.runtime,
        req.body.overview,
        req.body.release_date
    ];
    db.query(query,[values],(err,data)=>{
        if(err) returnres.json(err);
        return res.json("Movie successfully created.");
    })
});

app.listen(8800, () => {
    console.log("Express server listening on port 8800");
});
