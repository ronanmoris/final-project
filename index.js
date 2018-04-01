const express = require("express");
const app = express();
const compression = require("compression");
const api = require("./service/api-food");
const bodyParser = require("body-parser");

app.use(compression());

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/search-recipe", (req, res) => {
    api.searchIngredients(req.body.text).then(data => {
        res.json(data);
    });
});
app.post("/recipe", (req, res) => {
    api.searchRecipe(req.body.recipeId).then(data => {
        res.json(data);
    });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
