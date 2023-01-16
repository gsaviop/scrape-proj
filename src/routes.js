const express = require("express");
const route = express();

const { scrapePage } = require("./scrape");

route.get("/laptops-lenovo", async (req, res) => {
    const laptops = await scrapePage();
    res.json(laptops);
});

module.exports = route;
