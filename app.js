const express = require("express");
const fedRouter = require('./app/routes/index');
require("dotenv").load();

const port = process.env.PORT || 4001;
const app = express();


app.use(fedRouter); 
app.listen(port, (err) => {
    if (err) {
        return console.log("something bad happened", err);
    }
  
    console.log(`server is listening on ${port}`);
});