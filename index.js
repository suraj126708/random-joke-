import express, { json } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

// Set the view engine to ejs
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    // console.log(result.data.joke);
    res.render("index.ejs", {
      Joke: JSON.stringify(result.data.joke),
    });
  } catch (error) {
    res.status(404).send("Failed to fetch joke: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
