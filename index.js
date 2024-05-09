import express from "express";
import axios from "axios";
import "dotenv/config";
const app = express();
const port = 3000;

const yourUsername = process.env.User_name;
const yourPassword = process.env.Password;
const yourAPIKey = process.env.APIKey;
const yourBearerToken = process.env.BearerToken;
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    let stringdata = JSON.stringify(response.data);
    res.render("index.ejs", { content: stringdata });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", { content: error.message });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const encoded = Buffer.from(yourUsername + ":" + yourPassword).toString(
      "base64"
    );
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/all?page=2",
      {
        headers: {
          Authorization: "Basic " + encoded,
        },
      }
    );
    let stringdata = JSON.stringify(response.data);
    res.render("index.ejs", { content: stringdata });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", { content: error.message });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`
    );
    let stringdata = JSON.stringify(response.data);
    res.render("index.ejs", { content: stringdata });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", { content: error.message });
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/secrets/1",
      {
        headers: {
          Authorization: "bearer " + yourBearerToken,
        },
      }
    );
    let stringdata = JSON.stringify(response.data);
    res.render("index.ejs", { content: stringdata });
  } catch (error) {
    console.log(error);
    res.render("index.ejs", { content: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
