const express = require("express");

const shortId = require("shortid");
const path = require("path");
const mongoose = require("mongoose");
const shortUrl = require("./models/url");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "urlShortner",
  })
  .then(() => [console.log("mongoseConnected")]);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res, next) => {
  try {
    const { url } = req.body;
    const isExist = await shortUrl.find({ url });
    console.log(isExist);
    if (isExist.length != 0) {
      res.render("index", {
        short_url: `http://localhost:3001/${isExist.shortId}`,
      });
      return;
    }
    const ShortUrl = new shortUrl({
      url: url,
      shortId: shortId.generate(),
    });
    let result = await ShortUrl.save();
    // console.log(result)
    res.render("index", {
      short_url: `http://localhost:3001/${result.shortId}`,
    });
  } catch (error) {
    console.log(error);
  }
});


app.get('/:shortId' , async (req,res)=>{
    const { shortId } = req.params
    console.log(req.params)
const result = await shortUrl.findOne({shortId : shortId})
res.redirect(result.url)
})

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
