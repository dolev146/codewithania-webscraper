const PORT = process.env.PORT || 8001;
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/uk";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
    // save to json file
    fs.writeFile("articles.json", JSON.stringify(articles), (err) => {
      err ? console.log(err) : null;
    });
  })
  .catch((err) => console.log(err));

app.get("/", async (req, res) => {
  const { data } = await axios.get("https://www.google.com/");
  const $ = Cheerio.load(data);

  const title = $("title").text();

  res.send(title);
});

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
