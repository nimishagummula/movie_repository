const express = require("express");
const path = require("path");
const app = express();
const dbPath = path.join(__dirname, "moviesData.db");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
  }
};
initializeDBAndServer();
app.get("/movies/",async(request,response)=>{
    const getMoviesQuery = `SELECT * FROM movie;`;
    const moviesArray = await db.get(getMoviesQuery);
    response.send(moviesArray);
});
