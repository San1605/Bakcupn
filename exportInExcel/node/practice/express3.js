const express = require("express");
const app = express();
const { products } = require("./products");

app.get("/api/v1/query", (req, res) => {
    const { search, limit } = req.query
    console.log(search, limit);
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((prev) => prev.name.startsWith(search));
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
       return res.status(200).json({ success: true, data: [] })
    }
  return  res.status(200).json(sortedProducts)
})





app.listen(5004, () => {
    console.log("server is up and running on 5004")
})
