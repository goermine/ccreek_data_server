const express = require("express");
// const binanceApi = require("./exchange_utils/rest/index");
// const portfolio = require('./routes/portfolio');
require("dotenv").load();

const port = process.env.PORT || 4001;
const app = express();


// app.use(portfolio); 
app.listen(port, (err) => {
    if (err) {
        return console.log("something bad happened", err);
    }
  
    console.log(`server is listening on ${port}`);
});